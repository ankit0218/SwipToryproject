import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai';
import styles from './TextInput.module.css';
const PasswordInput = ({label,placeholder,width="200px",setIsShowPassword,isShowPassword,dispatch,value}) => {
    return (
        <>
        <div className={styles.input_box}>
            <label className={styles.label} htmlFor={`${label}`}>{label}</label>
            <span className={styles.input_body}>
                <input className={styles.input} type={!isShowPassword?"password":"text"} id={`${label}`} placeholder={placeholder} styles={{width}} value={value} onChange={e=>dispatch({type:label.toUpperCase(),payload:e.target.value})}/>
                    <span className={styles.eye_icon}>
                        <button onClick={()=>setIsShowPassword(!isShowPassword)}>{isShowPassword?<AiFillEye/>:<AiFillEyeInvisible/>}</button>
                    </span>
            </span>
        </div>
        </>
    );
}

export default PasswordInput;
