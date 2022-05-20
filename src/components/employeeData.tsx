import {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid,Typography} from "@material-ui/core/"
import Button from '@mui/material/Button';
import {EmployeeModel} from '../employeeModel'
import EmployeeDetails from './employeeDetails'
import axios from 'axios';

const useStyles = makeStyles((theme)=>({
    leftSideDetails:{
        paddingTop:'6px',
        paddingLeft:'10px',
        paddingRight:'10px',
        color:'#365271',
        fontWeight:'bold',
        [theme.breakpoints.only("xs")]:{
            display:"none"
        }
    },
    pageNumber:{
        paddingTop:'6px',
        paddingLeft:'10px',
        paddingRight:'10px',
        color:'#365271',
        fontWeight: 'bold'
    }
}))

export default function EmployeeData(){

    const classes = useStyles();
    
    const[employeeData, getEmployees] = useState<EmployeeModel[]>([]);
    const[page, setPage] = useState(0);

    const apiUrl = 'http://localhost:8080/employee';

    useEffect(()=>{
        axios.get(apiUrl).then(res=>{getEmployees(res.data)});
    },[]);

    const defaultPageSize = 10;
    const numberOfPages = Math.ceil(employeeData.length/10);
    const totalNumberOfPages = employeeData.length;

    //Functions
    const handleIncrement = () =>{
        if(!(page+1>=numberOfPages)){
            setPage(page+1);
        }
    }

    const handleDecrement = () =>{
        if(!(page+1 === 1)){
            setPage(page-1);
        }
    }

    const handleDisableNext = () => {
        if(page+1 === numberOfPages){
            return true;
        }
        else{
            return false;
        }
    }
    
    const handleDisablePrev = () =>{
        if(page+1 === 1){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <div>
            <EmployeeDetails employeeData={employeeData}/>
            <Grid container direction="row" justifyContent="space-between" wrap="nowrap">
                <Grid item>
                    <Typography noWrap className = {classes.leftSideDetails}>
                        Showing {page*defaultPageSize+1} - {page*defaultPageSize+10} out of {totalNumberOfPages} entries
                    </Typography>
                </Grid>
                <Grid container direction = "row" justifyContent="flex-end" wrap="nowrap">
                    <Grid item>
                        <Button disabled ={handleDisablePrev()} onClick={handleDecrement}
                        sx={{fontWeight:'bold', color:'#365271'}}>
                            Previous
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography className = {classes.pageNumber}>
                            {page+1}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button disabled = {handleDisableNext()} onClick = {handleIncrement} 
                        sx={{fontWeight: 'bold', color:"#365271"}}>
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};
