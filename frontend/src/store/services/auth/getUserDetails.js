import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";

const getUserDetails = async(jwt)=>{
    try {
        const resp = await axios.get(baseUrl + 'api/users/profile', {
            headers:{
                Authorization: 'Bearer ' + jwt
            }
        });
        // console.log(resp.data);
        return resp.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default getUserDetails;