import { BabyIcon, Barcode, Brain, ChevronsLeftIcon, ChevronsRightIcon, CloudLightning, Construction, HardHat, Shirt, ShirtIcon, UmbrellaIcon, WalletCards, WatchIcon } from 'lucide-react'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerthree from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import ShoppingProductTile from '@/components/shopping-view/Product-tile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import ProductDetailsDialog from '@/components/shopping-view/product-details'
import { getFeatureImage } from '@/store/common slice'

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
]

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: HardHat },
  { id: "puma", label: "Puma", icon: WalletCards },
  { id: "levi", label: "Levi's", icon: Brain },
  { id: "zara", label: "Zara", icon: Barcode },
  { id: "h&m", label: "H&M", icon: Construction },
]

// function handleNavigatingToListingPage(getCurrentItem, section) {
//   sessionStorage.removeItem('filters')
//   const currentFilter = {
//     [section]: [getCurrentItem]
//   }
// }

function ShoppingHome() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  const { productList,productDetails } = useSelector((state) => state.shopProducts)

  const { user } = useSelector((state) => state.auth)
  const { featureImageList } = useSelector((state) => state.commonFeature)

  

  const { toast } = useToast()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleNavigatingToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters')
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title: 'Product is add to a cart'
        })
      }
    })
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1 ) % featureImageList.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featureImageList])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filtersParams: {}, sortParams: 'price-lowtohigh' }))
  }, [])

  useEffect(() => {
    if (productDetails !== null)
      setOpenDetailsDialog(true)
  }, [productDetails])

  useEffect(() => {
      dispatch(getFeatureImage())
    }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          featureImageList&&featureImageList.length>0?featureImageList.map((imageItem, index) => <img
            src={imageItem?.image}
            key={index}
            className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-1000`}
          />):null
        }
        <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)} variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 hover:bg-black/5">
          <ChevronsLeftIcon className='w-4 h-4' />
        </Button>
        <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1 ) % featureImageList.length)} variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:bg-black/5">
          <ChevronsRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            shop by category
          </h2>
          <div className='grid grid-cols-2 mb:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categoriesWithIcon.map(categoryItem =>
                <Card onClick={() => { handleNavigatingToListingPage(categoryItem, 'category') }} key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold'>{categoryItem.label}</span>
                  </CardContent>
                </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            shop by Brand
          </h2>
          <div className='grid grid-cols-2 mb:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brandsWithIcon.map(brandItem =>
                <Card onClick={() => { handleNavigatingToListingPage(brandItem, 'brand') }} key={brandItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold'>{brandItem.label}</span>
                  </CardContent>
                </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-12'>
        <div className='container mx-auto px-4 r'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Feature Products
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0 ?
                productList.map(productItem => <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                  handleGetProductDetails={handleGetProductDetails}
                />)
                : null
            }
          </div>
        </div>
      </section>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingHome
