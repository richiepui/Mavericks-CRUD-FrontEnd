import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    editStatus: 0
}

export const EditStatusSlice = createSlice({
    name: 'editStatus',
    initialState,
    reducers:{
        setEditOff: (state) =>{state.editStatus = 0},
        setEditOn: (state) =>{state.editStatus = 1}
    }
})

export const {setEditOff, setEditOn} = EditStatusSlice.actions;

export default EditStatusSlice.reducer;