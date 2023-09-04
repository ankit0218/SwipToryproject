import { useState , useEffect} from 'react';
import styles from './story.module.css';
import {useDispatch,useSelector} from 'react-redux';
import Stories from 'react-insta-stories'
import axios from 'axios';
import Post from '../Cards/Post.card';
import { setPopUpData } from '../../../redux/slice/showPopup';
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io';
import {BsFillBookmarkFill} from 'react-icons/bs';
import {AiFillHeart} from 'react-icons/ai'
const Story = () => {
    const popup=useSelector(state=>state.popUpData);
    const dispatch=useDispatch();
    const userInfo=useSelector(state=>state.userInfo);
    const [storyData,setStoryData]=useState([{}]);
    const [currentStoryIndex,setCurrentStoryIndex]=useState(0);
    const [likeCount,setLikeCount]=useState(0);
    const [liked,setLiked]=useState(false);
    const [isBookmarked,setIsBookmarked]=useState(false);
    const getStoryData=async()=>{
        try{
            const data=await axios.get(`http://localhost:4000/story/details?pid=${popup.id}&auth=${userInfo.email.length>0?"true":"false"}`,{withCredentials:true})
            if(data.status===200){
                let result=data.data;
                setLiked(result.liked)
                setLikeCount(result.likesCount)
                setIsBookmarked(result.BookMarked);
                const list=[];
                result.story.map(Item=>{
                    list.push({content:()=><Post borderRadius='0' width={'100%'} backgroundImage={Item.Image} height={'100%'} title={Item.Heading} desc={Item.Description} pid={Item._id}/>});
                })
                setStoryData(list);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getStoryData();
    },[])
    const handleNext=()=>{
        if(currentStoryIndex<storyData.length-1){
            setCurrentStoryIndex(prev=>prev+1)
        }
        else{
            dispatch(setPopUpData({type:"",active:false,id:""}))
        }
    }
    const handlePrev=()=>{
        if(currentStoryIndex>0){
            setCurrentStoryIndex(prev=>prev-1);
        }

    }
    const handleLike=async()=>{
        try{
            if(userInfo.email.length>0 && userInfo.userName.length>0){

                const data=await axios.put('http://localhost:4000/stories/like',{sid:popup.id,liked:!liked},{withCredentials:true})
                if(data.status===200){
                    setLiked(!liked);
                    if(!liked){
                        setLikeCount(prev=>prev+1)
                    }
                    else{
                        setLikeCount(prev=>prev-1)
                    }
                }
            }
            else{
                dispatch(setPopUpData({type:"Login",active:true,id:""}))
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const handleBookMark=async()=>{
        try{
            if(userInfo.email.length>0 && userInfo.userName.length>0){
                
                const data=await axios.put("http://localhost:4000/stories/bookmarks",{storyId:popup.id,isBookmarked:!isBookmarked},{withCredentials:true})
                if(data.status===200)
                {
                    setIsBookmarked(!isBookmarked);
                } 
            }
            else{
                dispatch(setPopUpData({type:"Login",active:true,id:""}))
            }
        }
        catch(err){
            console.log(err);
        }
            
    }
    return (
        <div className={styles.story}>
            <button onClick={handlePrev} className={styles.arrow_button}>
                <IoIosArrowBack/>
            </button>
            <div className={styles.stories}>
                <Stories
                stories={storyData || []}
                loader={"Loading..."}
                currentIndex={currentStoryIndex}
                onAllStoriesEnd={()=>dispatch(setPopUpData({type:"",active:false,id:""}))}
                preloadCount={2}/>
                <ol className={styles.ol}>
                    <li className={styles.item}>
                        <button onClick={handleBookMark} className={styles.buttons} style={isBookmarked?{color:"#085CFF"}:{}}>
                            <BsFillBookmarkFill className={styles.icon}/>
                        </button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.buttons} onClick={handleLike}>
                            <AiFillHeart style={liked?{fill:"red"}:{}} className={styles.icon}/>
                        </button>
                        <p className={styles.count}>{likeCount}</p>
                    </li>
                </ol>
            </div>
            <button onClick={handleNext} className={styles.arrow_button}>
                <IoIosArrowForward/>
            </button>
        </div>
    );
}

export default Story;
