import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCustomerOrders } from "../../Redux/orderAction";

const CustomerOrdersPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { customerOrders, loading, error } = useSelector(
    (state) => state.order
  );
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    dispatch(fetchCustomerOrders(userId));
  }, [dispatch, userId]);

  const filteredOrders = filterStatus
    ? customerOrders.filter((order) => order.status === filterStatus)
    : customerOrders;

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (customerOrders.length === 0)
    return <div>Aucune commande trouvée pour ce client</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Commandes du client</h1>

      <div className="mb-4">
        <label className="mr-2">Filtrer par statut:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Tous</option>
          <option value="en attente">En attente</option>
          <option value="en cours">En cours</option>
          <option value="livrée">Livrée</option>
          <option value="annulée">Annulée</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">N° Commande</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-2">#{order._id}</td>
                <td className="px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{order.total_price} DH</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "livrée"
                        ? "bg-green-100 text-green-800"
                        : order.status === "annulée"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/dashboard/orders/${order._id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrdersPage;
