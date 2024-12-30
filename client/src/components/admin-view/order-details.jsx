import { useState } from "react";
import Commonform from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/Orders-slice";
import { useToast } from "@/hooks/use-toast";



const initialFormData = {
    status: ''
}

function AdminOrderDetailsView({ orderDetails }) {

    const [formData, setFormData] = useState(initialFormData)
    const { status } = formData;

    const { user } = useSelector((state) => state.auth)

    const { toast } = useToast()

    const dispatch = useDispatch()

    function handleUpdateStatus(event) {
        event.preventDefault();
        dispatch(updateOrderStatus({ id: orderDetails._id, orderStatus: status })).then((data) => {
            if (data?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                dispatch(getAllOrdersForAdmin())
                setFormData(initialFormData)
                toast({
                    title:data?.payload?.message
                })
            }
        })
        console.log(formData, "form")
    }

    return (
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="mt-6 flex items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="font-medium">Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Badge className={`${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-700'
                            : orderDetails?.orderStatus === "rejected" ? 'bg-red-600'
                                : 'bg-black'}`}>
                            {orderDetails?.orderStatus}
                        </Badge>
                    </div>
                </div>
                <Separator />
                <div className="grid">
                    <div className="grid gap-2">
                        <div className="font-medium">
                            Order Details
                        </div>
                        <ul className="grid gap-3">
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? orderDetails?.cartItems.map((cartItem) =>
                                    <li key={cartItem?._id} className="flex items-center justify-between">
                                        <span>Title : {cartItem?.title}</span>
                                        <span>Quantity : {cartItem?.quantity}</span>
                                        <span>Price : ${cartItem?.price}</span>
                                    </li>
                                ) : null
                            }
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">
                            shipping Info
                        </div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.userName}</span>
                            <span> {orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Commonform
                        formControls={
                            [{
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                ],
                            }]
                        }
                        formData={formData}
                        setFormData={setFormData}
                        buttomText={'Update Order Status'}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    );
}

export default AdminOrderDetailsView;