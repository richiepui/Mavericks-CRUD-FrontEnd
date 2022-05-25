export interface EmployeeModel{
    id:number,
    name:string,
    salary:number,
    department:string;
}

export interface postEmployee{
    name:string,
    salary:number,
    department:string
}

const defaultEmpFields = {
    id: 0,
    name: "",
    salary: 0,
    department: "HR",
}

export default defaultEmpFields;