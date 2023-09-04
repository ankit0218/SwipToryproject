import SingUpForm from '../Forms/Auth/SignUpForm';
import LoginForm from '../Forms/Auth/LoginForm';
import ConfigStory from '../Forms/configStory/ConfigStory';
import styles from './PopUp.module.css'
import { useSelector } from 'react-redux';
import Story from './Story';
const Popup = () => {
    const {type}=useSelector(state=>state.popUpData);
    return (
        <div className={styles.popup}>
            <div className={styles.mask}></div>
            {
                type==="Register"?<SingUpForm/>  
                :type==="Login"?<LoginForm/>:type==="Add story" || type==="Edit"?<ConfigStory/>:type==="Story"?<Story/>:<></>
            }
        </div>
    );
}

export default Popup;
