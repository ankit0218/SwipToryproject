import {useState,useEffect} from 'react';
import styles from './Bookmark.module.css'
import Post from '../Components/Cards/Post.card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
const Bookmark = () => {
    const [bookmarkData,setBookmarkData]=useState([]);
    const userInfo=useSelector(state=>state.userInfo);
    const navigate=useNavigate();
    const getBookmarkData=async()=>{
        const data=await axios.get("http://localhost:4000/stories/bookmarks",{withCredentials:true})
        if(data.status===200){
            setBookmarkData(data.data);
        }
    }
    const checkLogedIn=()=>{
        if(userInfo.email.length===0 && userInfo.userName.length===0){
            navigate("/")
        }
        else{
            getBookmarkData();
        }
    }
    useEffect(()=>{
        checkLogedIn()
    },[])
    return (
        <>
        <div className={styles.bookmark}>
            <h1 className={styles.heading}>Your Bookmarks</h1>
            <ol className={styles.list}>
                {
                    bookmarkData.map((item,count)=><li key={count} className={styles.item}><Post backgroundImage={item.story[0].Image} title={item.story[0].Heading} desc={item.story[0].Description}pid={item._id}/></li>)
                }
            </ol>
        </div>
        </>
    );
}

export default Bookmark;
