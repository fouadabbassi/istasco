import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleOrder } from "../../Redux/orderAction";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!currentOrder) return <div>Commande non trouvée</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Détails de la commande</h1>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold">Commande #{currentOrder._id}</h2>
        <p>Statut: {currentOrder.status}</p>
        <p>Prix total: {currentOrder.total_price} DH</p>
        <p>Date: {new Date(currentOrder.createdAt).toLocaleString()}</p>

        <h3 className="text-lg font-medium mt-4">Informations client</h3>
        <p>Nom: {currentOrder.userId?.name}</p>
        <p>Email: {currentOrder.userId?.email}</p>
        <p>Téléphone: {currentOrder.phone}</p>
        <p>Adresse: {currentOrder.address}</p>
        {currentOrder.company && <p>Société: {currentOrder.company}</p>}
        {currentOrder.message && <p>Message: {currentOrder.message}</p>}

        <h3 className="text-lg font-medium mt-4">Produits</h3>
        <div className="mt-2">
          {currentOrder.items?.map((item, index) => (
            <div key={index} className="border-b py-2 flex items-start">
              <img
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  "/images/produits/" +
                  item?.produitId?.images[0]
                }
                alt={item?.produitId?.name}
                className="w-16 h-16 object-cover mr-3"
              />
              <div>
                <p className="font-medium">{item?.produitId?.name}</p>
                <p>Quantité: {item?.quantity}</p>
                <p>Prix unitaire: {item?.produitId?.price} DH</p>
                <p>Total: {item?.quantity * item?.produitId?.price} DH</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-lg font-medium">
            Total général: {currentOrder.total_price} DH
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
