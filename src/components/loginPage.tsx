import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LockOutlined from "@material-ui/icons/LockOutlined";
import defaultUserFields from "../userModel";
import React, { useState , useEffect} from "react";
import { useAppDispatch } from "../store/store";
import { verifyUser, verifyToken} from "../store/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: "60vh",
    width: 500,
    margin: "80px auto",
  },
  avatarStyle: { backgroundColor: "#365271" },
  gridItemStyle: {
    padding: "20px",
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verifyJwt = async () => {
    const response = await dispatch(verifyToken());
    const auth = unwrapResult(response).auth;
    auth? navigate("/employee") : navigate("/");
  }

  useEffect(() => {
    verifyJwt();
  }, [])
  

  const [loginDetails, setLoginDetails] = useState(defaultUserFields);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      username: loginDetails.username,
      password: loginDetails.password,
    };
    const response = await dispatch(verifyUser(user));
    const requestState = unwrapResult(response).requestState;
    const message = unwrapResult(response).message;
    if (requestState) {
      verifyJwt();
      toast.success(message, { position: "bottom-right" });
    } else {
      toast.error(message, { position: "bottom-right" });
    }
  };

  return (
    <Grid container>
      <CssBaseline />
      <Container>
        <Paper elevation={10} className={classes.paperStyle}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item>
                <Avatar className={classes.avatarStyle}>
                  <LockOutlined />
                </Avatar>
              </Grid>
              <Grid item className={classes.gridItemStyle}>
                <Typography variant="h5">Login</Typography>
              </Grid>
              <Grid item className={classes.gridItemStyle}>
                <TextField
                  variant="outlined"
                  label="Username"
                  name="username"
                  value={loginDetails.username}
                  onChange={handleUserNameChange}
                />
              </Grid>
              <Grid item className={classes.gridItemStyle}>
                <TextField
                  variant="outlined"
                  label="Password"
                  name="password"
                  value={loginDetails.password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item className={classes.gridItemStyle}>
                <Button
                  variant="contained"
                  endIcon={<LoginIcon />}
                  sx={{ bgcolor: "#34933b" }}
                  disableElevation
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grid>
  );
}
