import {useTheme} from "@material-ui/core/styles";
import {useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

export default function LoginButton() {
  const navigate = useNavigate();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.only("xs"));

  const handleNavigate = () => {
    navigate("/",{replace:true})
  }

  return smallScreen ? (
    <IconButton size="large" sx={{color:"#ffffff"}}>
      <LoginIcon />
    </IconButton>
  ) : (
    <Button
      variant="contained"
      sx={{ bgcolor: "#34933b", marginRight:"20px"}}
      endIcon={<LoginIcon/>}
      onClick={handleNavigate}
      disableElevation
    >Login</Button>
  );
}
