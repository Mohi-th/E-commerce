import { Outlet } from "react-router-dom"
import ShoppingHeader from "./Header"

function ShoppingLayout() {
    return(
        <div className="flex flex-col overflow-hidden">
            <ShoppingHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>
        </div>
    )
}

export default ShoppingLayout