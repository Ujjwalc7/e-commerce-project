import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrderThunk } from "../../store/slice/orderSlice";
import { deleteCartItemThunk } from "../../store/slice/cartSlice";

const AddressCard = ({ address }) => {
      const cartItems = useSelector(state=>state.cart.cartItems);
      const navigate= useNavigate();
      const dispatch = useDispatch();
      const jwt = localStorage.getItem('jwt');

      const cartItemIds = cartItems.map(item=> item._id)

    const handleForm=()=>{
        dispatch(createOrderThunk({body: address, jwt: jwt, navigate: navigate}));
        dispatch(deleteCartItemThunk({body: cartItemIds, jwt: jwt}));
      }

    return (
      <div
        className="rounded border p-3 relative mb-4 shadow-md "
      >
        <div>
          <p className=" text-sm lg:text-base text-wrap break-words">
            <span className="font-semibold text-base lg:text-lg">
              {address?.firstName} {address?.lastName}
            </span>
            <br />
            {address?.city}, {address?.address}, {address?.country},{" "}
            {address?.zipCode}, Contact Number-{address?.phone}
          </p>
        </div>
        <div className="mt-4">
            <button className="bg-black text-white px-2 py-1 " onClick={handleForm}>Deliver here</button>
        </div>
      </div>
    );
  };
  export default AddressCard;
  