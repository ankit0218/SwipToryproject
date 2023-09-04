import {useState,useEffect, useContext} from 'react';
import { Context } from '../../App';
import styles from './mystories.module.css';
import Post from '../Cards/Post.card'
import Button from '../Buttons/Button';
import {TbEdit} from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux';
import {setPopUpData} from '../../../redux/slice/showPopup'
import axios from 'axios';
const MyStories = () => {
    const {category,reload}=useContext(Context);
    const userInfo=useSelector(state=>state.userInfo)
    const [storiesData,setStoriesData]=useState([]);
    const [limitStories,setLimitStories]=useState(5);
    const dispatch=useDispatch();
    const showStories=()=>{
        setLimitStories(prev=>prev+10)
    }
    const handleStoryEdit=(pid)=>{
        dispatch(setPopUpData({type:"Edit",active:true,id:pid}))
    }
    const getMyStories=async()=>{
        try{
            const result=await axios.get(`http://localhost:4000/stories/mystories?limit=${limitStories}&category=${category}`,{withCredentials:true});
            if(result.data){
                setStoriesData(result.data);
            }
        }
        catch(err){
            setStoriesData([])
        }
    }

    useEffect(()=>{
        if(reload){
            getMyStories();
        }
    },[reload])

    useEffect(()=>{
        if(userInfo.email.length>0 && userInfo.userName.length>0){
            getMyStories();
        }
        else{
            setStoriesData([])
        }
    },[limitStories,category,userInfo])
    return (
        <>
        <div className={styles.stories} style={storiesData?.length>0?{}:{display:"none"}}>
            <h1 className={styles.heading}>Your Stories</h1>
            <ol className={styles.list}>
                {
                    storiesData?.map(({_id,story})=>{
                    return <li key={_id} className={styles.item}>
                        <Post backgroundImage={story.Image} title={story.Heading} desc={story.Description} pid={_id}/>
                        <span className={styles.edit_btn}>
                            <Button minWidth={'80px'} backgroundColor={"white"} color="black" icon={<TbEdit/>} boxShadow='2px 6px 8px gray' height='fit-content' buttonClick={()=>handleStoryEdit(_id)}>Edit</Button>
                        </span>
                    </li>
                    })
                }
            </ol>
            <Button backgroundColor={"#FF7373"} buttonClick={showStories}>See more</Button>
        </div>   
        </>
    );
}

export default MyStories;
