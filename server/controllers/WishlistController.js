import Wishlist from "../models/WishlistModel.js";

// Show wishlist for a specific user
export const showWishlistByUser = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.id }).populate(
      "items.produitId"
    );
    if (!wishlist) {
      return res.status(404).json();
    }
    wishlist.items = wishlist.items.filter((item) => item.produitId !== null);
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to wishlist
export const addItemToWishlist = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId });

    // إذا لم توجد قائمة رغبات، أنشئ واحدة جديدة
    if (wishlist) {
      // التحقق مما إذا كان المنتج موجودًا بالفعل
      const productExists = wishlist.items.findIndex(
        (item) => item.produitId.toString() === productId
      );

      if (productExists > -1) {
        return res
          .status(400)
          .json({ message: "Produit déjà dans votre liste de souhaits." });
      }
      // إضافة المنتج إلى العناصر
      wishlist.items.push({ produitId: productId });
    } else {
      wishlist = new Wishlist({
        userId,
        items: [{ produitId: productId }],
      });
    }

    // حفظ قائمة الرغبات
    await wishlist.save();

    // تعبئة (populate) تفاصيل المنتج الأخير المضاف
    const lastAddedItem = wishlist.items.find(
      (item) => item.produitId.toString() === productId
    ); // الحصول على آخر عنصر مضاف
    const populatedItem = await Wishlist.populate(lastAddedItem, {
      path: "produitId",
    });

    // إرسال النتيجة مع تفاصيل المنتج الأخير المضاف
    res
      .status(200)
      .json({
        message: "Produit ajouté à la liste de souhaits.",
        produit: populatedItem,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from wishlist
export const removeItemFromWishlist = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "items.produitId"
    );

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Liste de souhaits introuvable." });
    }

    // العثور على العنصر المراد حذفه
    const removedItem = wishlist.items.find(
      (item) => item.produitId._id.toString() === (productId || undefined)
    );

    if (!removedItem) {
      return res
        .status(404)
        .json({ message: "Produit introuvable dans la liste de souhaits." });
    }

    // إزالة المنتج من قائمة العناصر
    wishlist.items = wishlist.items.filter(
      (item) => item.produitId._id.toString() !== productId
    );

    // إذا كانت قائمة الرغبات فارغة بعد الإزالة، قم بحذفها
    if (wishlist.items.length === 0) {
      await Wishlist.findByIdAndDelete(wishlist._id);
      return res.status(200).json({
        message: "La liste de souhaits est vide et a été supprimée.",
        removedProduct: removedItem.produitId,
      });
    }

    // حفظ قائمة الرغبات بعد التحديث
    await wishlist.save();

    // إرجاع تفاصيل المنتج المحذوف
    res.status(200).json({
      message: "Produit retiré de la liste de souhaits.",
      removedProduct: removedItem.produitId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
