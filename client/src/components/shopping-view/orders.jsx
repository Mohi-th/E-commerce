import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";


function ShoppingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { orderList, orderDetails } = useSelector((state) => state.shopOrder)

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetails(getId))
    }

    useEffect(() => {
        dispatch(getAllOrdersByUserId(user?.id))
    }, [dispatch, user?.id])

    useEffect(() => {
        if (orderDetails !== null) {
            setOpenDetailsDialog(true)
        }
    }, [orderDetails])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Order history
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Detials</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ? orderList.map((orderItem) =>
                                <TableRow key={orderItem?._id}>
                                    <TableCell>{orderItem?._id}</TableCell>
                                    <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Badge className={`${orderItem?.orderStatus === 'confirmed' ? 'bg-green-700'
                                            : orderItem?.orderStatus === "rejected" ? 'bg-red-600'
                                                : 'bg-black'}`}>
                                            {orderItem?.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${orderItem?.totalAmount}</TableCell>
                                    <TableCell>
                                        <Dialog open={openDetailsDialog} onOpenChange={() => {
                                            setOpenDetailsDialog(false);
                                            dispatch(resetOrderDetails())
                                        }}>
                                            <Button onClick={() => {
                                                handleFetchOrderDetails(orderItem?._id)
                                            }}>View Detials</Button>
                                            <ShoppingOrderDetailsView orderDetails={orderDetails} />
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ) : null
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    );
}

export default ShoppingOrders;