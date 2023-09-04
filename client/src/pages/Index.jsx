import React from 'react';
import styles from './index.module.css'
import MyStories from '../Components/Sections/MyStories';
import TopStories from '../Components/Sections/TopStories';
import Filters from '../Components/Sections/Filters';
const Index = () => {
    return (
        <>
        <div className={styles.index}>
            <Filters/>
            <MyStories/>
            <TopStories/>
        </div>
        </>
    );
}

export default Index;
