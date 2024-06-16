import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderThunk } from "../../store/slice/orderSlice";
import { useNavigate } from "react-router-dom";
import { removeCartItemThunk } from "../../store/slice/cartSlice";

const DeliveryForm = ({formData, closeEdit, closeForm}) => {
    const [data, setData] = useState({
      firstName: formData?.firstName || '',
      lastName: formData?.lastName || '',
      address: formData?.address || '',
      city: formData?.city || '',
      country: formData?.country || '',
      phone: formData?.phone || '',
      zipCode: formData?.zipCode || '',
    });
  const cartItems = useSelector(state=>state.cart.cartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');

    const cartItemIds = () => {
      const ids = cartItems.map(item=>item._id);
      return ids;
    }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('create order ',{formData:data, addressId: formData?._id || null, jwt:jwt});
    dispatch(removeCartItemThunk({cartItemIds: cartItemIds(), jwt: jwt}));
    dispatch(createOrderThunk({formData:data, addressId: formData?._id || null, jwt:jwt}));
    if(closeForm){
      closeForm();
    }else{
      closeEdit();
    }
    navigate("/checkout/step/2");
  };

  return (
    <form
      className="rounded-md shadow-md text-sm flex flex-col gap-4 items-center relative"
      onSubmit={handleSubmit}
    >
      <div className="absolute top-1 right-1 cursor-pointer" onClick={closeEdit ? closeEdit : closeForm}>
        <CloseIcon style={{width:'20px'}}/>
      </div>
      <div className="w-full grid grid-flow-row grid-cols-1 md:grid-cols-2 pt-6 pb-6">
        <div className="flex flex-col gap-2 mt-3 items-center">
          <label htmlFor="firstName" className="w-[70%]">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value})}
            className="w-[70%] rounded-md bg-gray-100 outline-none px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-3 items-center">
          <label htmlFor="lastName" className="w-[70%]">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            className="w-[70%] rounded-md bg-gray-100 outline-none px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-3 items-center">
          <label htmlFor="address" className="w-[70%]">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value})}
            className="w-[70%] rounded-md bg-gray-100 outline-none px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-3 items-center">
          <label htmlFor="zipCode" className="w-[70%]">
            Zip Code
          </label>
          <input
            type="number"
            id="zipCode"
            value={data.zipCode}
            onChange={(e) =>{
              if(e.target.value.length <= 6){
                const value = parseInt(e.target.value);
                 setData({ ...data, zipCode: value})
            }}}
            className="w-[70%] rounded-md bg-gray-100 outline-none px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-3 items-center">
          <label htmlFor="city" className="w-[70%]">
            City
          </label>
          <input
            type="text"
            id="city"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value})}
            className="w-[70%] rounded-md bg-gray-100 outline-none px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-3 items-center">
          <label htmlFor="country" className="w-[70%]">
            Country
          </label>
          <select
            id="country"
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value})}
            className="w-[70%] rounded-md bg-gray-100 outline-none px-3 py-2"
            required
          >
            <option value="">Select Country</option>
            <option value="India">India</option>

          </select>
        </div>
        <div className="flex flex-col gap-2 mt-3 items-center">
          <label htmlFor="phone" className="w-[70%]">
            Contact Number
          </label>
          <input
            type="tel"
            id="phone"
            maxLength={10}
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value})}
            className="w-[70%] rounded-md bg-gray-100 outline-none px-3 py-2"
            pattern="[0-9]{10}"
            required
          />
        </div>
      </div>
      <button type="submit" className="mb-3 w-44 py-2 bg-black text-white">
        Save
      </button>
    </form>
  )
}
export default DeliveryForm