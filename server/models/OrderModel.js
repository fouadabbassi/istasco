import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "En attente",
    },
    items: [
      {
        produitId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produit",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
