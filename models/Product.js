const mongoose = require('mongoose');
const errorCompiler = require('../controllers/helpers/errorCompiler');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must specified'],
        validate: {
            isAsync: true,
            validator: async (v, cb) => {
                let ProductModel = mongoose.model('Product');
                let product = await ProductModel.find({ title: v });
                if (product.length > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            message: 'There is already a title with this name',
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [50, 'Description must be can\'t be longer than 50 characters']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Url is required'],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type: String,
        required: true
    },
    likedBy: []
});

module.exports = mongoose.model('Product', productSchema);

//with custom validators and error messages 
// const productSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         minlength: [4, 'Title must be at least 4 characters long'],
//         required: true,

//     },
//     description: {
//         type: String,
//         required: true,
//         minlength: [20, 'Title must be at least 20 characters long']
//     },
//     imageUrl: {
//         type: String,
//         validate: {
//             validator: function (v) {
//                 return startsWithHttpOrHttps.test(v);
//             },
//             message: props => `${props.value} is not a valid image url.`
//         },
//         required: [true, 'Image url is required']
//     },
//     createdOn: {
//         type: String,
//         required: true,
//     },
//     creator: {
//         type: mongoose.Types.ObjectId,
//         ref: 'User'
//     },
//     duration: {
//         type: String,
//         required: [true, 'Course duration is a required field']
//     },
//     enrolledUsers: []
// });

// module.exports = mongoose.model('Product', productSchema);