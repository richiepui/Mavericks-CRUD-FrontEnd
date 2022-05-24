import {configureStore} from "@reduxjs/toolkit"
import editStatusReducer from '../store/slices/editStatusSlice'

export const store = configureStore({
    reducer:{
        editStatus: editStatusReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;