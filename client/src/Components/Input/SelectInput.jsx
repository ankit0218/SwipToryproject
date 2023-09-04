import React from 'react';
import styles from './selectInput.module.css';
const options=['food','health and fitness','travel','movies','education']
const SelectInput = ({label,value,dispatch}) => {
    return (
        <>
        <div className={styles.select}>
            <label className={styles.label} htmlFor={label}>{label}</label>
            <select className={styles.selector} value={value} id={label} onChange={e=>dispatch({type:label.split(":")?.[0].toUpperCase(),payload:e.target.value})}>
                <option id={styles.option} value="">-None-</option>
                {options.map((list,count)=><option key={count} id={styles.option} value={list}>{list}</option>)}
            </select>
        </div>
        </>
    );
}

export default SelectInput;
