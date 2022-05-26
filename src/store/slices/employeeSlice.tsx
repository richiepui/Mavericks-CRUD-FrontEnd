import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultEmpFields, {EmployeeModel, postEmployee} from "../../employeeModel";
import axios from "axios";

const apiUrl = "http://localhost:8080/employee";

interface EmployeeState {
  employees: EmployeeModel[];
  employee: EmployeeModel;
  employeeId: number;
  status: string;
  error: string;
}

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee: postEmployee) => {
    const response = await axios.post(apiUrl, employee);
    return response.data;
  }
);

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployee",
  async () => {
    const response = await axios.get<EmployeeModel[]>(apiUrl);
    return response.data;
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchEmployeeById",
  async(employeeId: number) => {
    const response = await axios.get(`http://localhost:8080/employee/${employeeId}`);
    return response.data;
  }
)

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee: EmployeeModel) => {
    const {id, ...rest} = employee;
    const updateEmployee:postEmployee = rest;
    const response = await axios.patch(
      `http://localhost:8080/employee/${id}`, updateEmployee);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId: number) => {
    const response = await axios.delete(
      `http://localhost:8080/employee/${employeeId}`
    );
    return response.data;
  }
);

const initialState: EmployeeState = {
  employees: [],
  employee: defaultEmpFields,
  employeeId: -1,
  status: "",
  error: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (state,action) => {state.employee = action.payload},
    setEmployeeId: (state,action) =>{state.employeeId = action.payload}
  },
  extraReducers(builders) {
    builders
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(fetchEmployeeById.fulfilled, (state,action)=>{
        state.status = "succeeded";
        state.employee = action.payload;
      })
  },
});

export const {setEmployee, setEmployeeId} = employeeSlice.actions;

export default employeeSlice.reducer;
