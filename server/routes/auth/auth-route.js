const express=require('express')
const {handleUserRegister, handleUserLogin, HandleUserlogout, authMiddleware}=require('../../controllers/auth/auth-controller')

const router=express.Router();

router.post('/register',handleUserRegister)

router.post('/login',handleUserLogin)

router.post('/logout',HandleUserlogout)

router.get("/check-auth",authMiddleware,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        message:"Authenticated User!",
        user
    })
})


module.exports=router