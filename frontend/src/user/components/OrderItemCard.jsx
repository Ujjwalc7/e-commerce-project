const OrderItemCard = ({item}) => {
  return (
    <div
        className="flex items-start gap-3 border-y py-4 w-full text-sm lg:text-base"
      >
        <div
          className="max-w-[100px] w-full h-full max-h-[130px] cursor-pointer"
          onClick={() => navigate(`/details/id/${item?.product?._id}`)}
        >
          <img
            src={item?.product?.imageUrl?.[0]}
            alt="image"
            loading="lazy"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="m-0">{item?.product?.title}</p>
          <p className="m-0">Rs. <span className="line-through">{item.price}</span> {item?.discountedPrice}</p>
          <p className="m-0">
            Size: {item?.size}, {item?.product?.color}
          </p>
          <p className="m-0">
            Quantity: {item?.quantity}
          </p>
        </div>
      </div>
  )
}
export default OrderItemCard