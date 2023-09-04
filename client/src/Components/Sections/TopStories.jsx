import {useState,useEffect, useContext} from 'react';
import {Context} from '../../App'
import styles from './topstories.module.css';
import Post from '../Cards/Post.card';
import Button from '../Buttons/Button';
import axios from 'axios';
const TopStories = () => {
    const {category,reload,setReload}=useContext(Context);
    const [topStoriesData,setTopStoriesData]=useState([])
    const [limit,setLimit]=useState(5);
    const showMoreStories=()=>{
        setLimit(prev=>prev+10)
    }
    const getStories=async()=>{
        try{
            const result=await axios(`http://localhost:4000/story?limit=${limit}&category=${category}`,{withCredentials:true})
            if(result.data?.length>0){
                setTopStoriesData(result.data);
                setReload(false);
            }
            else{
                setTopStoriesData([])
            }
        }
        catch(err){
            setTopStoriesData([])
        }
    }
    useEffect(()=>{
        getStories();
    },[category,limit])
    useEffect(()=>{
        if(reload){
            getStories();
        }
    },[reload])
    return (
        <>
        <div className={styles.topStories}>
            <h1 className={styles.heading}>Top Stories</h1>
            <ol className={styles.list}>
                {
                    topStoriesData?.map(({_id,story})=>{
                    return <li key={_id} className={styles.item}><Post backgroundImage={story[0]?.Image} title={story[0]?.Heading} pid={_id} desc={story[0]?.Description}/></li>})}
            </ol>
            <Button backgroundColor={"#FF7373"} buttonClick={showMoreStories}>See more</Button>
        </div>
        </>
    );
}

export default TopStories;
