import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
    data: any[],
    obj: any[]
}
const initialState: FormState = {
    data: [],
    obj: []
}

export const formDataSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<any>) => {
            state.data.push(action.payload)
        },
        setObject: (state, action: PayloadAction<any>) => {
            state.obj = action.payload
        }
    }
})
export const { setFormData ,setObject} = formDataSlice.actions
export default formDataSlice.reducer