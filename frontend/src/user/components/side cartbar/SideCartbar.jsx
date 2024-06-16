import ItemCard from "../CartItemCard";
import CloseIcon from '@mui/icons-material/Close';
import './style.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const objk = {
  product:{
    _id: 'asjlbljbasf',
    imageUrl:['kasl'],
    title: 'jklau',
    color: 'black',
   
  },
  price: 10,
  discountedPrice: 10,
  size:1,
  quantity: 1,
}

const SideCartbar = ({handleCartbar, openCartbar}) => {
  const cart = useSelector(state=>state.cart.cart);
  return (
    <div className={`flex flex-col justify-between z-[200] px-2 py-3  border gap-5 h-[100vh] absolute top-0 bg-white border-r duration-500 transition-all ${openCartbar ? ' right-0' : ' -right-[500px]'}`}>
        <div className="absolute top-2 left-2 bg-white z-[200]" onClick={handleCartbar}>
        <CloseIcon/>
        </div>
        <div className="w-full h-[470px] overflow-y-scroll relative hideScrollBar flex-1 mt-10">
          <ItemCard item={objk}/>
          <ItemCard item={objk}/>
          <ItemCard item={objk}/>
          <ItemCard item={objk}/>
          <ItemCard item={objk}/>

        </div>
          <div className="w-full h-[175px] bg-white  pt-3 border-t bottom-0 left-0 px-2">
            <div className="flex justify-between">
              <p>SUBTOTAL</p>
              <p>Rs.{cart?.totalDiscountedPrice}</p>
            </div>
            <div className="flex flex-col gap-5 mt-3">
              <p className="text-center">Shipping, taxes, and discount codes calculated at checkout.</p>
              <Link to={'/checkout/step/0'} className="w-full bg-black text-white text-center py-2 active:opacity-70">
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        {/* <ItemCard/> */}
        {/* <div className="w-[300px] bg-black">asjkfnjkans</div> */}
    </div>
  )
}
export default SideCartbar