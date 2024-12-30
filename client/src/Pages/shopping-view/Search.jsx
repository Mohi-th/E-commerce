import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/Product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";



function SearchProducts() {

    const [keyword, setKeyword] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const { searchResults } = useSelector((state) => state.shopSearch);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const { productDetails } = useSelector((state) => state.shopProducts);

    const dispatch = useDispatch();

    const { toast } = useToast();

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

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length >= 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000)
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    }, [keyword])

    useEffect(() => {
        if (productDetails !== null)
            setOpenDetailsDialog(true)
    }, [productDetails]);



    console.log(searchResults)

    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input
                        value={keyword}
                        name='keyword'
                        onChange={(event) => setKeyword(event.target.value)}
                        className="py-5"
                        placeholder='Search Products...'
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    searchResults && searchResults.length > 0 ? searchResults.map((searchItem) =>
                        <ShoppingProductTile
                            key={searchItem?._id}
                            product={searchItem}
                            handleAddToCart={handleAddToCart}
                            handleGetProductDetails={handleGetProductDetails}
                        />) :
                        <h1 className="text-5xl font-extrabold ">
                            No results found
                        </h1>
                }
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />

        </div>
    );
}

export default SearchProducts;