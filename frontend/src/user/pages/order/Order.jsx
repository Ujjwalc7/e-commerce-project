import { Grid } from "@mui/material";
import OrderedItemCard from "../../components/OrderedItemCard";

const orderStatus = [
  {label: "on the way", value: "on_the_way"},
  {label: "Delivered", value: "delivered"},
  {label: "Cancelled", value: "cancelled"},
  {label: "Returned", value: "returned"},
];

const Order = () => {
  return (
    <div className="">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} md={2.5}>
          <div className="h-auto shadow-md bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-2">
              <h1 className="font-semibold">Order status</h1>
              {orderStatus.map(option=>(
                <div className="flex items-center" key={option.value}>
                <input type="checkbox" defaultValue={Option.value} className="h-4 w-4 border text-indigo-600 focus:ring-indigo-500" />
                <label className="ml-3 text-sm text-gray-600" htmlFor={option.value}>
                    {option.label}
                </label>
              </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={9}>
            {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,].map(ie=>(
            <OrderedItemCard/>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};
export default Order;
