import styles from './TextInput.module.css';
const TextInput = ({type,label,placeholder,width="200px",dispatch,value}) => {
    return (
        <>
        <div className={styles.input_box}>
            <label className={styles.label} htmlFor={`${type}${label}`}>{label}</label>
            <span className={styles.input_body}>
                <input className={styles.input} type={type} id={`${type}${label}`} placeholder={placeholder} styles={{width}} value={value} onChange={e=>dispatch({type:label.split(":")?.[0].toUpperCase(),payload:e.target.value})}/>
            </span>
        </div>
        </>
    );
}

export default TextInput;
