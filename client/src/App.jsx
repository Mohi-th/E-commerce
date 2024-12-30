import './App.css'
import AuthLayout from './components/auth/layout'
import { Routes, Route } from 'react-router-dom'
import AuthLogin from './Pages/auth/login'
import AuthRegister from './Pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './Pages/admin-view/dashboard'
import AdminFeatures from './Pages/admin-view/features'
import AdminViewOrders from './Pages/admin-view/orders'
import AdminProducts from './Pages/admin-view/products'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './Pages/not-found'
import ShoppingHome from './Pages/shopping-view/Home'
import ShoppingListing from './Pages/shopping-view/Listing'
import ShoppingAccount from './Pages/shopping-view/account'
import ShoppingcheckOut from './Pages/shopping-view/checkOut'
import CheckAuth from './components/common/check-auth'
import Unauth from './components/unauth/unauth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'
import PaypalReturnPage from './Pages/shopping-view/paypal-return'
import PaymentSuccessPage from './Pages/shopping-view/Payment-success'
import SearchProducts from './Pages/shopping-view/Search'




function App() {

  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])





  if (isLoading) return (<Skeleton className="w-[800] bg-black h-[600px]" />)


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path="/auth/*" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path='/admin/*' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminViewOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path='/shop/*' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='*' element={<NotFound />} />
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingcheckOut />} />
          <Route path='paypal-return' element={<PaypalReturnPage />} />
          <Route path='payment-success' element={<PaymentSuccessPage />} />
          <Route path='search' element={<SearchProducts />} />
        </Route>

        <Route path='/unauth-page' element={<Unauth />} />
        <Route path='*'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}/>
          } />

      </Routes>
    </div>
  )
}

export default App
