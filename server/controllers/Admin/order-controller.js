const Order=require('../../models/Order')

const getOrdersOfAllUsers=async(req,res)=>{
    try {

        const orders=await Order.find({})

        if(!orders.length){
            return res.status(404).json({
                success:false,
                message:'No orders found!'
            })
        }
        res.status(200).json({
            success:true,
            data:orders
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occured!"
        })
    }
}

const getOrderDetailsForAdmin=async(req,res)=>{

    try {
        const {id}=req.params

        const order=await Order.findById(id)

        console.log(order)

        if(!order){
            return res.status(404).json({
                success:false,
                message:' order not found!'
            })
        }

        res.status(200).json({
            success:true,
            data:order
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occured!"
        })
    }
}

const updateOrderStatus=async(req,res)=>{

    try {

        const {id}=req.params
        const {orderStatus}=req.body

        const order=await Order.findById(id)

        if(!order){
            return res.status(404).json({
                success:false,
                message:' order not found!'
            })
        }

        await Order.findByIdAndUpdate(id,{orderStatus})

        res.status(200).json({
            success:true,
            message:"Order status updated successfully."
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to update the order status"
        })
    }

}

module.exports={getOrdersOfAllUsers,getOrderDetailsForAdmin,updateOrderStatus}