import React, { useState, useEffect } from "react";
import {Grid} from "@material-ui/core/";
import {EmployeeModel} from "../employeeModel";
import CssBaseline from "@mui/material/CssBaseline";
import EmployeeCard from "./employeeCard";
import EmployeePagination from "./employeePagination";
import Container from "@mui/material/Container";
import axios from "axios";


interface Props{
  setEmp: React.Dispatch<React.SetStateAction<EmployeeModel>>
  setEdit: React.Dispatch<React.SetStateAction<number>>
}

export default function EmployeeList(props:Props) {

  const [page, setPage] = useState(0);
  const[update,setUpdate] = useState(0);
  const [employeeData, setEmployees] = useState<EmployeeModel[]>([]);
  const apiUrl = "http://localhost:8080/employee";
  

  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      setEmployees(res.data);
    });
    setUpdate(0);
  }, [update]);

  
  const defaultPageSize = 10;
  const numberOfPages = Math.ceil(employeeData.length / 10);
  const lengthOfEmp = employeeData.length;
  const currentPageEmp = employeeData.slice(
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
              setSelEmp={props.setEmp}
              setSelEdit={props.setEdit}
              setUpdate={setUpdate}
              key={employeeData.indexOf(emp)}
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
