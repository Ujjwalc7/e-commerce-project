import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";

const signup = async(body)=>{
    try {
        const resp = await axios.post(baseUrl + 'auth/signup', body);
        localStorage.setItem('jwt', resp.data.token);
        return resp.data.token;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default signup;