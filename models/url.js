const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // to not add _id in the visitHistory array, we can use _id: false
    // visitHistory: [{ timestamps: { type: Number , required: true}, _id: false}]

    visitHistory: [{ timestamps: { type: Number, required: true } }]

},

    { timestamps: true }
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;