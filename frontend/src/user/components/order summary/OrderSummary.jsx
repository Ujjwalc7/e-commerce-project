import { useDispatch, useSelector } from "react-redux"
import AddressCard from "../AddressCard"
import OrderItemCard from "../OrderItemCard";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrderByIdThunk } from "../../../store/slice/orderSlice";
import { createPaymentThunk } from "../../../store/slice/paymentSlice";

const OrderSummary = () => {
    const order = useSelector(state=>state.order.order);
    const orderItems = useSelector(state=>state.order.orderItems);
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const orderId = query.get('order_id');
    const jwt = localStorage.getItem('jwt');

    const handlePayment =() =>{
        dispatch(createPaymentThunk({orderId: orderId, jwt: jwt}));
    }

    useEffect(()=>{
        dispatch(getOrderByIdThunk({orderId: orderId, jwt: jwt}));
    },[orderId])
  return (
    <div className="flex-1 px-3">
        <div className="">
        {order?.shippingAddress && <AddressCard address={order.shippingAddress}/>}
        </div>
            
        <div className="flex">
            <ul className="w-[50%] flex flex-col">
                {orderItems && orderItems.map(order=>(
                    <OrderItemCard item={order} key={order._id}/>
                ))}
            </ul>
            <div className="flex-1 flex justify-center border-t">
                <div className="w-[300px] p-4 mt-2 border h-[250px] shadow-md">
                    <h2 className="text-lg">Price Details</h2>
                    <div className="pt-2 space-y-2">
                        <div className="flex justify-between">
                            <p>Price {order?.totalItem}items</p>
                            <p>Rs.{order?.totalPrice}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount</p>
                            <p>Rs.{order?.discount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Delivery Charges</p>
                            <p>Free</p>
                        </div>
                    </div>
                    <div className="pt-2 space-y-3">
                        <div className="flex justify-between">
                            <p>TOTAL AMOUNT</p>
                            <p>Rs.{order?.totalDiscountedPrice}</p>
                        </div>
                        <div>
                            <button className="bg-black w-full text-white rounded-lg active:opacity-70 py-2" 
                            onClick={handlePayment}>PAYMENT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default OrderSummary