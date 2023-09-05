const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    expirationDate: {
        required: false,
        type: Date,
    },
    active: {
        required: true,
        default: true,
        type: Boolean,
    }
})

export default mongoose.model('apikey', dataSchema)