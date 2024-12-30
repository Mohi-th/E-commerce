import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import RatingComponent from "../common/rating";
import { useEffect, useState } from "react";
import { addReviews, getReviews } from "@/store/shop/review-slice";


function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch()

    const { toast } = useToast()

    const { user } = useSelector((state) => state.auth)
    const { cartItems } = useSelector((state) => state.shopCart)
    const { reviews } = useSelector((state) => state.shopReview)

    const [reviewMsg, setReviewMsg] = useState("")

    const [rating, setRating] = useState(0)

    function handleAddReview() {
        const data = {
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating,
        }
        dispatch(addReviews(data))
            .then((data) => {
                if (data?.payload?.success) {
                    setRating(0)
                    setReviewMsg("")
                    dispatch(getReviews(productDetails?._id))
                    toast({
                        title: "Review added Successfully"
                    })
                }
            })
    }

    function handleRatingChange(getRating) {
        setRating(getRating)
    }

    function handleAddToCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentitem = getCartItems.findIndex(item => item.productId === getCurrentProductId)
            if (indexOfCurrentitem > -1) {
                const getQuantity = getCartItems[indexOfCurrentitem].quantity
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item `,
                        variant: 'destructive'
                    })
                    return;
                }
            }
        }
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
            if (data.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: 'Product is add to a cart'
                })
            }
        })
    }


    function handleDialogClose() {
        setOpen(false)
        dispatch(setProductDetails())
        setRating(0)
        setReviewMsg("")
    }

    useEffect(() => {
        if (productDetails !== null) {
            dispatch(getReviews(productDetails?._id))
        }
    }, [productDetails, dispatch])



    const averageReview = reviews.length > 0 
  ? reviews.reduce((sum, reviewItem) => (sum + reviewItem.reviewValue), 0) / reviews.length 
  : 0;

 

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        className="aspect-square w-full object-cover" />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">
                            {productDetails?.title}
                        </h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">
                            {productDetails?.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`${productDetails?.salePrice > 0 ? 'line-through' : ''} text-3xl font-bold text-primary`}>${productDetails?.price}</p>
                        {
                            productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p> : null
                        }
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <RatingComponent rating={averageReview}/>
                        </div>
                        <span className="text-muted-foreground">
                            {averageReview.toFixed(1)}
                        </span>
                    </div>
                    <div className="mt-5 mb-5">
                        {
                            productDetails?.totalStock === 0 ?
                                <Button className="w-full opacity-60 cursor-not-allowed">Out of stock</Button> :
                                <Button onClick={() => {
                                    handleAddToCart(productDetails?._id, productDetails?.totalStock)
                                }} className="w-full">Add to Cart</Button>
                        }
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6 overflow-auto">
                            {
                                reviews && reviews.length > 0 ?
                                    reviews.map((reviewItem) => <div key={reviewItem?._id} className="flex gap-4">
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarFallback >
                                                {reviewItem?.userName[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold">
                                                    {reviewItem?.userName}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-0.5">
                                                <RatingComponent rating={reviewItem?.reviewValue} />
                                            </div>
                                            <p className="text-muted-foreground">
                                                {reviewItem?.reviewMessage}
                                            </p>
                                        </div>
                                    </div>) :
                                    <h1>
                                        No Reviews
                                    </h1>
                            }
                        </div>
                        <div className="mt-6 flex gap-2 flex-col">
                            <Label>Write a review</Label>
                            <div className="flex gap-1">
                                <RatingComponent rating={rating} handleRatingChange={handleRatingChange} />
                            </div>
                            <Input name="reviewMsg" value={reviewMsg} onChange={(event) => {
                                setReviewMsg(event.target.value)
                            }} placeholder="Write a review..." />
                            <Button
                                onClick={() => {
                                    handleAddReview()
                                }}
                                disabled={reviewMsg.trim() === ""}
                            >Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;