
import HistoryAdmin from "../components/Admin/HistoryAdmin";
import HomeAdmin from "../components/Admin/HomeAdmin";
import OrderAdmin from "../components/Admin/OrderAdmin";
import ProductsAdmin from "../components/Admin/ProductsAdmin";
import UsersAdmin from "../components/Admin/UsersAdmin";
import CustomerAdmin from "../components/Admin/CustomerAdmin";
import Login from "../components/Auth/Login";
const adminRoutes = [
  {
    path: "/admin",
    component: HomeAdmin,
  },
  {
    path: "/users",
    component: UsersAdmin,
  },
  {
    path: "/products",
    component: ProductsAdmin,
  },
  {
    path: "/history",
    component: HistoryAdmin,
  },
  {
    path: "/orders",
    component: OrderAdmin,
  },
  {
    path: "/customers",
    component: CustomerAdmin,
  },
  {
    path: "/login",
    component: Login,
  }
];

export default adminRoutes;