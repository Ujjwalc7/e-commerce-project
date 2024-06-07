const User = require("../models/user_model");
const jwtProvider = require("../config/jwtProvider");
const Cart = require("../models/cart_model");
const CartItem = require("../models/cartItem_model");
const Address = require("../models/address_model");


const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error("user not found with id: ", userId);
    } else {
      return user;
    }
  } catch (error) {
    throw new Error(error);
  }
};
const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found with email: ", email);
    } else {
      return user;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = await jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("user not found with id: ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.find({role: 'customer'});
    return allUsers;
  } catch (error) {
    throw new Error(error);
  }
};

const findAndDeleteUser = async (userId) => {
  try {
    deletUserCart(userId);
    deletUserAddress(userId);
    await User.findByIdAndDelete(userId);
   return {message: 'User deleted', userId: userId};
  } catch (error) {
    throw new Error(error);
  }
};

const deletUserCart = async(userId) => {
  try {
      await Cart.deleteOne({user: userId});
      await CartItem.deleteMany({userId: userId});
  } catch (error) {
    console.log(error);
      throw new Error(error);
  }
}

const deletUserAddress = async(userId) => {
  try {
      await Address.deleteMany({user: userId});
  } catch (error) {
    console.log(error);
      throw new Error(error);
  }
}

const addNewAddress = async(user, data) => {
  try {
    const address = new Address(data);
    address.user = user._id;
    const addressCreated = await address.save();

    user.address.push(addressCreated);
    await user.save();
    return addressCreated;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteAddress = async(user, addressId) => {
  try {
    const address = await Address.findById(addressId);
    if(user._id.toString() === address.user.toString()){
      await Address.findByIdAndDelete(addressId);
      user.address = user.address.filter(addressId => addressId.toString() !== address._id.toString());
      user.save();
      return addressId;
    }
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
  findUserById,
  findUserByEmail,
  getUserProfileByToken,
  getAllUsers,
  findAndDeleteUser,
  addNewAddress,
  deleteAddress
};
