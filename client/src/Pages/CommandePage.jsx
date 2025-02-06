/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCustomerOrders } from "../Redux/orderAction";
import { getProfileUser } from "../Redux/userAction";

const CommandePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerOrders} = useSelector(
    (state) => state.order
  );
  const { userProfile } = useSelector((state) => state.auth);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProfileUser());
        if (userProfile?._id) {
          await dispatch(fetchCustomerOrders(userProfile._id));
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [dispatch, userProfile?._id]);

  useEffect(() => {
    if (!userProfile) {
      navigate("/login"); // Rediriger vers la page de connexion si non authentifié
    }
  }, [userProfile, navigate]);

  const filteredOrders = filterStatus
    ? customerOrders?.filter((order) => order.status === filterStatus) || []
    : customerOrders || [];

  const isCustomerView = userProfile?.role === "customer";



  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {isCustomerView ? "Mes Commandes" : "Commandes du client"}
        </h1>

        <div className="flex items-center w-full md:w-auto">
          <label htmlFor="status-filter" className="mr-2 text-sm text-gray-600">
            Filtrer:
          </label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les statuts</option>
            <option value="en attente">En attente</option>
            <option value="en cours">En cours</option>
            <option value="livrée">Livrée</option>
            <option value="annulée">Annulée</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>N° Commande</TableHeader>
                <TableHeader>Date</TableHeader>
                {!isCustomerView && <TableHeader>Total</TableHeader>}
                <TableHeader>Statut</TableHeader>
                <TableHeader>Détails</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <TableRow
                  key={order._id}
                  order={order}
                  isCustomerView={isCustomerView}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCustomerView && <CustomerInfoBox />}
    </div>
  );
};

// Composants supplémentaires pour une meilleure modularité
// eslint-disable-next-line react/prop-types
const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

// eslint-disable-next-line react/prop-types
const TableRow = ({ order, isCustomerView }) => {
  const statusColors = {
    livrée: "bg-green-100 text-green-800",
    annulée: "bg-red-100 text-red-800",
    "en attente": "bg-yellow-100 text-yellow-800",
    "en cours": "bg-blue-100 text-blue-800",
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        #{order._id.slice(-6).toUpperCase()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      {!isCustomerView && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {order.total_price?.toFixed(2)} DH
        </td>
      )}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            statusColors[order.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          to={`/commande/${order._id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          aria-label={`Voir les détails de la commande ${order._id}`}
        >
          Voir détails
        </Link>
      </td>
    </tr>
  );
};

const CustomerInfoBox = () => (
  <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
    <h3 className="text-lg font-semibold text-blue-800 mb-2">
      Informations importantes
    </h3>
    <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
      <li>Le suivi de votre commande est mis à jour régulièrement</li>
      <li>Pour toute question, contactez notre service client</li>
    </ul>
  </div>
);

export default CommandePage;
