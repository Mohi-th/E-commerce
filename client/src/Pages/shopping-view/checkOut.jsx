import Address from '@/components/shopping-view/Address'
import img from '../../assets/account.jpg'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemContent from '@/components/shopping-view/User-cart-items-content'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'



function ShoppingcheckOut() {

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false)

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const { toast } = useToast();

  const dispatch = useDispatch();

  const totalCartAmount = cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((sum, currentItem) => {
    return (
      sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity
    )
  }, 0) : null


  function handleInitiatePaypalPayment() {

    if (cartItems.items.length === 0) {
      toast({
        title: 'Your Cart is Empty. please add items to proceed',
        variant: 'destructive'
      })
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: 'Pease select one address to proceed',
        variant: 'destructive'
      })
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems._id,
      cartItems: cartItems.items.map(cartItem => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,
        quantity: cartItem?.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date,
      paymentId: '',
      payerId: ''
    }

    dispatch(createNewOrder(orderData))
      .then((data) => {
        if (data?.payload?.success) {
          setIsPaymentStart(true)
        } else {
          isPaymentStart(false)
        }
      })
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }


  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          className='w-full h-full object-cover object-center'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className='flex flex-col'>
          {
            cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map(item => <UserCartItemContent key={item._id} cartItem={item} />) : null
          }
          <div className="mt-8">
            <div className="flex justify-between">
              <span className="font-bold"> total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {
                isPaymentStart?'Processing paypal payment...':'Checkout with Paypal'
              }
              </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShoppingcheckOut
