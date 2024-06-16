import axios from "axios";
import {baseUrl} from "../../../config/baseUrl";

export const addItemtoCart = async(body, jwt) =>{
  try {
    const resp = await axios.post(baseUrl + 'api/cart/add', body, {
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