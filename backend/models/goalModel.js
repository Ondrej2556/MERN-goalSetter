const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    goalText: {
        type: String,
        required: [true, 'Please add your goal text']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema);