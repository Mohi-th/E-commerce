const Order = require('../../models/Order')
const Product = require('../../models/products')
const ProductReview = require('../../models/review')

const addProductReview = async (req, res) => {
    try {

        const {
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        } = req.body

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'confirmed'
        })

        if (!order) {
            return res.status(403).json({
                success: false,
                messgae: "You need to purchase product to review"
            })
        }

        const checkExistingReview = await ProductReview.findOne({ userId, productId });

        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                messgae: "You already reviewed this product!"
            })
        }

        const newReview = new ProductReview({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        })

        await newReview.save();

        const reviews = await ProductReview.find({ productId })
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength

        await Product.findByIdAndUpdate(productId, { averageReview })

        res.status(201).json({
            succes: true,
            data: newReview
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            messgae: "error while adding a review"
        })
    }
}

const getProductReview = async (req, res) => {
    try {

        const { productId } = req.params;

        const reviews = await ProductReview.find({productId})

        res.status(200).json({
            succes: true,
            data: reviews
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            messgae: "error while adding a review"
        })
    }
}

module.exports = { getProductReview, addProductReview }