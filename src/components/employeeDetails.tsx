import { makeStyles, styled } from "@material-ui/core/styles";
import { Grid, Card, Typography } from "@material-ui/core/";
import { EmployeeModel } from "../employeeModel";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ClassNames } from "@emotion/react";

interface employeeProps {
  employeeData: EmployeeModel[];
}

const useStyles = makeStyles({
  gridContainer: {
    padding: "30px",
  },
  cardContainer: {
    margin: "40px",
    backgroundColor: "#eaeaea",
    padding: "10px",
    width: "100%",
  },
  typographyBoldText: {
    fontWeight: "bold",
    color: "#365271",
  },
  typographyNormalText: {
    fontSize: "20px",
    color: "#365271",
  },
  backDrop: {
    background: "rgba(255,255,255,0.2)",
  },
});

export default function EmployeeDetails(props: employeeProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
      <>
      <Grid container className={classes.gridContainer}>
      {props.employeeData.map((emp) => (
        <Grid
          item
          container
          xs={12}
          sm={6}
          justifyContent="center"
          key={props.employeeData.indexOf(emp)}
        >
          <Card className={classes.cardContainer}>
            <Grid container direction="row" wrap="nowrap">
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    variant="h5"
                    className={classes.typographyBoldText}
                  >
                    {emp.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyNormalText}
                  >
                    {emp.department}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyNormalText}
                  >
                    ${emp.salary}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <IconButton aria-label="edit" style={{ color: "#fec333" }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  style={{ color: "#e50000" }}
                  onClick={() => setOpen(true)}
                >
                  <DeleteIcon />
                </IconButton>
                <div>
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                    BackdropProps={{
                      style: { background: "transparent", boxShadow: "none" },
                    }}
                  >
                    <DialogTitle id="dialog-title">
                      Delete this employee?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="dialog-description">
                        Are you sure you want to delete this employee?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen(false)}>Cancel</Button>
                      <Button autoFocus onClick={() => setOpen(false)}>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
      </>
    
  );
}
