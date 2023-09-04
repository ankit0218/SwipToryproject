import {useEffect, useReducer} from 'react';
import TextInput from '../../Input/TextInput';
import styles from './form.module.css';
import TextArea from '../../Input/TextArea';
import SelectInput from '../../Input/SelectInput';
const initalState={
    Heading:"",
    Description:"",
    Image:"",
}
const Form = ({id,dispatch,data,states}) => {
    const reducer=(state,action)=>{
        switch(action.type){
            case "HEADING":
                return {...state,Heading:action.payload};
            case "DESCRIPTION":
                return {...state,Description:action.payload};
            case "IMAGE":
                return {...state,Image:action.payload};
            case "FETCH":
                return {...state,Heading:action.payload.Heading,Description:action.payload.Description,Image:action.payload.Image};
            default:
                return state;
        }
    }
    const [state,dispatcher]=useReducer(reducer,initalState);    
    useEffect(()=>{
        dispatch({type:"UPDATEDATA",payload:{...state,id}});
    },[state])
    useEffect(()=>{
        if((data.Heading.length>0 && data.Description.length>0 && data.Image.length>0) && (state.Heading.length===0 && state.Description.length===0 && state.Image.length===0)){
            dispatcher({type:"FETCH",payload:data});
        }
    },[data])
    return (
        <>
        <form className={styles.story_form}>
            <TextInput type="text" label="Heading:" placeholder="Your heading" value={data.Heading} dispatch={dispatcher}/>
            <TextArea label="Description:" value={data.Description} dispatch={dispatcher} placeholder="Story Description"/>
            <TextInput type="text" label="Image:" placeholder="Add Image Url" value={data.Image} dispatch={dispatcher}/>
            <SelectInput label="Category:" value={states.Category} dispatch={dispatch}/>
        </form>
        </>
    );
}

export default Form;
