import React from 'react';
import styles from './storyslide.module.css';
const NewSlideCard = ({id,activeSlide,setActiveSlide,icon,onClickRemove}) => {
    return (
        <>
            <li className={styles.slide} style={activeSlide===id?{border:"2px solid #87ceeb"}:{}} onClick={()=>setActiveSlide(id)}>
                {id>3?<button onClick={()=>onClickRemove(id)} className={styles.remove_slide}>
                    {icon}
                </button>:<></>}
                {`Slide ${id}`}
            </li>
        </>
    );
}

export default NewSlideCard;
