const mongoose = require('mongoose');
const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username should consist of at least 3 characters'],
        validate: {
            validator: function (v) {
                return usernameRegex.test(v);
            },
            message: props => `Username should consist of English letters and / or digits`
        },
    },
    password: {
        type: String,
        required: true,
    }
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