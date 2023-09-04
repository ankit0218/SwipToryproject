const intialState={
    userName:"",
    email:"",
    password:"",
}
const reducer=(state,action)=>{
    switch(action.type){
        case "USERNAME":
            return {...state,userName:action.payload};
        case "EMAIL":
            return {...state,email:action.payload};
        case "PASSWORD":
            return {...state,password:action.payload};
        default:
            return state;
    }
}
export {intialState,reducer}