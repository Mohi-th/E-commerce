const mongoose=require('mongoose')

const ConnectToDB=async(url)=>{
    try{
        await mongoose.connect(url)
        console.log('connected to Mongo DB ')
    }catch(err){
        console.log('error while connecting to db')
    }
}

module.exports=ConnectToDB