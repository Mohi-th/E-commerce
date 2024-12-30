const mongoose = require('mongoose')

const ChartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                require: true
            },

            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
},
{
    timestamps: true
});


const Cart=mongoose.model('Cart',ChartSchema);

module.exports=Cart;
