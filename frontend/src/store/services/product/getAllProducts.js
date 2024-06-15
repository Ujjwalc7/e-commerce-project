import axios from "axios";
import {baseUrl} from "../../../config/baseUrl";

export const getAllProducts = async(reqQuery) =>{
  const { category, color, sizes, priceRange, sort, pageNumber, length, limit } =
  reqQuery;
  const query = `?category=${category}&color=${color}&sizes=${sizes}&length=${length}&priceRange=${priceRange}&sort=${sort}&pageNumber=${pageNumber}&limit=${limit}`;
  try {
    const resp = await axios.get(baseUrl + 'api/products' + query);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
}