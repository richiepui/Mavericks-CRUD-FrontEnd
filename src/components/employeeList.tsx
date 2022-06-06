import { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@material-ui/core/";
import CssBaseline from "@mui/material/CssBaseline";
import EmployeeCard from "./employeeCard";
import EmployeePagination from "./employeePagination";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";
import { fetchEmployees } from "../store/slices/employeeSlice";
import { makeStyles } from "@material-ui/core/node_modules/@material-ui/styles";
import { verifyToken} from "../store/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  typographyEmptyStyle: {
    fontWeight: "bold",
    fontSize: "30px",
    color: "#365271",
  },
}));

export default function EmployeeList() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [update, setUpdate] = useState(0);

  const verifyJwt = async () => {
    const response = await dispatch(verifyToken());
    const auth = unwrapResult(response).auth;
    auth? navigate(""): navigate("/");
  }

  useEffect(() => {
    verifyJwt();
    dispatch(fetchEmployees());
  }, [update]);

  const allEmployees = useSelector(
    (state: RootState) => state.employee.employees
  );

  const defaultPageSize = 10;
  const numberOfPages = Math.ceil(allEmployees.length / 10);
  const lengthOfEmp = allEmployees.length;
  const currentPageEmp = allEmployees.slice(
    page * defaultPageSize,
    page * defaultPageSize + 10
  );

  return lengthOfEmp ? (
    <div>
      <CssBaseline />
      <Container>
        <Grid container>
          {currentPageEmp.map((emp) => (
            <EmployeeCard
              employeeData={emp}
              update={update}
              setUpdate={setUpdate}
              key={allEmployees.indexOf(emp)}
            />
          ))}
        </Grid>
        <EmployeePagination
          numberOfPages={numberOfPages}
          lengthOfEmp={lengthOfEmp}
          page={page}
          setPage={setPage}
        />
      </Container>
    </div>
  ) : (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item style={{paddingTop:"40px"}}>
          <Typography variant="h5" className={classes.typographyEmptyStyle}>
            The employee list is empty, add some employees!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
