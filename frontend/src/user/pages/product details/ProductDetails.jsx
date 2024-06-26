/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Grid, Rating, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ReviewCard from "../../components/rating review/ReviewCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIdThunk } from "../../../store/slice/productSlice";
import { addItemToCartThunk } from "../../../store/slice/cartSlice";

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "$192",
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Men", href: "#" },
//     { id: 2, name: "Clothing", href: "#" },
//   ],
//   images: [
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//       alt: "Model wearing plain black basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//       alt: "Model wearing plain gray basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//       alt: "Model wearing plain white basic tee.",
//     },
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "XXS", inStock: false },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton",
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const product = useSelector(state=>state.product.product);
  const [data, setData] = useState({ size: "", quantity: 1 });
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [selectedSize, setSelectedSize] = useState(product?.sizes);
  const {id} = useParams();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const submit = (e) => {
    e.preventDefault();
    if(data.size === '') return;
    const body = {...data, productId: id};
    dispatch(addItemToCartThunk({body, jwt}))
  };

  useState(()=>{
    window.scrollTo(0, 0);
  },[id])

  useEffect(()=>{
    dispatch(getProductByIdThunk(id));
  },[id])

  return product && (
    <div className="bg-white">
      <div className="pt-6">

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={product.imageUrl[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex space-x-2 justify-center mt-2">
              {product?.imageUrl > 1 && product?.imageUrl.map((image, index) => (
                <div
                  className="w-[80px] h-[80px] rounded-lg overflow-hidden"
                  key={index}
                >
                  <img
                    src={image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:px-10">
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="text-[30px]">{product?.title}</h2>
              <h2 className="text-[20px]">{product?.description}</h2>
              <p className="text-3xl tracking-tight text-gray-900 mt-2">
                Rs.<span className="line-through">{product?.price}</span> <span>{product?.discountedPrice}</span>
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex gap-2 items-center">
                  <Rating name="disabled" value={product?.ratings.length} readOnly />
                  <Typography component="legend">Ratings</Typography>
                </div>
              </div>

              <form className="mt-10 bg-white" onSubmit={submit}>
                {/* Colors */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className={`w-[30px] h-[30px] border rounded-full`} style={{backgroundColor: `${product?.color}`}}>
                  </div>
                  <p>{product?.color}</p>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid gap-4 grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size.name}
                          className={({ focus }) =>
                            classNames(
                              "cursor-pointer bg-white text-gray-900 shadow-sm",
                              focus ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none flex-1 py-3"
                            )
                          }
                          onClick={() => setData({ ...data, size: size.name })}
                        >
                          {({ checked, focus }) => (
                            <>
                              <span>{size.name}</span>
                              <span
                                className={classNames(
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  focus ? "border" : "border-2",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* quantity */}
                <h1 className="mt-10">Quantity</h1>
                <div className="w-full flex justify-center mt-3 items-center">
                  <button
                    className="cursor-pointer px-2"
                    type="button"
                    onClick={() => {
                      if (data.quantity > 1)
                        setData({ ...data, quantity: data.quantity - 1 });
                    }}
                  >
                    <RemoveIcon />
                  </button>
                  <input
                    className="text-center py-2 w-[50px] border rounded-lg outline-none"
                    type="number"
                    value={data.quantity}
                    readOnly
                  />
                  <button
                    className="cursor-pointer px-2"
                    type="button"
                    onClick={() => {
                      setData({ ...data, quantity: data.quantity + 1 });
                    }}
                  >
                    <AddIcon />
                  </button>
                </div>
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-300 px-8 py-3 text-base font-medium text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2"
                >
                 {data.size === "" ? "Select a size" : "Add to cart"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* rating and reviews */}
        <section className="mt-32">
          <h1 className="sm:text-2xl pl-3 text-lg pb-4">
            Recent review and ratings
          </h1>
          <div className="border py-3">
            <ReviewCard />
            <ReviewCard />
          </div>
        </section>
      </div>
    </div>
  );
}
