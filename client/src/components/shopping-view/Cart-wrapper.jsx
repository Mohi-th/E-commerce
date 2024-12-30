import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemContent from "./User-cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {

    const navigate = useNavigate()

    const totalCartAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum, currentItem) => {
        return (
            sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity
        )
    }, 0) : null

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>
                    Your Cart
                </SheetTitle>
            </SheetHeader>
            <div className=" mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ?
                        cartItems.map(item => <UserCartItemContent key={item.productId} cartItem={item} />) : null
                }
            </div>
            <div className="mt-8">
                <div className="flex justify-between">
                    <span className="font-bold"> total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>
            <Button onClick={() => {
                navigate('/shop/checkout')
                setOpenCartSheet(false)
            }} className="w-full mt-6">
                Check Out
            </Button>
        </SheetContent>
    );
}

export default UserCartWrapper;