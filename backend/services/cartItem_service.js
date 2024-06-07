const CartItem = require("../models/cartItem_model");
const userService = require("../services/user_service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("cart item not found: ", cartItemId);
    }
    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("user not found: ", userId);
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const removeCartItem = async (userId, cartItemsIds) => {
  try {
    for(let id of cartItemsIds){
      const cartItem = await findCartItemById(id);
      const user = await userService.findUserById(userId);
      if (user._id.toString() === cartItem.userId.toString()) {
        await CartItem.findByIdAndDelete(cartItem);
      } else {
        throw new Error("you cannot remove this item");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const findCartItemById = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (cartItem){ 
        return cartItem;
    }else{
        throw new Error("no item found with this id: ", cartItemId);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {updateCartItem, findCartItemById, removeCartItem}
