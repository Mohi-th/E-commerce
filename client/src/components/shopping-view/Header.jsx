import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { House, User, Menu, ShoppingCart, LogOut } from "lucide-react"
import { Sheet, SheetTrigger,  SheetContent } from "../ui/sheet"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Fragment, useEffect, useState } from "react"
import { logOutuser } from "@/store/auth-slice"
import { fetchCartItems } from "@/store/shop/cart-slice"
import { Label } from "../ui/label"
import UserCartWrapper from "./Cart-wrapper"



function MenuItem() {

  const navigate=useNavigate()
  const location=useLocation()
  const [searchParams,setSearchParams]=useSearchParams();

  function handleNavigate(getCurrentItem){
    sessionStorage.removeItem('filters')
    const currentFilter=getCurrentItem.id!=="home"&&getCurrentItem.id!=='products'&&getCurrentItem.id!=='search'?{
      category:[getCurrentItem.id]
    }:null
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    location.pathname.includes('listing')&&currentFilter!==null?
    setSearchParams(new URLSearchParams(`?category=${getCurrentItem?.id}`)):
    navigate(getCurrentItem.path)
  }

  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map(menuItem => <Label
      onClick={()=>{
        handleNavigate(menuItem)
      }}
        className="text-sm font-medium cursor-pointer"
        key={menuItem.id} >
        {menuItem.label}
      </Label>)
    }
  </nav>
}

function HeaderRightContent() {

  const [openCartSheet, setOpenCartSheet] = useState(false)

  const { cartItems } = useSelector((state) => state.shopCart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)


  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch,user?.id])

  function handleLogOut() {
    dispatch(logOutuser())
  }



  return (
    <div className=" flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => {
        setOpenCartSheet(false)
      }}>
        <Button className="relative" onClick={() => { setOpenCartSheet(true) }} variant="outline" size="icon">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-6px] right-[2px] font-bold ">{cartItems?.items?.length}</span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as {user?.userName}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            console.log("navigate")
            navigate("/shop/account")
          }}>
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>
            <LogOut className="mr-2 h-4 w-4" />
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div >)

}

function ShoppingHeader() {

  return (
    <Fragment>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className=" flex items-center justify-between px-4 h-16 md:px-6">
          <Link to='/shop/home' className="flex items-center gap-2">
            <House className="h-6 w-5" />
            <span className="font-bold">Ecommerce</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only"> Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs" >
              <MenuItem />
              <HeaderRightContent />
            </SheetContent>

          </Sheet>

          <div className="hidden lg:block">
            <MenuItem />
          </div>

          <div className="lg:block hidden">
            <HeaderRightContent />
          </div>


        </div>
      </header>
    </Fragment>
  )
}

export default ShoppingHeader
