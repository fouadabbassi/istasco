import Instance from "../axios";
// Créer une commande
export const createOrderApi = async (orderData) => {
  try {
    const response = await Instance.post("/order/create", orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Échec de la création de la commande' };
  }
};
// Obtenir toutes les commandes
export const fetchOrdersApi = async (userId) => {
  try {
    const params = userId ? { userId } : {};
    const response = await Instance.get("/order/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Échec de la récupération des commandes' };
  }
};
// Obtenir une commande spécifique
export const fetchSingleOrderApi = async (id) => {
  try {
    const response = await Instance.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Échec de la récupération des détails de la commande' };
  }
};
// Obtenir les commandes d'un client
export const fetchCustomerOrdersApi = async (userId) => {
  try {
    const response = await Instance.get(`/order/customer/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Échec de la récupération des commandes du client' };
  }
};
// Mettre à jour une commande
export const updateOrderApi = async (id, updates) => {
  try {
    const response = await Instance.patch(`/order/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Échec de la mise à jour de la commande' };
  }
};
// Supprimer une commande
export const destroyOrder = async (id) => {
  try {
    const response = await Instance.delete(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Échec de la suppression de la commande' };
  }
};




















