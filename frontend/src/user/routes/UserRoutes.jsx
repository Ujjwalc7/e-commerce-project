import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import Collection from "../pages/collection/Collection"
import ProductDetails from "../pages/product details/ProductDetails"
import Checkout from "../pages/checkout/Checkout"
import AuthLayout from "../components/AuthLayout"
import Order from "../pages/order/Order"
import OrderDetails from "../pages/order/OrderDetails"
import PaymentSuccess from "../components/payment success/PaymentSuccess"

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/collection/:category" element={<Collection/>}/>
        <Route path="/product/details/id/:id" element={<ProductDetails/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/order/details/id" element={<OrderDetails/>}/>
        <Route path="/checkout/step/:step" element={<AuthLayout authentication={true}><Checkout/></AuthLayout>}/>
        <Route path="/payment/success" element={<PaymentSuccess/>}/>
    </Routes>
  )
}
export default UserRoutes