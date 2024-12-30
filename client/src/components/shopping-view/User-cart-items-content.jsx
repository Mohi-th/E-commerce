import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice"
import { useToast } from "@/hooks/use-toast";


function UserCartItemContent({ cartItem }) {

  const {user}=useSelector((state)=>state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);

  const{toast}=useToast()

  const dispatch=useDispatch();

  function handleUpdateQuantity(getCartItem,typeOfAction){

    if(typeOfAction==='plus'){
      let getCartItems=cartItems.items||[];

    if(getCartItems.length){

      const indexOfCurrentitem=getCartItems.findIndex(item=>item.productId===getCartItem?.productId)

      const getCurrentProductIndex=productList?.findIndex(product=>product._id==getCartItem?.productId)

      const getTotalStock=productList[getCurrentProductIndex].totalStock

      if(indexOfCurrentitem>-1){ 
        const getQuantity=getCartItems[indexOfCurrentitem].quantity
        if(getQuantity+1>getTotalStock){
          toast({
            title:`Only ${getQuantity} quantity can be added for this item `,
            variant:'destructive'
          })
          return;
        }
      }
    }
    }

    dispatch(updateCartQuantity({ userId:user?.id, productId:getCartItem?.productId ,quantity:
      typeOfAction==='plus'?getCartItem?.quantity+1:getCartItem?.quantity-1
    })).then((data)=>{
      console.log(data,"fjknigbfu")
        if(data.payload?.success){
          toast({
            title:"Cart item is updated successfully"
          })
        }
    })
  }

  function handleCartItemDelete(getCartItem){
    dispatch(deleteCartItem({ userId:user?.id, productId:getCartItem?.productId })).then((data)=>{
      console.log(data,"fjknigbfu")
        if(data.payload?.success){
          toast({
            title:"Cart item is deleted successfully"
          });
        }
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <img src={cartItem.image} alt={cartItem?.title} className="w-20 h-20 rounded object-cover" />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button disabled={cartItem.quantity===1} onClick={()=>{handleUpdateQuantity(cartItem,'minus')}} className="w-8 h-8 rounded-full" variant="outline" size="icon">
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button onClick={()=>{handleUpdateQuantity(cartItem,'plus')}} className="w-8 h-8 rounded-full" variant="outline" size="icon">
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
            ${((cartItem?.salePrice>0?cartItem.salePrice:cartItem.price)*cartItem?.quantity).toFixed(2)}
        </p>
        <Trash onClick={()=>{handleCartItemDelete(cartItem)}} className="cursor-pointer mt-1" size={20}/>
      </div>
    </div>
  )
}

export default UserCartItemContent
