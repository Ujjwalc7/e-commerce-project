import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import Collection from "../pages/collection/Collection"
import ProductDetails from "../pages/product details/ProductDetails"

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/collection/:category" element={<Collection/>}/>
        <Route path="/product/details/id/:id" element={<ProductDetails/>}/>
    </Routes>
  )
}
export default UserRoutes