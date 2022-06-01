import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit"
import { postUser } from "../../userModel"
import axios from "axios"

const loginUrl = "http://localhost:8080/employee/login"
const registerUrl = "http://localhost:8080/employee/register"
const jwtVerifyUrl = "http://localhost:8080/employee/verifyJwt"


export const verifyUser = createAsyncThunk(
    "user/verifyUser", async(user: postUser) => {
        try{
            const response = await axios.post(loginUrl,user);
            return response.data;
        }catch(err: any){
            return err.response.data;
        }
    }
)

export const verifyJwt = createAsyncThunk(
    "user/verifyJwt", async(token:string) => {
        try{
            const response = await axios.post(jwtVerifyUrl, {token:token});
            return response.data;
        }catch(err: any){
            return err.response.data;
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/registerUser", async(user: postUser)=>{
        try{
            const response = await axios.post(registerUrl, user);
            return response.data;
        }catch(err:any){
            return err.response.data;
        }
    }
)

const initialState =  {
    
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
    }
})

export default userSlice.reducer;