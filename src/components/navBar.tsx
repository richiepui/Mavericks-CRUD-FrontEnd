import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function ResponsiveAppBar() {

  const navigate = useNavigate();

  return(
    <Box sx={{flexGrow:1}}>
      <AppBar position='static' sx={{bgcolor:'#365271'}}>
        <Toolbar>
          <Typography 
          sx={{flexGrow:1, fontWeight:'bold',fontSize:'30px', textDecoration:'none',color:'white'}}
          onClick={()=>navigate("/",{replace:true})}> Employees
          </Typography>
          <Button
          sx={{bgcolor:'#34933b'}}
          startIcon={<AddCircleIcon />}
          onClick={()=>navigate("/Employee-Form",{replace:true})} 
          variant="contained"> Add Employees
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

