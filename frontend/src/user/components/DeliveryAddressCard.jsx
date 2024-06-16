import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressCard = ({ address }) => {

    const [data, setData] = useState({
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        city: address.city,
        country: address.country,
        phone: address.phone,
        zipCode: address.zipCode,
      });
      const navigate= useNavigate();

    const handleForm=(id)=>{
        console.log({data, addressId:id});
        navigate('/checkout/step/2');
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
            <button className="bg-black text-white px-2 py-1 " onClick={()=>handleForm(address._id)}>Deliver here</button>
        </div>
      </div>
    );
  };
  export default AddressCard;
  