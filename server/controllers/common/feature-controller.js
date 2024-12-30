const { get } = require("mongoose");
const Feature=require("../../models/feature")


const addFeatureImage=async(req,res)=>{
    try {

        const {image}=req.body;
        console.log(image)

        const featuresImages=new Feature({
            image
        })

        await featuresImages.save();

        res.status(201).json({
            success:true,
            data:featuresImages
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to update the order status"
        })
    }
}

const getFeatureImage=async(req,res)=>{
    try {
        const images=await Feature.find({})

        res.status(200).json({
            success:true,
            data:images
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to update the order status"
        })
    }
}

module.exports={addFeatureImage,getFeatureImage}