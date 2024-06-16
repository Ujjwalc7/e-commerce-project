import axios from "axios";
import {baseUrl} from "../../../config/baseUrl";

export const getOrderById = async(orderId, jwt) =>{
  try {
    const resp = await axios.get(baseUrl + 'api/orders/'+orderId, {
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