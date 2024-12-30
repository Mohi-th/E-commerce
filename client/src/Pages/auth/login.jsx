import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Commonform from "../../components/common/form"
import { loginFormControls } from "../../config"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/auth-slice"
import { useToast } from "@/hooks/use-toast"



const initialState = {
  email: '',
  password: ''
}

function AuthLogin() {

  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  console.log(formData)

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log("data : ",data)
      if (data.payload?.success) {
        toast({
          title: data.payload?.message
        })
        if (data.payload?.role === 'admin') navigate('/adim/dashboard');
        else navigate('/shop/home');
      } else {
        toast({
          title: data.payload?.message
        })
      }
    })
  }

  return (
    <div className="mx-auto w-full max-w-md  space-y-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in To Your Account</h1>
        <p className="mt-2">Already have an Account <Link className="ml-1 font-medium text-primary hover:underline" to='/auth/register'>Register</Link></p>
      </div>
      <Commonform formControls={loginFormControls} buttomText={"Sign In"} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
    </div>
  )
}

export default AuthLogin
