import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";


export const createPayment = async(orderId, jwt) =>{
    try {
        const resp = await axios.post(baseUrl + "api/payments/" + orderId, {}, {
            headers: {
                Authorization: "Bearer " + jwt
            }
        });
        if(resp.data.payment_link_url){
            window.location.href = resp.data.payment_link_url;
        }
    } catch (error) {
        console.log(error);
    }
} 