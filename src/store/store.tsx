import {configureStore} from "@reduxjs/toolkit";
import editStatusReducer from "./slices/editStatusSlice";
import employeeReducer from "./slices/employeeSlice";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: { 
    editStatus: editStatusReducer,
    employee: employeeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
