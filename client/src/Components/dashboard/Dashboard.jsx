import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDashboardData } from "../../Apis/services/DashboardService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userProfile } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData();
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60)
      return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
    if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
    if (days < 7) return `Il y a ${days} jour${days > 1 ? "s" : ""}`;

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className=" p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Bienvenue sur votre tableau de bord,{" "}
          {userProfile?.name || "Administrateur"} !
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Statistiques Utilisateurs */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              Utilisateurs
            </h3>
            <p className="text-3xl font-bold mt-2 text-blue-600">
              {dashboardData.users.total}
            </p>
            <p className="text-sm text-blue-500 mt-1">
              +{dashboardData.users.newThisMonth} ce mois-ci
            </p>
          </div>

          {/* Statistiques Commandes */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-lg font-semibold text-green-800">Commandes</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {dashboardData.orders.total}
            </p>
            <p className="text-sm text-green-500 mt-1">
              {dashboardData.orders.pending} en attente
            </p>
          </div>

          {/* Statistiques Produits */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-800">Produits</h3>
            <p className="text-3xl font-bold mt-2 text-purple-600">
              {dashboardData.products}
            </p>
            <p className="text-sm text-purple-500 mt-1">+3 nouveaux</p>
          </div>
        </div>

        {/* Activité récente */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Activité récente
          </h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentActivities.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
