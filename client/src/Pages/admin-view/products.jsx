import { Fragment, useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetHeader } from "../../components/ui/sheet"
import Commonform from "@/components/common/form"
import { addProductFormElements } from "@/config"
import ProductImageUpload from "./image_upload"
import { addNewProducts, deleteProduct, editProduct, fetchAllproducts } from "@/store/admin/Products-slice"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import AdminProductTile from "@/components/admin-view/products-tile"


const initialFromData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFromData] = useState(initialFromData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null)

  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.adminProducts)
  const { toast } = useToast()

  function onSubmit(event) {

    event.preventDefault();

    currentEditedId !== null ? dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllproducts())
        setOpenCreateProductsDialog(false)
        setFromData(initialFromData)
        setCurrentEditedId(null)
        toast({
          title: "Product details have been edited successfully"
        })
      }
    }) : dispatch(addNewProducts({ ...formData, image: uploadedImageUrl })).then((data) => {
      console.log("data :", data)
      if (data?.payload?.success) {
        dispatch(fetchAllproducts())
        setFromData(initialFromData)
        setImageFile(null)
        setOpenCreateProductsDialog(false)
        toast({
          title: 'product added successfully'
        })
      }
    })
  }

  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId)
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchAllproducts())
      }
    })
  }

  function isFormvalid() {
    return Object.keys(formData)
      .map(key => formData[key] !== '')
      .every(item => item)
  }

  useEffect(() => {
    dispatch(fetchAllproducts())
  }, [dispatch])

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => {
          setOpenCreateProductsDialog(true)
        }}>
          Add new products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile key={productItem._id} handleDelete={handleDelete} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setFormData={setFromData} product={productItem} />) : null
        }
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
        setFromData(initialFromData)
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? "Edit Product" : "Add new Product"
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            isEditMode={currentEditedId !== null}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            imageFile={imageFile}
            setImageFile={setImageFile}
            setUploadImageUrl={setUploadImageUrl} 
            />
          <div className="py-6">
            <Commonform isBtnDisabled={!isFormvalid()} onSubmit={onSubmit} formControls={addProductFormElements} formData={formData} buttomText={currentEditedId !== null ? "Edit" : "Add"} setFormData={setFromData} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts
