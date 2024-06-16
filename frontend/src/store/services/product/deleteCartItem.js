import axios from "axios";
import {baseUrl} from "../../../config/baseUrl";

export const deletCartItem = async(body, jwt) =>{
  try {
    const resp = await axios.put(baseUrl + 'api/cart_items/delete', body, {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
}