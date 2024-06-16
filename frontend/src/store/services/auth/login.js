import axios from "axios";
import { baseUrl } from "../../../config/baseUrl";

const login = async(body)=>{
    try {
        const resp = await axios.post(baseUrl + 'auth/login', body);
        localStorage.setItem('jwt', resp.data.token);
        // console.log(resp.data);
        return resp.data.token;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default login;