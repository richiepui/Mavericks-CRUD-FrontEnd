import { makeStyles} from "@material-ui/core/styles";
import { Grid, Card, Typography } from "@material-ui/core/";
import { EmployeeModel } from "../employeeModel";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface employeeProps {
  employeeData: EmployeeModel;
  setSelEmp: React.Dispatch<React.SetStateAction<EmployeeModel>>
  setSelEdit: React.Dispatch<React.SetStateAction<number>>
  setUpdate: React.Dispatch<React.SetStateAction<number>>
}

const useStyles = makeStyles({
  gridItemPadding: {
    paddingTop:"10px",
    paddingBottom:"10px",
    paddingRight:'50px',
    paddingLeft:'50px'
  },
  cardContainer: {
    backgroundColor: "#eaeaea",
    height:"100%",
    width: "100%"
  },
  typographyBoldText: {
    fontFamily:'Roboto',
    fontSize: "24px",
    fontWeight: "bold",
    color: "#365271",
  },
  typographyNormalText: {
    fontFamily:'Roboto',
    fontSize: "16px",
    color: "#365271",
  },
});

export default function EmployeeCard(props: employeeProps) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const deleteEmployee = (employeeId: number) =>{
      axios.delete(`http://localhost:8080/employee/${employeeId}`).then(res=>{console.log(res.data)});
      setOpen(false);
      props.setUpdate(1);
  }

  const handleEdit = () => {
    props.setSelEmp(props.employeeData);
    props.setSelEdit(1);
    navigate("/Employee-Form",{replace:true});
    
  }

  return (
    <>
      <Grid item xs={12} md={6} className={classes.gridItemPadding}>
        <Card className={classes.cardContainer} style={{ display: "flex", boxShadow:'none' }} elevation={0}>
          <CardContent sx={{ flex: 1, paddingLeft:'10px', paddingTop:'5px', paddingBottom:'5px' }}>
            <Typography className={classes.typographyBoldText}>
              {props.employeeData.name}
            </Typography>
            <Typography className={classes.typographyNormalText}>
              ${props.employeeData.salary}
            </Typography>
            <Typography className={classes.typographyNormalText}>
              {props.employeeData.department}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="edit" onClick={handleEdit} style={{ color: "#fec333" }}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={()=>setOpen(true)} style={{ color: "#e50000" }}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description">
        <DialogTitle id="dialog-title">Delete this employee?</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button autoFocus onClick={()=>deleteEmployee(props.employeeData.id)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
