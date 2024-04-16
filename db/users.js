const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minLength: 5,
    },
    passwordHash: {
        type: String,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

userSchema.set('toJSON', {
    transform: function(retrieved, returned) {
        returned.id = retrieved._id;
        delete returned._id;
        delete returned.__v;
        delete returned.passwordHash;
        return returned;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};