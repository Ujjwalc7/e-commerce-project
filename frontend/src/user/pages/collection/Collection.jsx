import { useParams } from "react-router-dom";
import "./style.css";
import Cards from "../../components/product/Card";
import { useEffect, useState } from "react";
import TuneTwoToneIcon from "@mui/icons-material/TuneTwoTone";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import SideBard from "../../components/sidebar/SideBard";
import Dropdown from "../../components/DropDown";
import { shirtFilter, bottomstFilter } from "../../../store/services/filter";
import {
  getAllProductsThunk,
} from "../../../store/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '@mui/material/Pagination';
import FilterSidebar from "../../components/FilterSidebar";

const Collections = () => {
  const { category } = useParams();
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const products = useSelector((state) => state.product.products);
  const color = queryParams.get("color");
  const sizes = queryParams.get("sizes");
  const priceRange = queryParams.get("price");
  const sort = queryParams.get("sort");
  const length = queryParams.get("length");
  const pageNumber = queryParams.get("page") || 1;
  const reqQuery = {
    category: category || "",
    color: color || "",
    sizes: sizes || "",
    length: length || "",
    priceRange: priceRange || "",
    sort: sort || "",
    pageNumber: pageNumber || 1,
    limit: 10
  };
  
  const jwt = localStorage.getItem("jwt");
  const toggleSidebar = () => {
    setSidebar(!sidebar);
    document.body.style.overflow = sidebar ? "auto" : "hidden";
  };

  const handlePagination = (event, value) => {
    queryParams.set("page", value);
    const query = queryParams.toString();
    navigate({search:`?${query}`})
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // send get product request with all queryParams ex: products?price=999&size=M
    dispatch(getAllProductsThunk(reqQuery));
  }, [category, color, sizes, priceRange, sort, pageNumber, length]);
  return (
    <main className='max-md:text-sm'>
      <section className="content flex max-md:flex-col gap-14">
        <div
          className="md:hidden border flex w-[123px] justify-center py-2
         cursor-pointer"
          onClick={toggleSidebar}
        >
          <p className="m-0 pr-3">Filter by</p>
          <TuneTwoToneIcon />
        </div>
        <FilterSidebar
          sidebar={sidebar}
          params={category}
          toggleSidebar={toggleSidebar}
        />
        <div className="left-div overflow-hidden flex md:block max-md:hidden">
          <ul className="flex flex-col w-[230px] bg-white h-[100vh] overflow-y-scroll">
            {category === "bottoms" || category === "shorts" ? (bottomstFilter.map((item) => (
              <Dropdown key={item.id} item={item} params={category} />
            ))):(shirtFilter.map((item) => (
              <Dropdown key={item.id} item={item} params={category} />
            )))}
          </ul>
        </div>
        <div
          className={`right-div w-full h-[100vh] overflow-y-scroll
        grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-3 max-[450px]:grid-cols-2
        gap-4`}
        >
          {products?.products.length > 0 ? (
            products?.products.map((product) => (
              <Link
                key={product._id}
                className=" no-underline"
                to={"/product/details/id/" + product._id}
              >
                <Cards product={product} />
              </Link>
            ))
          ) : (
            <div>No Product Found!</div>
          )}
        </div>
      </section>
      <section className="pagination w-full">
        <div className="px-4 pb-5 flex justify-center w-full">
        <Pagination count={products?.totalPages} variant="outlined" onChange={handlePagination}color="primary"/>
        </div>
      </section>
    </main>
  );
};
export default Collections;
