import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ResponsiveButton from "./responsiveButton";
import { useAppDispatch } from "../store/store";
import { setEmployee, setEditOff } from "../store/slices/employeeSlice";
import { useEffect, useState } from "react";
import SignOutButton from "./signOutButton";
import LoginButton from "./loginButton";
import RegisterButton from "./registerButton"
import { verifyToken } from "../store/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ResponsiveAppBar() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [auth, setAuth] = useState(false);

  const verifyJwt = async () => {
    const response = await dispatch(verifyToken());
    const auth = unwrapResult(response).auth;
    setAuth(auth);
  }
  
  useEffect(() => {
    verifyJwt();
  }, [verifyJwt()])
  

  const homePageReturn = () => {
    if (auth){
      dispatch(setEditOff());
      dispatch(setEmployee({}));
      navigate("/employee", { replace: true });
    }
  };

  return (
    <Box>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: "30px",
              textDecoration: "none",
              color: "white",
            }}
            onClick={homePageReturn}
          >
            {" "}
            Employees{" "}
          </Typography>
          <Box>
            {auth ? <ResponsiveButton /> : <LoginButton/>}
            {auth ? <SignOutButton setAuth={setAuth} /> : <RegisterButton/>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
