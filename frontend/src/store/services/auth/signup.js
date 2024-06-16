import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";

const signup = async(body)=>{
    try {
        const resp = await axios.post(baseUrl + 'auth/signup', body);
        localStorage.setItem('jwt', resp.data.token);
        console.log(resp.data);
        // return resp.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default signup;