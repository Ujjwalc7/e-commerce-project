// import { products } from "./products"
import './style.css'
const Carousel = ({products}) => {
  return (
    <>
        {products?.products?.map((item) => (
        <div className="carouselItem" key={item._id}>
                <img loading="lazy" src={item.imageUrl[0]} alt="product image"/>
                <div className="product-details">
                    <p>{item.title}</p>
                    <p>Rs.<span className='line-through'>{item.price}</span> {item.discountedPrice}</p>
                </div>
            </div>))}
    </>
  )
}
export default Carousel