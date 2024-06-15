const Category = require("../models/category_model");
const Product = require("../models/product_model");

const createProduct = async (reqData) => {
  let category = [];

  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
    const categoryCreated = await topLevel.save();
    category.push(categoryCreated);
  }else{
    category.push(topLevel);
  }


  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      level: 2,
    });
    const categoryCreated = await secondLevel.save();
    category.push(categoryCreated);
  }else{
    category.push(secondLevel);
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      level: 3,
    });
    const categoryCreated = await thirdLevel.save();
    category.push(categoryCreated);
  }else {
    category.push(thirdLevel);
  }

  const quantity = reqData.sizes.reduce((acc,item)=>{
    return acc = item.quantity + acc;
},0)

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    imageUrl: reqData.imageUrl,
    price: reqData.price,
    sizes: reqData.sizes,
    quantity: quantity,
    category: category,
  });
  return await product.save();
};

const deleteProduct = async (productId) => {
  await Product.findByIdAndDelete(productId);
  return "product deleted successfully";
};

const updateProduct = async (productId, reqData) => {
  let category = [];

  let topLevel = await Category.findOne({ name: reqData.category[0].name ? reqData.category[0].name :  reqData.category[0]});
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.category[0].name ? reqData.category[0].name :  reqData.category[0],
      level: 1,
    });
    const categoryCreated = await topLevel.save();
    category.push(categoryCreated);
  }else{
    category.push(topLevel);
  }

  let secondLevel = await Category.findOne({
    name: reqData.category[1].name ? reqData.category[1].name :  reqData.category[1],
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.category[1].name ? reqData.category[1].name :  reqData.category[1],
      level: 2,
    });
    const categoryCreated = await secondLevel.save();
    category.push(categoryCreated);
  }else{
    category.push(secondLevel);
  }

  let thirdLevel = await Category.findOne({
    name: reqData.category[2].name ? reqData.category[2].name :  reqData.category[2],
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.category[2].name ? reqData.category[2].name :  reqData.category[2],
      level: 3,
    });
    const categoryCreated = await thirdLevel.save();
    category.push(categoryCreated);
  }else {
    category.push(thirdLevel);
  }


  const quantity = reqData.sizes.reduce((acc,item)=>{
    return acc = item.quantity + acc;
  },0)
  reqData.quantity = quantity;
  reqData.category = category;
  await Product.findByIdAndUpdate(productId, reqData);
  return "product updated successfully";
};

// const updateCategory = async(categories)=>{
//   for(let category of categories){
//     await Category.findByIdAndUpdate(category._id, category);
//   }
// }

const findProductById = async (productId) => {
  const product = await Product.findById(productId)
    .populate('category')
    .exec();
  if (!product) {
    throw new Error("Product not found with id: ", productId);
  }
  return product;
};

const getAllProducts = async (reqQuery) => {
  let { category, color, sizes, priceRange, sort, pageNumber,length, limit } =
    reqQuery;
  
  let minPrice;
  let maxPrice;
  if (priceRange) {
    minPrice = parseInt(priceRange.split("-")[0]);
    maxPrice = parseInt(priceRange.split("-")[1]);
  }

  limit = limit || 10;
  let query = Product.find();

  // to do : make product.categories an array and insert each category into product.categories array
  if (category) {
    let lengthSet;
    let presnetCategory;
    if(length){
      lengthSet = new Set(length.split(',').map(l => l.trim().toLowerCase()));
    }
    let categorySet = new Set(
      category.split(",").map((cat) => cat.trim().toLowerCase())
    )
    if(lengthSet){
      presnetCategory = await Category.distinct('_id', {name:{$in : [...categorySet, ...lengthSet]}});
    }else{
      presnetCategory = await Category.distinct('_id', {name:{$in : [...categorySet]}});
    }
    query.where("category").all(presnetCategory);
  }
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query.where("color").regex(colorRegex);
  }

  if (sizes) {
    const sizesSet = new Set(
      sizes.split(",").map((size) => size.trim().toUpperCase())
    );
    query.where("sizes.name").in([...sizesSet]);
  }

  // todo- have to make price filter radio in forntend
  if (priceRange) {
    query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (sort) {
    const sortDirection = sort === "price_heigh_to_low" ? -1 : 1;
    query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * limit;

  query.skip(skip).limit(limit);
  const products = await query.populate('category').sort({createdAt: -1}).exec();

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products: products,
    currentPage: pageNumber,
    totalPages: totalPages,
  };
};

const createMultipleProducts = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProducts,
};
