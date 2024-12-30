import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Commonform from "../../components/common/form"
import { registerFormControls } from "../../config"
import { useDispatch } from "react-redux"
import { registerUser } from "@/store/auth-slice"
import { useToast } from "@/hooks/use-toast"


const initialState={
  userName:'',
  email:'',
  password:''
}

function AuthRegister() {

  const [formData,setFormData]=useState(initialState)

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {toast}=useToast()

  function onSubmit(event){
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message
        })
        navigate('/auth/login')
      }else{
        toast({
          title:data?.payload?.message
        })
      }
    })
  }

    return (
      <div className="mx-auto w-full max-w-md  space-y-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new Account</h1>
            <p className="mt-2">Already have an Account <Link className="ml-1 font-medium text-primary hover:underline" to='/auth/login'>login</Link></p>
          </div>
          <Commonform formControls={registerFormControls} buttomText={"Sign Up"} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
      </div>
    )
  }
  
  export default AuthRegister
  