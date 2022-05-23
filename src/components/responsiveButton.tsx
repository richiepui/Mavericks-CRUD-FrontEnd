import {useTheme} from "@material-ui/core/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ResponsiveButton() {
  const navigate = useNavigate();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.only("xs"));

  return smallScreen ? (
    <IconButton size="large" sx={{color:"#ffffff"}}>
      <AddCircleIcon />
    </IconButton>
  ) : (
    <Button
      variant="contained"
      sx={{ bgcolor: "#34933b" }}
      onClick={() => navigate("/Employee-Form", { replace: true })}
      disableElevation
    >Add Employees</Button>
  );
}
