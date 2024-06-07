const userService = require("../services/user_service");

const getUserProfile = async(req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        if(!jwt){
            return res.status(404).json({message: "token not found"});
        }
        const user = await userService.getUserProfileByToken(jwt);
        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}


const getAllUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const deleteUser = async(req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.findAndDeleteUser(userId);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const addNewAddress = async(req, res) => {
    const user = req.user;
    try {
        const resp = await userService.addNewAddress(user, req.body);
        return res.status(200).json(resp);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteAddress = async(req, res) => {
    const user = req.user;
    const addressId = req.params.id;
    try {
        const resp = await userService.deleteAddress(user, addressId);
        return res.status(200).json(resp);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getAllUsers, getUserProfile, deleteUser, addNewAddress, deleteAddress}