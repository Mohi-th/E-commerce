const Address = require('../../models/Address')

const addAddress = async (req, res) => {

    try {

        const { userId, address, city, pincode, phone, notes } = req.body

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided!'
            })
        }

        const newlyCreatedAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        })

        await newlyCreatedAddress.save();

        res.status(201).json({
            success: true,
            data: newlyCreatedAddress
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: 'false',
            message: 'some error has occured'
        })
    }

}



const fetchAllAddress = async (req, res)=>{

    try {

        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'user id is required !'
            })
        }

        const addressList = await Address.find({ userId })

        res.status(200).json({
            success:true,
            data:addressList
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: 'false',
            message: 'some error has occured'
        })
    }

}



const editAddress = async (req, res)=>{

    try {

        const { userId, addressId } = req.params

        const formData = req.body

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'user id and address id is required !'
            })
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId, userId
        },
            formData,
            { new: true }
        )

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found !"
            })
        }

        res.status(200).json({
            success: true,
            data: address
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: 'false',
            message: 'some error has occured'
        })
    }
}



const deleteAddress = async (req, res)=>{

    try {
        const { userId, addressId } = req.params

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'user id and address id is required !'
            })
        }

        const address=await Address.findByIdAndDelete({_id:addressId,userId});

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found !"
            })
        }

        res.status(200).json({
            success: true,
            data: address
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: 'false',
            message: 'some error has occured'
        })
    }

}

module.exports = { addAddress, deleteAddress, fetchAllAddress, editAddress }