import {useTheme} from "@material-ui/core/styles";
import {useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppDispatch} from '../store/store';
import {signOutUser} from '../store/slices/userSlice';
import { toast } from "react-toastify";

interface navBarProps{
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignOutButton(props: navBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.only("xs"));

  const handleSignOut = async () => {
    const response = await dispatch(signOutUser());
    navigate("/");
    toast.success("Successfully Logged Out",{position:"bottom-right"});
  }

  return smallScreen ? (
    <IconButton size="large" sx={{color:"#ffffff"}}>
      <LogoutIcon />
    </IconButton>
  ) : (
    <Button
      variant="contained"
      sx={{ bgcolor: "#b23b3b"}}
      onClick={handleSignOut}
      disableElevation
    >Sign Out</Button>
  );
}
