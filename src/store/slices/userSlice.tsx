import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postUser } from "../../userModel";
import axios from "axios";

const loginUrl = "http://localhost:8080/user/login";
const registerUrl = "http://localhost:8080/user/register";
const jwtVerifyUrl = "http://localhost:8080/auth/";
const signoutUrl = "http://localhost:8080/user/logout"

const AXIOS = () => {
  axios.defaults.withCredentials = true;
  return axios;
};

export const verifyToken = createAsyncThunk("auth/verifyToken", async () => {
    try{
        const response = await AXIOS().get(jwtVerifyUrl);
        return response.data;
    } catch(err: any){
        return err.response.data;
    }
});

export const signOutUser = createAsyncThunk("user/signOut", async()=>{
    try{
        const response = await AXIOS().post(signoutUrl);
        return response.data;
    }catch(err: any){
        return err.response.data;
    }
})

export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (user: postUser) => {
    try {
      const response = await AXIOS().post(loginUrl, user);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: postUser) => {
    try {
      const response = await AXIOS().post(registerUrl, user);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  }
);

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
