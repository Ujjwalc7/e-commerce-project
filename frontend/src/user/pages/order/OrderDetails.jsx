import { useSelector } from "react-redux";
import AddressCard from "../../components/AddressCard"
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {
    const add = useSelector(state=>state.auth.user);
  return (
    <div className="mt-6 px-2">
        <h1 className="font-semibold text-lg mb-4">Delivery adress</h1>
        <AddressCard address={add?.address[0]}/>
        <div className="py-20">
            <OrderTracker activeStep={3}/>
        </div>

        <Grid container className="px-2 space-y-2">
            {[1,1,1,1,1,1].map((item, index)=>(
            <Grid key={index} item container className="shadow-md rounded-md p-5 border" sx={{alignItems: 'center', justifyContent: 'space-between', gap: '10px'}}>
                <Grid item xs={12} sm={6}>
                    <div className="flex items-center space-x-4">
                        <img className="w-[5rem] h-[7rem] object-cover object-top" src="https://www.snitch.co.in/cdn/shop/files/4MSD3653-02-3255.jpg?v=1709532038&width=1800" alt="" />
                        <div className="space-y-2 ml-5">
                            <p className="font-medium text-lg">saub aslfkn val pant</p>
                            <p className="space-x-3"><span>Color: Pink</span> <span>Size: M</span></p>
                            <p>Rs. 876</p>
                        </div>
                    </div>
                      
                </Grid>
                <Grid item >
                    <Box sx={{color: deepPurple[500]}} className="cursor-pointer">
                        <StarBorderIcon sx={{fontSize: '2rem'}} className="px-2 text-5xl"/>
                        <span>Rate & review product</span>
                    </Box>
                </Grid>
            </Grid>
            ))}
        </Grid>
    </div>
  )
}
export default OrderDetails