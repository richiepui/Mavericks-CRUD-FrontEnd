export interface UserModel{
    id:number,
    username:string,
    password:string
}

export interface postUser{
    username:string,
    password:string
}

const defaultUserFields = {
    id: 0,
    username: "",
    password: ""
}

export default defaultUserFields