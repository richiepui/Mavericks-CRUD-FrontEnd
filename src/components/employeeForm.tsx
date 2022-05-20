import FormControl from '@mui/material/FormControl'
import {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid,Typography} from "@material-ui/core/"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const useStyles = makeStyles((theme)=>({

    gridContainer:{
        border:"1px solid grey",
        borderRadius:"5px",
        padding: theme.spacing(2),
        margin: "5% 20%",
        maxWidth: 500
    },

    gridItemSpace:{
        padding:"20px"

    },

    typographyText:{
        fontWeight:'bold',
        fontSize:'25px'
    }
}))

export default function EmployeeForm(){

    const classes = useStyles();

    const[name, setName] = useState('');
    const[salary, setSalary] = useState('');
    const[nameError, setNameError] = useState(false);
    const[salaryError, setSalaryError] = useState(false);

    const [department, setDepartment] = useState('');

    const handleChangeDdl = (event: SelectChangeEvent)=>{
        setDepartment(event.target.value as string);
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(e);
    }

    return(
        <div>
            <Grid container justifyContent='center'>
                <Grid container alignItems="center" direction = "column" className={classes.gridContainer} component="form" onSubmit={handleSubmit}>
                    <Grid item className = {classes.gridItemSpace}>
                        <Typography className={classes.typographyText}>
                            Add A New Employee
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItemSpace}>
                        <FormControl sx={{minWidth: 240}}>
                            <TextField onChange={(e)=>setName(e.target.value)}
                             required id="name"
                              label="Employee Name"
                              error={nameError}/>
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.gridItemSpace}>
                        <FormControl sx={{minWidth: 240}}>
                            <TextField 
                            onChange={(e)=>setSalary(e.target.value)} 
                            required id="salary" 
                            label="Employee Salary"
                            error={salaryError}/>
                        </FormControl>
                    </Grid>
                    <Grid item className = {classes.gridItemSpace}>
                        <FormControl sx={{minWidth: 240}}>
                            <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                            <Select 
                            labelId="simple-select-department"
                            id="department"
                            value={department}
                            onChange={handleChangeDdl}
                            label="Department">
                                <MenuItem value = "">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"HR"}>HR</MenuItem>
                                <MenuItem value={"PS"}>PS</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item className = {classes.gridItemSpace}>
                    <Button variant="contained" 
                    onClick={()=>console.log("You Clicked Me")}
                    type="submit" 
                    sx={{bgcolor:"#34933b"}} 
                    endIcon={<ArrowCircleRightIcon />}>
                        Submit
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}