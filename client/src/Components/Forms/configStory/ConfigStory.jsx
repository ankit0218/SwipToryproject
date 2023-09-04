import React, { useReducer, useState,useEffect, useContext } from 'react';
import styles from './newstory.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {RxCross2} from 'react-icons/rx';
import { setPopUpData } from '../../../../redux/slice/showPopup';
import NewSlideCard from '../../Cards/StorySlide.card';
import {RiAddFill} from 'react-icons/ri'
import Form from './Form';
import {initalState,reducer} from '../../../reducer/newStories.reducer';
import Button from '../../Buttons/Button';
import axios from 'axios';
import { Context } from '../../../App';
const ConfigStory = () => {
    const {reload,setReload}=useContext(Context);
    console.log(reload);
    const [errorMessage,setErrorMessage]=useState("");
    const [state,dispatch]=useReducer(reducer,initalState);
    const [activeSlide,setActiveSlide]=useState(1);
    const dispatcher=useDispatch()
    const popup=useSelector(state=>state.popUpData);
    const closePopUp=()=>{
    dispatcher(setPopUpData({type:"",active:false}))
    }
    const addSlide=()=>{
        dispatch({type:"ADDSLIDE"})
    }
    const removeSlide=(id)=>{
        // dispatch({type:"REMOVESLIDE",payload:id})
    }
    const handlePost=async()=>{
        let isError=false;
        state.story.map((item)=>{
            if((item.Heading.length===0 || item.Description.length===0 || item.Image.length===0) && state.Category.length===0){
                setErrorMessage("minimum 3 status slides required")
                isError=true;
                return;
            }
        })
        if(!isError){
            try{
                if(popup.id.length===0){
                    const result=await axios.post("http://localhost:4000/stories/create",state,{withCredentials:true})
                    if(result.status===200){
                        closePopUp();
                    }
                }
                else{
                    const result=await axios.put("http://localhost:4000/stories/update",{pid:popup.id,...state},{withCredentials:true})
                    if(result.status===200){
                        setReload(true) 
                        closePopUp();
                    }
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }
    const getStoryData=async(pid)=>{
        try{
            let storyData=await axios.get(`http://localhost:4000/stories/story?pid=${pid}`,{withCredentials:true});
            storyData=storyData.data;
            dispatch({type:"CATEGORY",payload:storyData.Category})
            storyData.story.map((item)=>{
                dispatch({type:"UPDATEDATA",payload:item})
            })
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(popup.type==='Edit' && popup.id){
            getStoryData(popup.id)
        }
    },[popup])
    // useEffect(()=>{
    //     if(showError.length>0){
    //         setShowError('');
    //     }
    // },[state])
    return (
        <>
        <div className={styles.NewStory}>
            <button onClick={closePopUp} className={styles.close_button}><RxCross2 size={40}/></button>
            <ol className={styles.slide_list}>
                {state.story.map(({id},count)=>
                    <NewSlideCard key={count} activeSlide={activeSlide} setActiveSlide={setActiveSlide} id={id} icon={<RxCross2/>} onClickRemove={removeSlide}/>)
                }
                <li className={styles.addSlide} style={state.length>=6?{display:"none"}:{}} onClick={addSlide}>
                    Add <RiAddFill/>    
                </li>
            </ol>
            <Form id={activeSlide} data={state.story[activeSlide-1]} states={state} dispatch={dispatch}/>
            <div className={styles.button}>
                <div className={styles.left}>
                    <Button backgroundColor={"#7EFF73"} minWidth={"120px"}>Previous</Button>
                    <Button backgroundColor={"#73ABFF"} minWidth={"120px"}>Next</Button>
                </div>
                <div className={styles.right}>
                    <Button backgroundColor={"#FF7373"} minWidth={"120px"} buttonClick={handlePost}>Post</Button>
                </div>
            </div>
            <p styles={errorMessage.length>0?{}:{display:"none"}} className={styles.error}>{errorMessage}</p>
        </div>   
        </>
    );
}

export default ConfigStory;
