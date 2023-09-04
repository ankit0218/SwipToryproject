import { configureStore } from "@reduxjs/toolkit";
import popUpData from './slice/showPopup';
import userInfo from "./slice/userInfo";
export const store=configureStore({
    reducer:{
        popUpData,
        userInfo
    }
});