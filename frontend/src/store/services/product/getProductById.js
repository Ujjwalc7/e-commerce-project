import axios from "axios";
import {baseUrl} from "../../../config/baseUrl";

export const getProductById = async(id) =>{
  try {
    const resp = await axios.get(baseUrl + 'api/products/id/' + id);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
}