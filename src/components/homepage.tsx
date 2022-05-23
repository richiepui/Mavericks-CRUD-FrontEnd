import { Route, Routes, BrowserRouter } from "react-router-dom";
import {useState} from "react";
import defaultEmpFields, { EmployeeModel } from "../employeeModel";
import ResponsiveAppBar from "./navBar";
import EmployeeList from "./employeeList";
import EmployeeForm from "./employeeForm";

export default function HomePage() {
  const [emp, setEmp] = useState<EmployeeModel>(defaultEmpFields);
  const [edit, setEdit] = useState(0);

  return (
    <BrowserRouter>
      <ResponsiveAppBar setEdit={setEdit} />
      <Routes>
        <Route
          path="/"
          element={<EmployeeList setEmp={setEmp} setEdit={setEdit} />}
        />
        <Route
          path="/Employee-Form"
          element={
            <EmployeeForm
              selectedEmpProps={emp}
              editStatus={edit}
              setEdit={setEdit}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
