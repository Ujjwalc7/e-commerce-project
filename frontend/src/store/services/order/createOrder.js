import axios from "axios";
import {baseUrl} from "../../../config/baseUrl";

export const createOrder = async(body, jwt) =>{
  console.log(body);
  try {
    const resp = await axios.post(baseUrl + 'api/orders/', body, {
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