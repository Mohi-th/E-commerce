import { useEffect, useState } from "react";
import ProductImageUpload from "./image_upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImage } from "@/store/common slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";


function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false)

  const { featureImageList } = useSelector((state) => state.commonFeature)

  const dispatch = useDispatch()

  const { toast } = useToast()

  function handleImageUplaodFeature() {
    dispatch(addFeatureImage({ image: uploadedImageUrl })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImage())
        toast({
          title: 'Image Uploaded Successfully'
        })
        setUploadImageUrl("");
        setImageFile(null)
      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImage())
  }, [dispatch])


  return (
    <div>
      <ProductImageUpload
        // isEditMode={currentEditedId !== null}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        imageFile={imageFile}
        setImageFile={setImageFile}
        setUploadImageUrl={setUploadImageUrl}
        isCustomStyling={true} />
      <Button onClick={() => {
        handleImageUplaodFeature()
      }} className="w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {
          featureImageList && featureImageList.length > 0 ? featureImageList.map((imageItem) => 
            <div key={imageItem?._id}>
              <img className="w-full h-[300px] object-cover rounded-t-lg" src={ imageItem.image}  />
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default AdminDashboard
