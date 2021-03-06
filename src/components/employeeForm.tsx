import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core/";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import defaultEmpFields from "../employeeModel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addEmployee, updateEmployee, setEmployee, setEditOff} from "../store/slices/employeeSlice";
import { RootState, useAppDispatch } from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { unwrapResult } from '@reduxjs/toolkit'

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    border: "1px solid grey",
  },
  formStyle: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(3),
    },
    "& .MuiButtonBase-root": {
      width: "30%",
      height: "20%",
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.only("xs")]: {
      "&. MuiFormControl-root": {
        width: "80%",
        margin: theme.spacing(4),
      },
      "& .MuiButtonBase-root": {
        width: "30%",
        height: "20%",
        marginLeft: theme.spacing(15),
        marginTop: theme.spacing(4),
      },
    },
  },
}));

export default function EmployeeForm() {

  const dispatch = useAppDispatch();
  const editStatus = useSelector(
    (state: RootState) => state.employee.editStatus
  );
  
  const updatedEmp = useSelector((state: RootState) => state.employee.employee);

  const navigate = useNavigate();
  const [EmpValues, setEmpValues] = useState(
    editStatus ? updatedEmp : defaultEmpFields
  );

  const [nameError, setnameError] = useState(false);
  const [salaryError, setsalaryError] = useState(false);
  const [nameHelpText, setnameHelpText] = useState("");
  const [salaryHelpText, setsalaryHelpText] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length === 0) {
      setnameError(true);
      setnameHelpText("Employee Name field cannot be empty");
    } else if (!value.match("^[\\w\\-\\s]+$")) {
      setnameError(true);
      setnameHelpText(
        "Employee Name field should only have alphabetical characters"
      );
    } else if (value.length < 2 && value.length > 64) {
      setnameError(true);
      setnameHelpText("Employee Name field must be between 2 to 64 characters");
    } else {
      setnameError(false);
      setnameHelpText("");
    }
    setEmpValues({
      ...EmpValues,
      [name]: value,
    });
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value.length) {
      setsalaryError(true);
      setsalaryHelpText("Employee Salary field must not be empty");
    } else if (parseInt(value) <= 0) {
      setsalaryError(true);
      setsalaryHelpText("Employee Salary field must not be less than 0");
    } else {
      setsalaryError(false);
      setsalaryHelpText("");
    }
    setEmpValues({
      ...EmpValues,
      [name]: value,
    });
  };

  const handleDepartmentChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setEmpValues({
      ...EmpValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editStatus ? patchRequest() : postRequest();
  };

  const patchRequest = async () => {
    const patchEmployee = {
      id: EmpValues.id,
      name: EmpValues.name,
      salary: EmpValues.salary,
      department: EmpValues.department,
    };
    const response = await dispatch(updateEmployee(patchEmployee));
    const requestMessage =  (unwrapResult(response)).message;
    const requestState = (unwrapResult(response)).requestState;
    if(requestState){
      navigate("/employee");
      dispatch(setEmployee({}));
      dispatch(setEditOff());
      toast.success(requestMessage, {position:"bottom-right"});
    }else{
      toast.error(requestMessage, {position:"bottom-right"});
    }
  };

  const postRequest = async () => {
    const postEmployee = {
      name: EmpValues.name,
      salary: EmpValues.salary,
      department: EmpValues.department,
    };
    const response = await dispatch(addEmployee(postEmployee));
    const requestMessage = (unwrapResult(response)).message;
    const requestState =  (unwrapResult(response)).requestState;
    if(requestState){
      navigate("/employee");
      toast.success(requestMessage, {position:"bottom-right"});
    }else{
      toast.error(requestMessage, {position:"bottom-right"});
    }
  };

  const classes = useStyles();

  return (
    <Paper className={classes.paperStyle} elevation={0}>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", paddingLeft: "25px" }}
      >
        {editStatus ? "Edit Employee" : "Add Employee"}
      </Typography>
      <form className={classes.formStyle} onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Employee Name"
              name="name"
              value={EmpValues.name}
              onChange={handleNameChange}
              error={nameError}
              helperText={nameHelpText}
            />
            <TextField
              variant="outlined"
              label="Employee Salary"
              name="salary"
              type="number"
              value={EmpValues.salary}
              onChange={handleSalaryChange}
              error={salaryError}
              helperText={salaryHelpText}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-ddl"
                label="Department"
                name="department"
                value={EmpValues.department}
                onChange={handleDepartmentChange}
              >
                <MenuItem value={"HR"}>HR</MenuItem>
                <MenuItem value={"PS"}>PS</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ bgcolor: "#34933b" }}
              disableElevation
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
