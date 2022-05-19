import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useNavigate, useLocation} from 'react-router';

export default function ButtonAppBar() {

  const nav = useNavigate();
  const location = useLocation();

  const handleHideAddButton = (location:string) =>{
    if (location == "/Add_Employee"){
      return "none";
    }
  }
  

  return (
    <Box sx={{ flexGrow:1 }}>
      <AppBar position="static" sx={{bgcolor: "#365271"}}>
        <Toolbar>
          <Typography variant="h6"
          sx={{flexGrow:1 , fontWeight:'bold', fontSize: 30, textDecoration:"none" , color:"white"}} onClick={()=>nav("/",{replace:true})}>
            Employees
          </Typography>
            <Button variant="contained" onClick={()=> nav("/Add_Employee",{replace:true})} sx={{bgcolor:"#34933b"}} startIcon={<AddCircleIcon />}>
              Add Employees</Button>
          </Toolbar>
      </AppBar>
    </Box>
  );
}

