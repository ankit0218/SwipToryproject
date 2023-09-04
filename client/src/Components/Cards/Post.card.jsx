import React from 'react';
import styles from './post.module.css';
import { useDispatch } from 'react-redux';
import { setPopUpData } from '../../../redux/slice/showPopup';
const Post = ({backgroundImage,title,desc,pid,width="",height="",borderRadius=""}) => {
    const dispatch=useDispatch()
    const handleClick=()=>{
        dispatch(setPopUpData({type:"Story",active:true,id:pid}))
    }
    return (
        <>
        <div className={styles.post} style={{backgroundImage:`url(${backgroundImage})`,width,height,borderRadius}} onClick={handleClick}>
            <div className={styles.top_mask}></div>
            <div className={styles.bottom_mask}>
                <span className={styles.body}>
                    <h1 className={styles.heading}>{title}</h1>
                    <p className={styles.desc}>{desc}</p>
                </span>
            </div>
            
        </div>
        </>
    );
}

export default Post;
