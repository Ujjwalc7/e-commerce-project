import { useSelector } from "react-redux";
import AddressCard from "../../components/AddressCard"
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { StarIcon } from "@heroicons/react/16/solid";

const OrderDetails = () => {
    const add = useSelector(state=>state.auth.user);
  return (
    <div className="mt-6 px-2">
        <h1 className="font-semibold text-lg mb-4">Delivery adress</h1>
        <AddressCard address={add?.address[0]}/>
        <div className="py-20">
            <OrderTracker activeStep={3}/>
        </div>

        <Grid container className="space-x-5">
            <Grid item container className="shadow-md rounded-md p-5 border" sx={{alignItems: 'center', justifyContent: 'space-between'}}>
                <Grid item xs={6}>
                    <div className="space-y-2 ml-5">
                        <img className="w-[5rem] h-[5rem] object-cover object-top" src="https://www.snitch.co.in/cdn/shop/files/4MSD3653-02-3255.jpg?v=1709532038&width=1800" alt="" />
                        <div>
                            <p>saub aslfkn val pant</p>
                            <p className="space-x-3"><span>Color: Pink</span> <span>Size: M</span></p>
                            <p>Rs. 876</p>
                        </div>
                    </div>
                      
                </Grid>
                <Grid item>
                    <Box sx={{color: deepPurple[500]}}>
                        <StarIcon sx={{fontSize: '2rem'}} className="px-2 text-5xl"/>
                        <span>Rate & review product</span>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}
export default OrderDetails