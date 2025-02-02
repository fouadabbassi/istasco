import Cart from "../models/CartModel.js";

// Show cart for a specific user
export const showCartByUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.produitId");
    if (!cart) {
      return res.status(404).json();
    }
    cart.items = cart.items.filter(
      (item) => item.produitId !== null
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
export const addItemToCart = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ produitId: productId, quantity: quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.produitId.toString() === productId
      );

      if (itemIndex > -1) {
        // If the product already exists, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.items.push({ produitId: productId, quantity: quantity });
      }
    }

    await cart.save();

    // Populate the last added product
    const lastAddedItem = cart.items.find(
      (item) => item.produitId.toString() === productId
    );
    const populatedItem = await Cart.populate(lastAddedItem, {
      path: "produitId",
    });

    res.status(200).json({
      message: "Produit ajouté à la liste de panier",
      produit: populatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.produitId");

    if (!cart) {
      return res.status(404).json({ message: "Liste de paniers introuvable" });
    }

    const removedItem = cart.items.find(
      (item) => item.produitId._id.toString() === productId
    );

    if (!removedItem) {
      return res.status(404).json({
        message: "Produit introuvable dans la liste de panier",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.produitId._id.toString() !== productId
    );

    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({
        message: "La liste de panier est vide et a été supprimée.",
        removedProduct: removedItem.produitId,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart.",
      removedProduct: removedItem.produitId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add quantity to an item in the cart
export const addquantityItemToCart = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json();
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.produitId.toString() === productId
    );

    if (itemIndex > -1) {
      // Increase the quantity of the item
      cart.items[itemIndex].quantity += quantity;
      await cart.save();
      const lastAddedItem = cart.items[{ produitId: productId }];
      const populatedItem = await Cart.populate(lastAddedItem, {
        path: "produitId",
      });
      return res
        .status(200)
        .json({ message: "Quantity increased.", populatedItem });
    }

    res.status(404).json({ message: "Product not found in cart." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removequantityItemFromCart = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.produitId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.produitId._id.toString() === productId
    );

    if (itemIndex > -1) {
      // Reduce quantity of the found item
      cart.items[itemIndex].quantity -= quantity;

      if (cart.items[itemIndex].quantity <= 0) {
        // Remove item if quantity is zero or less
        const removedProduct = cart.items[itemIndex];
        cart.items.splice(itemIndex, 1);

        // Delete cart if empty
        if (cart.items.length === 0) {
          await Cart.findByIdAndDelete(cart._id);
          return res.status(200).json({
            message: "La liste de panier est vide et a été supprimée.",
            removedProduct,
          });
        }

        await cart.save();
        return res
          .status(200)
          .json({ message: "Product removed from cart.", removedProduct });
      }

      // Save changes and return the updated item
      await cart.save();
      const updatedItem = cart.items[itemIndex];
      return res.status(200).json({
        message: "Quantity reduced.",
        updatedItem,
      });
    }

    res.status(404).json({ message: "Product not found in cart." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

