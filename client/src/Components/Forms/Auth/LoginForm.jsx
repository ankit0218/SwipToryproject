import {useState, useReducer } from 'react';
import styles from './AuthForm.module.css';
import TextInput from '../../Input/TextInput';
import Button from '../../Buttons/Button';
import PasswordInput from '../../Input/PasswordInput';
import {RxCross2} from 'react-icons/rx'
import { intialState,reducer } from '../../../reducer/login.reducer';
import { useDispatch } from 'react-redux';
import { setPopUpData } from '../../../../redux/slice/showPopup';
import axios from 'axios';
import { setUserInfo } from '../../../../redux/slice/userInfo';
const LoginForm = () => {
    const dispatcher=useDispatch();
    const [state,dispatch]=useReducer(reducer,intialState)
    const [isShowPassword,setIsShowPassword]=useState(false);
    const closePopUp=()=>{
        dispatcher(setPopUpData({type:"",active:false}))
    }
    const loginUser=async()=>{
        try{
            let result=await axios.post("http://localhost:4000/auth/login",state,{withCredentials:true});
            result=result.data;
            if(result?.email && result?.userName){
                dispatcher(setUserInfo({userName:result.userName,email:result.email}))
                dispatcher(setPopUpData({type:"",active:false}))
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div className={styles.register}>
                <button onClick={closePopUp} className={styles.close_button}><RxCross2 size={40}/></button>
                <h1 className={styles.heading}>Login to SwipTory</h1>
                <form className={styles.form} onSubmit={e=>e.preventDefault()}>
                    <span className={styles.input}>
                        <TextInput type="text" label="Email" placeholder={"Enter Email"} dispatch={dispatch} value={state.userName}/>                    
                        <PasswordInput label="Password" placeholder={"Enter password"} isShowPassword={isShowPassword} setIsShowPassword={setIsShowPassword} dispatch={dispatch} value={state.password}/>
                    </span>
                    <Button buttonClick={loginUser} backgroundColor={"#73ABFF"} color={"Black"} width={"140px"}>Login</Button>
                </form>
            </div>   
        </>
    );
}

export default LoginForm;
