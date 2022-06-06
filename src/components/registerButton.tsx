import {useTheme} from "@material-ui/core/styles";
import {useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function RegisterButton() {
  const navigate = useNavigate();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.only("xs"));

  const handleNavigate = () => {
    navigate("/register",{replace:true})
  }

  return smallScreen ? (
    <IconButton size="large" sx={{color:"#ffffff"}}>
      <AppRegistrationIcon />
    </IconButton>
  ) : (
    <Button
      variant="contained"
      sx={{ bgcolor: "#34933b"}}
      endIcon={<AppRegistrationIcon/>}
      onClick={handleNavigate}
      disableElevation
    >Register</Button>
  );
}
