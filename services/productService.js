const Product = require('../models/Product');
const User = require('../models/User')

async function getAll() {
    let products = await Product.find({}).lean();
    return products;
}

function getOne(id) {
    return Product.findById(id).lean();
}

function create(data, userId) {
    let product = new Product({ ...data, creator: userId });
    return product.save();
}

function updateOne(productId, productData) {
    return Product.updateOne({ _id: productId }, productData);
}

 function deleteOne(productId) {
    return Product.deleteOne({ _id: productId });
}

async function updateDbArray(Document, id, arrayName, element) {
    try {
        const document = await Document.findById(id);
        document[arrayName].push(element);
        document.save();
        return document;
    } catch (error) {
        console.log(error);
        return;
    }
}

// function getOneWithAccessories(id) {
//     return Cube.findById(id)
//         .populate('accessories')
//         .lean();
// }

module.exports = {
    updateDbArray,
    getAll,
    getOne,
    //getOneWithAccessories,
    create,
    updateOne,
    deleteOne,
    //getAllSold
}

//bonnus
// function getAllSold(userId) {
//     return Product.find({ creator: userId }).lean();
// }

// function getOneWithAccessories(id) {
//     return Cube.findById(id)
//         .populate('accessories')
//         .lean();
// }