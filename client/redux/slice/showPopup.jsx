import { createSlice } from "@reduxjs/toolkit";
const initialState={
    type:"",
    active:false,
    id:''
}
export const popUpData=createSlice({
    name:"popup",
    initialState,
    reducers:{
        setPopUpData:(state,action)=>{
            state.type=action.payload.type;
            state.active=action.payload.active;
            state.id=action.payload.id || ""
            return;
        }
    }
})
export const {setPopUpData}=popUpData.actions;
export default popUpData.reducer;