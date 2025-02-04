import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        produitId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produit",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // هذا الخيار لإنشاء الحقول التلقائية createdAt و updatedAt
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
