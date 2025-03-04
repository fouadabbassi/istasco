import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, fetchOrders, updateOrder } from "../../Redux/orderAction";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const handleUpdate = (orderId) => {
    dispatch(updateOrder(orderId, { status: newStatus }));
    setOrderId(null);
    setNewStatus("");
  };
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const matchesCustomer = customerFilter
      ? order.userId?._id.includes(customerFilter) ||
        order.userId?.name.toLowerCase().includes(customerFilter.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesCustomer && matchesStatus;
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!orders || orders.length === 0) return <div>Aucune commande trouvée.</div>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestion des commandes
      </h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Filtrer par client:</label>
          <input
            type="text"
            placeholder="ID ou nom du client"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Filtrer par statut:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Tous les statuts</option>
            <option value="en attente">En attente</option>
            <option value="en cours">En cours</option>
            <option value="livrée">Livrée</option>
            <option value="annulée">Annulée</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <Link
                        to={`/dashboard/orders/customer/${order.userId?._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {order.userId?.name}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {order.userId?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.phone}</div>
                  <div className="text-sm text-gray-500">{order.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.total_price} DH
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {order.items?.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-sm"
                      >
                        {item.produitId?.name} (x{item.quantity})
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {orderId === order?._id ? (
                    <div>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full p-2 border ${
                          order?.status === "livrée"
                            ? "bg-green-100 text-green-800"
                            : order?.status === "annulée"
                            ? "bg-red-100 text-red-800"
                            : order?.status === "En attente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <option
                          value="en attente"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          En attente
                        </option>
                        <option
                          value="en cours"
                          className="bg-blue-100 text-blue-800"
                        >
                          En cours
                        </option>
                        <option
                          value="livrée"
                          className="bg-green-100 text-green-800"
                        >
                          livrée
                        </option>
                        <option
                          value="annulée"
                          className="bg-red-100 text-red-800"
                        >
                          annulée
                        </option>
                      </select>
                      <button
                        onClick={() => handleUpdate(order?._id)}
                        className="text-green-600 hover:text-green-900 p-3"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setOrderId(null)}
                        className="text-red-600 hover:text-red-900 p-3"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order?.status === "livrée"
                            ? "bg-green-100 text-green-800"
                            : order?.status === "annulée"
                            ? "bg-red-100 text-red-800"
                            : order?.status === "en attente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order?.status}
                      </span>
                      <button
                        onClick={() => {
                          setOrderId(order?._id);
                          setNewStatus(order?.status);
                        }}
                        className="text-green-600 hover:text-green-900 px-6"
                      >
                        Update
                      </button>
                    </>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/dashboard/orders/${order._id}`}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Détails
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Êtes-vous sûr de vouloir supprimer cette commande ?"
                        )
                      ) {
                        dispatch(deleteOrder(order._id));
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
