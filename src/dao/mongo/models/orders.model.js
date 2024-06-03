const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    number: Number,
    product: [],
    totalPrice: Number,
    status: String,
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports= mongoose.model('Order', schema, 'orders')