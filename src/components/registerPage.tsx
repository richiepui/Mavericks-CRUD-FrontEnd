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

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: '60vh',
    width: 500,
    margin: "80px auto"
  },
  avatarStyle:{backgroundColor:'blue'},
  gridItemStyle:{
      padding:"20px"
  }
}));

export default function RegisterForm() {
  const classes = useStyles();
  return(
      <Container>
          <Paper elevation={10} className = {classes.paperStyle}>
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
                    name="username"/>
                </Grid>
                <Grid item className={classes.gridItemStyle}>
                    <TextField variant="outlined"
                    label="Password"
                    name="password"/>
                </Grid>
                <Grid item className = {classes.gridItemStyle}>
                    <Button variant = "contained"
                    endIcon={<LoginIcon/>}
                    sx={{bgcolor: "34933b"}}
                    disableElevation
                    type="submit">
                        Register
                    </Button>
                </Grid>
              </Grid>
          </Paper>
      </Container>
  )
}