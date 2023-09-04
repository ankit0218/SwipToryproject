import { useState, useEffect } from 'react';
import styles from './Navbar.module.css'
import Button from '../Buttons/Button';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx'
import dummyProfile from '../../assets/portrait-smiling-man_107420-37633.webp'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserInfo } from '../../../redux/slice/userInfo';
const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo?.email && userInfo?.userName) {
            setIsAuthorized(true);
        }
        else {
            setIsAuthorized(false);
        }
    }, [userInfo])
    const logOutUser = async () => {
        try {
            const data = await axios.get("http://localhost:4000/auth/logout", { withCredentials: true });
            if (data.status === 200) {
                dispatch(setUserInfo({ userName: "", email: "" }))
                navigate('/');
                setShowMenu(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleMenu = () => {
        setShowMenu(!showMenu)
    }
    return (
        <ol className={styles.navbar}>
            <li className={styles.left_item}>
                <Link to={'/'} className={styles.home_link}>
                    <h1
                        className={styles.logo}>
                        SwipTory
                    </h1>
                </Link>
            </li>
            <li className={styles.right_item}>
                <span className={styles.body}>
                {
                    !isAuthorized ?
                    <span
                            className={styles.not_authorized}>
                            <Button
                                width='100%'
                                min-width="100%"
                                backgroundColor={"#FF7373"}>
                                Register
                            </Button>
                            <Button
                                width='100%'
                                min-width="100%"
                                backgroundColor={"#73ABFF"}>
                                Login
                            </Button>
                        </span>
                        : <span
                        className={styles.authorized}>
                            <Link
                                style={{ width: '100%' }}
                                to={"/bookmark"}
                                className={styles.bookmark}>
                                <Button
                                    width='100%'
                                    min-width="100%"
                                    icon={<BsFillBookmarkFill />}
                                    backgroundColor={"#FF7373"}>
                                    Bookmarks
                                </Button>
                            </Link>
                            <Button
                                width='100%'
                                min-width="100%"
                                backgroundColor={"#FF7373"}>
                                Add story
                            </Button>
                            <img
                                src={dummyProfile}
                                alt="none"
                                className={styles.profileImg} />
                            <div className={styles.more_options}>
                                <span style={showMenu ? {} : { display: 'none' }} className={styles.menu_card}>
                                    <p className={styles.userName}>{userInfo.userName}</p>
                                    <Button buttonClick={logOutUser} backgroundColor={"#FF7373"}>Logout</Button>
                                </span>
                            </div>
                        </span>
                }
                <button
                onClick={handleMenu}
                style={(userInfo.email.length>0 && userInfo.userName.length>0)?{}:{display:'none'}}
                className={styles.hamburger}>
                    <RxHamburgerMenu />
                </button>
                </span>
            </li>
            <li className={styles.mobile_menu_section} style={showMenu?{height:0}:{}}>
                {!isAuthorized ?
                    <span
                        className={styles.not_auth}>
                        <Button
                            backgroundColor={"#FF7373"}>
                            Register
                        </Button>
                        <Button
                            backgroundColor={"#73ABFF"}>
                            Login
                        </Button>
                    </span>
                    : <span
                        className={styles.auth}>
                        <Button buttonClick={logOutUser} backgroundColor={"#FF7373"}>Logout</Button>

                        <Link
                            to={"/bookmark"}
                            className={styles.bookmark}>
                            <Button
                                icon={<BsFillBookmarkFill />}
                                backgroundColor={"#FF7373"}>
                                Bookmarks
                            </Button>
                        </Link>
                        <Button
                            backgroundColor={"#FF7373"}>
                            Add story
                        </Button>
                        <img
                            src={dummyProfile}
                            alt="none"
                            className={styles.profileImg} />
                        <div className={styles.more_options}>
                            <span style={showMenu ? {} : { display: 'none' }} className={styles.menu_card}>
                                <p className={styles.userName}>{userInfo.userName}</p>
                                <Button buttonClick={logOutUser} backgroundColor={"#FF7373"}>Logout</Button>
                            </span>
                        </div>
                    </span>
                }
            </li>
        </ol>
    );
}

export default Navbar;
