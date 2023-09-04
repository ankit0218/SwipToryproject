import React from 'react';
import styles from './Button.module.css'
import { useDispatch } from 'react-redux';
import { setPopUpData } from '../../../redux/slice/showPopup';
const Button = ({icon,children,backgroundColor,color="white",minWidth="150px",height="2.8rem",width="auto",boxShadow="none",buttonClick=()=>{}}) => {
    const dispatch=useDispatch();
    const handleClick=()=>{
        if(children==="Login" || children==="Register" || children==="Add story"){
            dispatch(setPopUpData({type:children,active:true}))
            buttonClick();
        }
        else{
            buttonClick();
        }
    }
    return (
        <>
        <button onClick={handleClick} className={styles.button} style={{backgroundColor,color,minWidth,height,width,boxShadow}}>
            <span className={styles.icon} style={{color}}>
                {icon}
            </span>
            <p className={styles.text}>{children}</p>
        </button>
        </>
    );
}

export default Button;
