import { useDispatch, useSelector } from "react-redux";
import AddressCard from "../DeliveryAddressCard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderThunk } from "../../../store/slice/orderSlice";
import { deleteCartItemThunk } from "../../../store/slice/cartSlice";

const CheckoutAddressForm = () => {
  const cartItems = useSelector(state=>state.cart.cartItems);
  const userAddress = useSelector((state) => state.auth.user.address);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    zipCode: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const cartItemIds = cartItems.map(item=> item._id);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(createOrderThunk({body: data, jwt: jwt, navigate: navigate}));
    if(cartItemIds.length > 0){
      dispatch(deleteCartItemThunk({body: cartItemIds, jwt: jwt}));
    }
  };
  return (
    <div className="flex gap-10 max-lg:flex-col">
      <ul className="flex flex-col">
        {userAddress?.map((address) => (
          <AddressCard address={address} key={address._id} />
        ))}
      </ul>
      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col bg-white gap-5">
          <div className="flex gap-3">
            <TextField
              id="outlined-basic"
              type="text" 
              label="First name"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              type="text"
              label="Last name"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              variant="outlined"
              required
            />
          </div>
          <div className="flex-1">
            <TextField
              className="w-full"
              id="outlined-basic"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              type="text"
              label="Address"
              variant="outlined"
            />
          </div>
          <div className="flex gap-3">
            <TextField
              id="outlined-basic"
              type="text"
              label="City"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              variant="outlined"
              required
            />
            <FormControl className="flex-1">
              <InputLabel id="select">Country</InputLabel>
              <Select
                labelId="select"
                id="select"
                label="Country"
                value={data.country}
                onChange={(e) => setData({ ...data, country: e.target.value })}
                className="flex-1"
              >
                <MenuItem value={"India"}>India</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex gap-3">
            <TextField
              id="outlined-basic"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              type="tel"
              label="Contact number"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              value={data.zipCode}
              onChange={(e) => setData({ ...data, zipCode: Number(e.target.value) })}
              type="number"
              label="Zip code"
              variant="outlined"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-lg px-4 active:opacity-70 py-4"
          >
            Deliver here
          </button>
        </form>
      </div>
    </div>
  );
};
export default CheckoutAddressForm;
