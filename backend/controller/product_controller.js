const productService = require('../services/product_service');

const createProduct = async(req, res) => {
    const user = req.user;
    if(user.role === 'admin'){
        try {
            const product = await productService.createProduct(req.body);
            return res.status(201).json({product});
        } catch (error) {
            return res.status(500).json({error});
        }
    }else{
        return res.status(500).json({error: "user not authorized"});
    }
}


const deleteProduct = async(req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        return res.status(200).json({deletedProduct});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

const updateProduct = async(req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).json({product});
    } catch (error) {
        return res.status(500).json({error});
    }
}

const findProductById = async(req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({error});
    }
}


const getAllProducts = async(req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.getAllProducts(req.query);
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

const createMultipleProducts = async(req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.createMultipleProducts(req.body);
        return res.status(201).json({message:"products created successfully"});
    } catch (error) {
        return res.status(500).json({error});
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProducts,
    findProductById
}

