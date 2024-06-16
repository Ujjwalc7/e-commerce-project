import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";


export const updatePayment = async(reqData) =>{
    try {
        const resp = await axios.get(baseUrl + `api/payments/?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`, {
            headers: {
                Authorization: "Bearer " +  reqData.jwt 
            }
        });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
} 