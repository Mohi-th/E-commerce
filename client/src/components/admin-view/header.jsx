import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { logOutuser, resetTokenAndCredentials } from "@/store/auth-slice"
import { useNavigate } from "react-router-dom"

function AdminHeader({setOpen}) {

  const dispatch=useDispatch()

  const navigate=useNavigate()

  function handleLogOut(){
    // dispatch(logOutuser())
    dispatch(resetTokenAndCredentials())
        sessionStorage.clear()
        navigate("/auth/login")
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex justify-end flex-1">
        <Button onClick={()=>{handleLogOut()}} className="inline-flex gap-2 items-center rounded-mdpx-4 text-sm font-medium shadow">
          <LogOut />
          <span>
            Logout
          </span>
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
