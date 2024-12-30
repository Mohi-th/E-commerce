import { useEffect, useState } from "react";
import Commonform from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./Address-card";


const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: '',
}

function Address({setCurrentSelectedAddress,selectedId}) {

    const [formData, setFormData] = useState(initialAddressFormData)

    const [currentEditedId, setCurrentEditedId] = useState(null)

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { addressList } = useSelector((state) => state.shopAddress)

    const { toast } = useToast()

    function handleManageAddress(event) {
        event.preventDefault()

        if(addressList?.length>=3&&currentEditedId===null){
            toast({
                title:"You can only add three Addresses",
                variant:"destructive"
            });
            setFormData(initialAddressFormData)
            setCurrentEditedId(null)
            return;
        }

        currentEditedId!==null?dispatch(editAddress({
            userId:user?.id,
            addressId:currentEditedId,
            formData
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initialAddressFormData)
                toast({
                    title:"Address Edited Successfully"
                })
            }
        }):
        dispatch(addNewAddress({ ...formData, userId: user?.id }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    setFormData(initialAddressFormData)
                    toast({
                        title: "Address added Successfully"
                    })
                }
            })

            setCurrentEditedId(null)
    }

    function handleDeleteAddressInfo(getCurrentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id }))
            .then((data) => {
                if (data.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    toast({
                        title: "Address deleted successfully"
                    })
                }
            })
    }

    function handleEditAddressInfo(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,

        })
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch, user?.id])

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {
                    addressList && addressList.length > 0 ?
                        addressList.map(addressItem => 
                        <AddressCard
                            key={addressItem._id}
                            addressInfo={addressItem}
                            handleDeleteAddressInfo={handleDeleteAddressInfo}
                            handleEditAddressInfo={handleEditAddressInfo}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                            selectedId={selectedId}
                        />) :
                        null
                }
            </div>
            <CardHeader>
                <CardTitle>{
                    currentEditedId !== null ? "Edit Address" : "Add New Address"
                }</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Commonform
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttomText={currentEditedId !== null ? "Edit" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
}

export default Address;