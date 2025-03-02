// controllers/dashboardController.js
import User from "../models/UserModel.js";
import Order from "../models/OrderModel.js";
import Produit from "../models/ProduitModel.js";
import { errorHandler } from "../utils/error.js";

export const getDashboardData = async (req, res, next) => {
  try {
    // إحصائيات المستخدمين
    const usersStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          newThisMonth: {
            $sum: {
              $cond: [
                { $gte: ["$createdAt", new Date(new Date().setMonth(new Date().getMonth() - 1))] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // إحصائيات الطلبات
      const ordersStats = await Order.aggregate([
          {
              $group: {
                  _id: null,
                  totalOrders: { $sum: 1 },
                  pendingOrders: {
                      $sum: { $cond: [{ $eq: ["$status", "en attente"] }, 1, 0] }
                  }
              }
          }]);

    // إحصائيات المنتجات
    const productsCount = await Produit.countDocuments();

    // النشاطات الأخيرة (الطلبات الحديثة)
    const recentActivities = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name");

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: usersStats[0]?.totalUsers || 0,
          newThisMonth: usersStats[0]?.newThisMonth || 0
        },
        orders: {
          total: ordersStats[0]?.totalOrders || 0,
          pending: ordersStats[0]?.pendingOrders || 0
        },
        products: productsCount,
        recentActivities: recentActivities.map(activity => ({
          action: "Nouvelle commande",
          user: activity.userId.name,
          timestamp: activity.createdAt
        }))
      }
    });

  } catch (error) {
    next(errorHandler(500, 'Échec de la récupération des données du tableau de bord'));
  }
};