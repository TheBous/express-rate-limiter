"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
});
exports.default = mongoose.model('apikey', dataSchema);
//# sourceMappingURL=APIKey.js.map