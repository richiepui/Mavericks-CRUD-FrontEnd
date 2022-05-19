import {makeStyles, styled} from "@material-ui/core/styles";
import {Grid, Card, Typography} from "@material-ui/core/"
import {EmployeeModel} from '../employeeModel'
import {IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {useState} from 'react'

interface employeeProps{
    employeeData: EmployeeModel[];
}

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '50px',
        paddingRight: '50px',
        paddingTop: '40px',
        paddingBottom:'40px'
    },
    cardContainer:{
        backgroundColor: '#eaeaea',
        padding: '10px',
        width: '100%'
    },

    typographyBoldText:{
        fontWeight: 'bold',
        color:"#365271"
    },
    typographyText:{
        fontSize:"20px",
        color:"#365271"
    }
})

//Use Div to section them

export default function Employee(props: employeeProps){
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const classes = useStyles();
    return(
        <div>
            <Grid container className = {classes.gridContainer}
            spacing={7} 
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start">
                {props.employeeData.map(emp => (
                    <Grid container item xs = {12} sm = {6} key={props.employeeData.indexOf(emp)}>
                        <Card className = {classes.cardContainer}>
                            <Grid container item direction="row" wrap="nowrap">
                                <Grid container item direction = "column">
                                    <Grid item>
                                        <Typography variant = "h5" className={classes.typographyBoldText}>
                                            {emp.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant = "h5" className={classes.typographyText}>
                                            {emp.department}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant = "h5" className={classes.typographyText}>
                                            ${emp.salary}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item direction = "row" justifyContent="flex-end">
                                    <IconButton aria-label="edit" style={{color:"#fec333"}}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" style={{color:"#e50000"}} onClick={handleClickOpen}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Dialog 
                                    fullScreen={fullScreen} 
                                    open={open} 
                                    onClose={handleClose} 
                                    aria-labelledby="responsive-dialog-delete" BackdropProps={{invisible:true}}>
                                        <DialogTitle>
                                            Delete Employee
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete this employee?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button autoFocus onClick={handleClose}>
                                                Confirm Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
} 

//{props.employeeData.map(emp=>(<IndividualEmp inEmpData={emp} />))}           