import Order from "../models/OrderModel.js";
import { sendOrderEmailToAdmin } from "../utils/emailSender.js";
import { errorHandler } from "../utils/error.js";

// Créer une nouvelle commande
export const createOrder = async (req, res, next) => {
  try {
    const { userId, phone, company, address, message, total_price, items } = req.body;

    if (!userId || !phone || !address || !total_price || !items || items.length === 0) {
      return next(errorHandler(400, 'Champs requis manquants'));
    }

    const order = new Order({
      userId,
      phone,
      company: company || '',
      address,
      message: message || '',
      total_price,
      items,
      status: 'en attente'
    });
    await order.save();

    // Populate after saving
    const orderPopulated = await Order.findById(order._id)
      .populate("items.produitId")
      .populate("userId");

    // Send email to admin with populated data
    await sendOrderEmailToAdmin(orderPopulated);

    res.status(201).json({ success: true, order: orderPopulated });
  } catch (error) {
    next(errorHandler(500, 'Échec de la création de la commande'));
  }
};


// Obtenir toutes les commandes
export const getOrder = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate("items.produitId userId");
      
    res.json({ success: true, orders });
  } catch (error) {
    next(errorHandler(500, 'Échec de la récupération des commandes'));
  }
};

// Obtenir les détails d'une commande
export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.produitId userId");
      
    if (!order) {
      return next(errorHandler(404, 'Commande non trouvée'));
    }
    
    res.json({ success: true, order });
  } catch (error) {
    next(errorHandler(500, 'Échec de la récupération des détails de la commande'));
  }
};

// Obtenir les commandes d'un client
export const getCustomerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("items.produitId");
    
    res.json({ success: true, orders });
  } catch (error) {
    next(errorHandler(500, 'Échec de la récupération des commandes du client'));
  }
};

// Mettre à jour une commande
export const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("items.produitId userId");

    if (!order) {
      return next(errorHandler(404, 'Commande non trouvée'));
    }

    res.json({ success: true, order });
  } catch (error) {
    next(errorHandler(500, 'Échec de la mise à jour de la commande'));
  }
};

// Supprimer une commande
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(errorHandler(404, 'Commande non trouvée'));
    }

    res.json({ 
      success: true, 
      message: "Commande supprimée avec succès", 
      deletedOrder: order 
    });
  } catch (error) {
    next(errorHandler(500, 'Échec de la suppression de la commande'));
  }
};