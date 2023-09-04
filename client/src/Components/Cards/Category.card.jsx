import React, { useContext } from 'react';
import { Context } from '../../App';
import styles from './Category.module.css';
const Category = ({categoryName,Image}) => {
    const {setCategory}=useContext(Context)
    return (
        <>
        <div className={styles.categories} style={{backgroundImage:`url(${Image})`}} onClick={()=>setCategory(categoryName)}>
            <div className={styles.mask}></div>
            <h1 className={styles.categoryName}>{categoryName}</h1>
        </div>  
        </>
    );
}

export default Category;
