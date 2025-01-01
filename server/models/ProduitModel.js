import mongoose from "mongoose";

const produitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    pdf: {
      type: String,
    },
    images: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Produit = mongoose.model("Produit", produitSchema);
export default Produit;
