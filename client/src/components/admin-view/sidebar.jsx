import { Fragment } from "react"
import { ChartNoAxesCombined } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard, ShoppingBasket, BadgeCheck } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: "products",
    label: "Products",
    path: '/admin/products',
    icon: <ShoppingBasket />
  },
  {
    id: "orders",
    label: "Orders",
    path: '/admin/orders',
    icon: <BadgeCheck />
  }
]

function MenuItems({setOpen}) {

  const navigate = useNavigate()

  return (
    <nav className="mt-8 flex-col gap-2">
      {
        adminSidebarMenuItems.map(menuItem => <div onClick={() => {
          navigate(menuItem.path);
          setOpen(false);
        }} className="flex text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground  cursor-pointer hover:bg-muted hover:text-foreground" key={menuItem.id}>
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>)
      }
    </nav>
  )
}


function AdminSidebar({ open, setOpen }) {

  const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="font-bold text-xl">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} /> 
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div onClick={() => {
          navigate("/admin/dashboard")
        }} className="flex items-center gap-2 cursor-pointer">
          <ChartNoAxesCombined size={30} />
          <h1 className="font-bold text-xl">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  )
}

export default AdminSidebar
