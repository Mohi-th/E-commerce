
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";



function CheckAuth({ isAuthenticated, user, children }) {
    
    const location = useLocation()
    const navigate = useNavigate()
    

    useEffect(() => {

        if(location.pathname==="/"){
            if(!isAuthenticated){
                navigate('/auth/login')
            }else{
                if (user?.role === 'admin') {
                    console.log('this is second statement')
                    navigate('/admin/dashboard')
                }
                else {
                    console.log('this is second statement for user')
                    navigate('/shop/home')
                }
            }
        }

        if (!isAuthenticated && !(location.pathname.includes('register') || location.pathname.includes('login'))) {
            console.log('first 1st statement')
            navigate("/auth/login")
        }

        if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
            if (user?.role === 'admin') {
                console.log('this is second statement')
                navigate('/admin/dashboard')
            }
            else {
                console.log('this is second statement for user')
                navigate('/shop/home')
            }
        }

        if (isAuthenticated && user?.role !== 'admin' && (location.pathname.includes('admin'))) {
            console.log('this is third statement')
            navigate('/unauth-page')
        }

        if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
            console.log('this is 4th statement')
            navigate('/admin/dashboard')
        }
    }, [ isAuthenticated, user,navigate,location.pathname]);

    return children;
}

export default CheckAuth;