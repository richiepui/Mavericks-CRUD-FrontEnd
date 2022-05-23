import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom'
import ResponsiveButton from './responsiveButton'

interface Props{
  setEdit: React.Dispatch<React.SetStateAction<number>>
}

export default function ResponsiveAppBar(props:Props) {

  const navigate = useNavigate();

  const homePageReturn=()=>{
    props.setEdit(0);
    navigate("/",{replace:true});

  }

  return(
    <Box sx={{flexGrow:1}}>
      <AppBar position='static' sx={{bgcolor:'#365271'}} elevation={0}>
        <Toolbar>
          <Typography 
          sx={{flexGrow:1, fontWeight:'bold',fontSize:'30px', textDecoration:'none',color:'white'}}
          onClick={homePageReturn}> Employees
          </Typography>
          <ResponsiveButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}