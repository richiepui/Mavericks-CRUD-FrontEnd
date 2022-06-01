import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit"
import { postUser } from "../../userModel"
import axios from "axios"

const loginUrl = "http://localhost:8080/employee/login"
const registerUrl = "http://localhost:8080/employee/register"


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
    jwtToken: ''
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
    }
})

export default userSlice.reducer;