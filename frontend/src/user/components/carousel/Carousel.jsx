// import { products } from "./products"
import { useNavigate } from 'react-router-dom'
import './style.css'
const Carousel = ({products}) => {
  const navigate= useNavigate();
  return (
    <>
        {products?.products?.map((item) => (
        <div className="carouselItem cursor-pointer" key={item._id} onClick={()=>navigate(`/product/details/id/${item._id}`)}>
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