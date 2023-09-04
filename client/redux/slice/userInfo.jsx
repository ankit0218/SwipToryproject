import {createSlice} from '@reduxjs/toolkit';
const initialState={
    userName:"",
    email:""
}
export const userInfo=createSlice({
    name:"userInfo",
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.userName=action.payload.userName,
            state.email=action.payload.email
            return;
        }
    }
})
export const {setUserInfo}=userInfo.actions;
export default userInfo.reducer;
