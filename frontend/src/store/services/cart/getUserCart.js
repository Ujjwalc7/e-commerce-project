import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";

const getUserCart = async(jwt)=>{
    try {
        const resp = await axios.get(baseUrl + 'api/cart/', {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        });
        return resp.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default getUserCart;