import { useSelector } from "react-redux"
import AddressCard from "../AddressCard"
import OrderItemCard from "../OrderItemCard";
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
const OrderSummary = () => {
    const address = useSelector(state=>state.auth.user.address);
  return (
    <div className="flex-1 px-3">
        <div className="">
        {address?.map(item => (
            <AddressCard address={item}/>
        ))
        }
        </div>
            
        <div className="flex">
            <ul className="w-[50%] flex flex-col border-r">
            <OrderItemCard item={objk}/>
            <OrderItemCard item={objk}/>
            <OrderItemCard item={objk}/>
            </ul>
            <div className="flex-1 flex justify-center border-t">
                <div className="w-[300px] p-4 mt-2 border h-[250px] shadow-md">
                    <h2 className="text-lg">Price Details</h2>
                    <div className="pt-2 space-y-2">
                        <div className="flex justify-between">
                            <p>Price {'(3items)'}</p>
                            <p>Rs. 769</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount</p>
                            <p>Rs. -769</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Delivery Charges</p>
                            <p>Free</p>
                        </div>
                    </div>
                    <div className="pt-2 space-y-3">
                        <div className="flex justify-between">
                            <p>TOTAL AMOUNT</p>
                            <p>Rs. 876</p>
                        </div>
                        <div>
                            <button className="bg-black w-full text-white rounded-lg active:opacity-70 py-2">PAYMENT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default OrderSummary