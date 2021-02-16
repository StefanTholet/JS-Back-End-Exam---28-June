const mongoose = require('mongoose');
const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'Username is required'],
        validate: {
            isAsync: true,
            validator: async (v, cb) => {
                let UserModel = mongoose.model('User');
                let user = await UserModel.find({ username: v });
                if (user.length) {
                    return false;
                } else {
                    return true;
                }

            },
                message: 'This username is already taken',                 
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

module.exports = mongoose.model('User', userSchema);

//with validators and messages
// const userSchema = new mongoose.Schema({
//     id: mongoose.Types.ObjectId,
//     username: {
//         type: String,
//         required: [true, 'Username is required'],
//         unique: [true, 'Username must be unique'],
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     enrolledCourses: []
// });