import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfileUser } from "../Redux/userAction";
import { fetchSingleOrder } from "../Redux/orderAction";

const CommandeDetaille = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder, loading, error } = useSelector((state) => state.order);
  const { userProfile } = useSelector((state) => state.auth);
  const [isCustomerView, setIsCustomerView] = useState(false);

  useEffect(() => {
    if (orderId) {
      console.log(orderId)
      dispatch(fetchSingleOrder(orderId));
    }
    dispatch(getProfileUser());
  }, [dispatch, orderId]);

  useEffect(() => {
    if (userProfile) {
      setIsCustomerView(userProfile.role === "customer");

      // Vérifier si l'utilisateur a le droit de voir cette commande
      if (
        currentOrder &&
        userProfile._id !== currentOrder.userId._id &&
        userProfile.role !== "admin"
      ) {
        toast.error("Accès non autorisé");
        navigate("/commandes");
      }
    }
  }, [userProfile, currentOrder, navigate]);

  if (loading)
    return <div className="text-center py-12">Chargement en cours...</div>;
  if (error)
    return (
      <div className="text-center py-12 text-red-500">Erreur: {error}</div>
    );
  if (!currentOrder)
    return <div className="text-center py-12">Commande non trouvée</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Détails de la commande #{currentOrder._id.slice(-6).toUpperCase()}
            </h1>
            <p className="text-gray-500 mt-1">
              Passée le{" "}
              {new Date(currentOrder.createdAt).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentOrder.status === "livrée"
                ? "bg-green-100 text-green-800"
                : currentOrder.status === "annulée"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {currentOrder.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Adresse de livraison</h3>
            <p className="text-gray-700">{currentOrder.address}</p>
            {currentOrder.company && (
              <p className="text-gray-700 mt-1">
                Société: {currentOrder.company}
              </p>
            )}
            <p className="text-gray-700 mt-1">
              Téléphone: {currentOrder.phone}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Informations client</h3>
            <p className="text-gray-700">{currentOrder.userId.name}</p>
            <p className="text-gray-700">{currentOrder.userId.email}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Articles commandés</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                {!isCustomerView && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix unitaire
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrder.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/images/produits/${
                            item.produitId?.images[0] || "default-product.jpg"
                          }`}
                          alt={item.produitId?.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.produitId?.name || "Produit supprimé"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  {!isCustomerView && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Prix X Quantité <br /> {item.produitId.price} X{" "}
                      {item.quantity}
                      <br /> {" = "}
                      {item.produitId.price * item.quantity} DH
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isCustomerView && (
          <div className="mt-6 flex justify-end">
            <div className="bg-gray-50 rounded-lg p-4 w-full md:w-1/3">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Sous-total:</span>
                <span>{currentOrder.total_price} DH</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Livraison:</span>
                <span>Gratuite</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Total:</span>
                <span>{currentOrder.total_price} DH</span>
              </div>
            </div>
          </div>
        )}

        {currentOrder.message && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Message du client:</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded">
              {currentOrder.message}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Link
            to={"/commande"}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retour aux commandes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommandeDetaille;
