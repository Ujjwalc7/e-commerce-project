import { useEffect, useRef } from "react";
import Banner from "../../../admin/components/banner/Banner";
import './style.css';
import Carousel from "../../components/carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../../store/slice/productSlice";

export const Home = () => {
  const products = useSelector(state=>state.product.products);
  const container = useRef();
  const dispatch = useDispatch();
  const scroll = (dir) => {
    const currentContainer =container.current;
    const scrollAmount = dir === 'left' ? currentContainer.scrollLeft - (currentContainer.offsetWidth) : 
    currentContainer.scrollLeft + (currentContainer.offsetWidth);
    currentContainer.scrollTo({
      left:scrollAmount,
      behavior:'smooth'
    })
  }

  const reqQuery = {
    category:"",
    color:"",
    sizes:"",
    length:"",
    priceRange:"",
    sort:"",
    pageNumber:1,
    limit: 10
  };

  useEffect(()=>{
    dispatch(getAllProductsThunk(reqQuery));
  },[])
  return (
    <>
      <section className="w-full text-lg">
        <Banner />
      </section>
      {/* carousel section */}
      <section className="content">
        <div className="flex justify-center">
        <span className="px-3 py-2 bg-black text-white rounded-full">New Drops</span>
        </div>
        <div id="featuredProducts" className="featuredProducts">
            <button className="leftBtn " id="slideLeft" onClick={()=>scroll('left')}>
                <img loading="lazy" src="https://cdn-icons-png.flaticon.com/512/860/860790.png" alt="left-arrow"/>
            </button>
            <div className="carouselInner" id="carouselInner" ref={container}>
                <Carousel products={products}/>
            </div>
            <button className="rightBtn" id="slideRight" onClick={()=>scroll('right')}>
              <img loading="lazy" src="https://www.svgrepo.com/download/27797/right-arrow.svg" alt="right-arrow"/>
          </button>
        </div>
      </section>
      <section className="">
        <div className="flex justify-center">
          <h1 className="text-[30px]">Trending Now👌</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 gap-8 max-md:px-5 max-lg:px-10 lg:px-5 max-w-[1470px] w-full m-auto h-[]">
          <div className="h-auto rounded-md overflow-hidden hover:scale-105 transition-all duration-500 relative">
            <div className="absolute bottom-5 left-5 w-[100px]">
              <h2 className="text-white text-2xl">
                  Shirts
              </h2>
            </div>
            <img className="w-full h-full object-cover object-center" src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*Lfp7xDuND10bgsTO_TaIvg.jpeg" loading="lazy" alt="images" />
          </div>
          <div className="h-auto rounded-md overflow-hidden hover:scale-105 transition-all duration-500 relative">
            <div className="absolute bottom-5 left-5 w-[100px]">
              <h2 className="text-white text-2xl">
                  Abstract
              </h2>
            </div>
            <img className="w-full h-full object-cover object-center" src="https://www.apetogentleman.com/wp-content/uploads/2019/08/summeroutfitsweb3.jpg" loading="lazy" alt="images" />
          </div>
          <div className="h-auto rounded-md overflow-hidden hover:scale-105 transition-all duration-500 relative">
            <div className="absolute bottom-5 left-5 w-[100px]">
              <h2 className="text-white text-2xl">
                  Florals
              </h2>
            </div>
            <img className="w-full h-full object-cover object-center" src="https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/a/t/g/xl-be-hs-redpatti-vedraj-trendz-original-imagghu6vfupvqg8.jpeg?q=90&crop=false" loading="lazy" alt="images" />
          </div>
          <div className="h-auto rounded-md overflow-hidden hover:scale-105 transition-all duration-500 relative">
            <div className="absolute bottom-5 left-5 w-[100px]">
              <h2 className="text-white text-2xl">
                  Shorts
              </h2>
            </div>
            <img className="w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1617953644310-e690da9be982?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading="lazy" alt="images" />
          </div>
        </div>

      </section>
    </>
  );
};
