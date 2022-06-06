import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LockOutlined from '@material-ui/icons/LockOutlined'
import defaultUserFields from "../userModel";
import React, { useState } from "react";
import { useAppDispatch } from "../store/store";
import { registerUser } from "../store/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: '60vh',
    width: 500,
    margin: "80px auto"
  },
  avatarStyle:{backgroundColor:'#365271'},
  gridItemStyle:{
      padding:"20px"
  }
}));


export default function RegisterForm() {

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [registerDetails, setRegisterDetails] = useState(defaultUserFields);

const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const{name, value} = e.target;
    setRegisterDetails({
        ...registerDetails,
        [name]: value,
    });
}

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const{name,value} = e.target;
    setRegisterDetails({
        ...registerDetails,
        [name]:value,
    })
}

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
        username: registerDetails.username,
        password :registerDetails.password
    }
    const response = await dispatch(registerUser(user));
    const requestState = unwrapResult(response).requestState;
    const message = unwrapResult(response).message;
    if(requestState){
        toast.success(message, {position:"bottom-right"});
        navigate("/");
    }else{
        toast.error(message, {position: "bottom-right"});
    }
}
  return(
      <Container>
          <Paper elevation={10} className = {classes.paperStyle}>
              <form onSubmit={handleSubmit}>
              <Grid container alignItems="center" justifyContent="center" direction="column">
                <Grid item>
                    <Avatar className = {classes.avatarStyle}><LockOutlined/></Avatar>
                </Grid>
                <Grid item className = {classes.gridItemStyle}>
                    <Typography variant = 'h5'>
                        Register
                    </Typography>
                </Grid>
                <Grid item className = {classes.gridItemStyle}>
                    <TextField variant="outlined"
                    label="Username"
                    name="username"
                    value={registerDetails.username}
                    onChange={handleUserNameChange}/>
                </Grid>
                <Grid item className={classes.gridItemStyle}>
                    <TextField variant="outlined"
                    label="Password"
                    name="password"
                    value={registerDetails.password}
                    onChange={handlePasswordChange}/>
                </Grid>
                <Grid item className = {classes.gridItemStyle}>
                    <Button variant = "contained"
                    endIcon={<LoginIcon/>}
                    sx={{bgcolor: "#34933b"}}
                    disableElevation
                    type="submit">
                        Register
                    </Button>
                </Grid>
              </Grid>
              </form>
          </Paper>
      </Container>
  )
}