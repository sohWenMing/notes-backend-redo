const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },
    important: {
        type: Boolean,
        required: true,
        default: Math.random() < 0.5
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
});
noteSchema.set('toJSON', {
    transform: (queried, returned) => {
        returned.id = queried._id;
        delete returned._id;
        delete returned.__v;
        return returned;
    }
});

const Note = mongoose.model ('Note', noteSchema);

module.exports = {
    Note
};



