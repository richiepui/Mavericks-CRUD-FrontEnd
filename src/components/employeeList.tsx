import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core/";
import CssBaseline from "@mui/material/CssBaseline";
import EmployeeCard from "./employeeCard";
import EmployeePagination from "./employeePagination";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";
import { fetchEmployees } from "../store/slices/employeeSlice";

export default function EmployeeList() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
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

  return (
    <div>
      <CssBaseline />
      <Container>
        <Grid container>
          {currentPageEmp.map((emp) => (
            <EmployeeCard
              employeeData={emp}
              update = {update}
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
  );
}
