
const AddressCard = ({ address }) => {

    return (
      <div
        className="rounded border p-3 relative mb-4 shadow-md max-w-[500px] w-full"
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
      </div>
    );
  };
  export default AddressCard;
  