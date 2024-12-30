import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ 
    addressInfo,
    handleEditAddressInfo,
    handleDeleteAddressInfo,
    setCurrentSelectedAddress ,
    selectedId
}) {

    console.log(selectedId,"selectedid")
    return (
        <Card onClick={()=>{
            setCurrentSelectedAddress?setCurrentSelectedAddress(addressInfo):null
        }} className={`p-4 cursor-pointer ${selectedId?._id===addressInfo?._id?'border-black':null}`}>
            <CardContent className={`grid gap-4 ${selectedId===addressInfo?._id?'border-black':null}`}>
                <Label>Address : {addressInfo?.address}</Label>
                <Label>City : {addressInfo?.city}</Label>
                <Label>Pincode : {addressInfo?.pincode}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>Notes : {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="p-3 w-full flex justify-between">
                <Button onClick={() => { handleEditAddressInfo(addressInfo) }}>Edit</Button>
                <Button onClick={() => { handleDeleteAddressInfo(addressInfo) }}>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default AddressCard;