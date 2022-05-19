import {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Employee from './employee'
import {Grid,Typography} from "@material-ui/core/"
import Button from '@mui/material/Button';

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
    },
    textGridContainer:{
        paddingTop:'40px'
    },
    buttonGridContainer:{
        paddingBottom:'20px'
    }
    
}));

export default function EmployeeList(){

    const classes = useStyles();

    const staffs = [
        { id:1, name: "Pui Chin See", salary:1000, department: "HR"},
        { id:2, name: "Pui Chin See V2", salary:2000, department: "PS"},
        { id:3, name: "Pui Chin See V3", salary:3000, department: "HR"},
        { id:4, name: "Pui Chin See V4", salary:4000, department: "PS"},
        { id:5, name: "Pui Chin See V5", salary:5000, department: "HR"},
        { id:6, name: "Pui Chin See V6", salary:6000, department: "PS"},
        { id:7, name: "Pui Chin See V7", salary:7000, department: "HR"},
        { id:8, name: "Pui Chin See V8", salary:8000, department: "PS"},
        { id:9, name: "Pui Chin See V9", salary:9000, department: "HR"},
        { id:10, name: "Pui Chin See V10", salary:10000, department: "PS"},
        { id:11, name: "Pui Chin See V11", salary:11000, department: "HR"},
        { id:12, name: "Pui Chin See V12", salary:12000, department: "PS"},
        { id:13, name: "Pui Chin See V13", salary:13000, department: "HR"},
        { id:14, name: "Pui Chin See V14", salary:14000, department: "PS"},
        { id:15, name: "Pui Chin See V15", salary:15000, department: "HR"},
        { id:16, name: "Pui Chin See V16", salary:16000, department: "PS"},
        { id:17, name: "Pui Chin See V17", salary:17000, department: "HR"},
        { id:18, name: "Pui Chin See V18", salary:18000, department: "PS"},
        { id:19, name: "Pui Chin See V19", salary:19000, department: "HR"},
        { id:20, name: "Pui Chin See V20", salary:20000, department: "PS"}
      ];

    const defaultPageSize = 10;
    const numberOfPages = Math.ceil(staffs.length/10);
    const totalNumberOfPages = staffs.length;

    const[page, setPage] = useState(0);

    const handleIncrement = () =>{
    if(!(page+1>=numberOfPages)){
        setPage(page + 1);
    }
    }

    const handleDecrement = () => {
    if(!(page+1===1)){
        setPage(page -1);
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

    return(
        <div>
            <Employee employeeData={staffs.slice(page*defaultPageSize, page* defaultPageSize+10)}/>
            <Grid container direction = "row" justifyContent= "space-between" wrap='nowrap'>
            <Grid item>
                <Typography noWrap className = {classes.leftSideDetails}>
                        Showing {page*defaultPageSize+1} - {page*defaultPageSize+10} out of {totalNumberOfPages} entries
                </Typography>
            </Grid>
            <Grid container direction ="row" justifyContent="flex-end" wrap="nowrap"> 
                <Grid item>
                    <Button disabled = {handleDisablePrev()} 
                    onClick = {handleDecrement} 
                        sx={{fontWeight:'bold', color:"#365271"}}>
                    Previous
                    </Button>
                </Grid>   
                <Grid item>
                    <Typography className = {classes.pageNumber}>{page+1}</Typography>
                </Grid> 
                <Grid item>
                    <Button disabled = {handleDisableNext()} 
                    onClick = {handleIncrement} 
                    sx={{fontWeight: 'bold', color:"#365271"}} >Next</Button>
                </Grid>                    
            </Grid>
            </Grid>
        </div>
    );
};
