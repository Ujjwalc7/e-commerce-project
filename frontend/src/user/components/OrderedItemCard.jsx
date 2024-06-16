import { Grid } from "@mui/material"
import AdjustIcon from '@mui/icons-material/Adjust';


const OrderedItemCard = () => {
  return (
    <div className="p-5 shadow-sm">
        <Grid container spacing={2} sx={{justifyContent: 'space-between border'}}>
            <Grid item xs={6}>
                <div className=" flex cursor-pointer">
                    <img className="w-[5rem] h-[5rem] object-cover object-top" src="https://m.media-amazon.com/images/I/71sYkdV+D7L._SY741_.jpg" alt="" />
                    <div className="ml-5 space-y-2">
                        <p>haku mam tata</p>
                        <p>Size: M</p>
                        <p>Color: Violet</p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={2}>
                <p>Rs. 7895</p>
            </Grid>
            <Grid item xs={4}>
                {true && 
                <div>
                <p>
                    <AdjustIcon sx={{width: '15px', height: '15px'}} className="text-green-600 mr-2 text-sm"/>
                    <span>
                        Delivery on March 03
                    </span>
                </p>
                <p className="text-xs">Your item has been delivered</p>
                </div>
                }
                {false && <p>
                    <span>
                        Expected delivery on March 03
                    </span>
                </p>}
            </Grid>
        </Grid>
    </div>
  )
}
export default OrderedItemCard