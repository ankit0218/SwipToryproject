const intialState={
    email:"",
    password:"",
}
const reducer=(state,action)=>{
    switch(action.type){
        case "EMAIL":
            return {...state,email:action.payload};
        case "PASSWORD":
            return {...state,password:action.payload};
        default:
            return state;
    }
}
export {intialState,reducer}