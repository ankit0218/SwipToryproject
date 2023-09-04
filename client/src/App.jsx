import { useEffect,useRef,createContext,useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Popup from './Components/Popup/Popup';
import styles from './styles/App.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {setUserInfo} from '../redux/slice/userInfo'
import axios from 'axios';
import Index from './pages/Index';
import {Route,Router,Routes} from 'react-router-dom';
import Bookmark from './pages/Bookmark';
export const Context=createContext(null);
function App() {
  const refs=useRef(null);
  const dispatch=useDispatch();
  const popUp=useSelector(state=>state.popUpData);
  const [category,setCategory]=useState("All")
  const [reload,setReload]=useState(false);
  const getUserData=async()=>{
    try{
      let result=await axios.get("http://localhost:4000/user",{withCredentials:true});
      result=result.data;
      if(result?.email && result?.userName)
      {
        dispatch(setUserInfo({userName:result.userName,email:result.email}))
      } 
    }
    catch(err){
    }
  }
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <>
    <Context.Provider value={{category,reload,setCategory,setReload}}>
      {popUp.active?<Popup type={popUp.type}/>:<></>}
      <div className={styles.app} ref={refs}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/bookmark' element={<Bookmark/>}/>
        </Routes>
      </div>
    </Context.Provider>
    </>
  )
}

export default App
