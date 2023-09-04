import React from 'react';
import styles from './textarea.module.css';
const TextArea = ({label,value,dispatch,placeholder}) => {
    return (
        <div className={styles.textArea}>
            <label htmlFor={label} className={styles.label}>{label}</label>
            <span className={styles.container}>
                <textarea className={styles.textarea} placeholder={placeholder} value={value} rows={4} cols={24} onChange={e=>dispatch({type:label.split(":")?.[0].toUpperCase(),payload:e.target.value})}/>
            </span>
        </div>
    );
}

export default TextArea;
