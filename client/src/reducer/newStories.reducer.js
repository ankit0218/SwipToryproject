const initalState={
    Category:"",
    story:[{
        id:1,
        Heading:"",
        Description:"",
        Image:"",
    },
    {
        id:2,
        Heading:"",
        Description:"",
        Image:"",
    },
    {
        id:3,
        Heading:"",
        Description:"",
        Image:"",
    }]
}
const reducer=(state,action)=>{
    switch(action.type){
        case "ADDSLIDE":
            return {...state,story:[...state.story,{
                id:state.story.length+1,
                Heading:"",
                Description:"",
                Image:""
            }]
            }
        case "CATEGORY":
            return {...state,Category:action.payload}
        case "UPDATEDATA":
            let data=state.story.map((item)=>{
                if(item.id===action.payload.id)
                {
                    return action.payload;
                }
                else
                {
                    return item;
                }
            })
            return {...state,story:data};
        case "REMOVESLIDE":
            const item=state.filter(item=>item.story.id!==action.payload)
            return item;

        default:
            return state;
    }
}
export {reducer,initalState}