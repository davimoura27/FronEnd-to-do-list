import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { authService } from "../../service/api";
import { Modal } from "../Modal/indexModal";
import { User } from "phosphor-react";
import styles from "./header.module.css"

export function Header(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
    const [username, setUserName] = useState("");
    
    useEffect(() =>{
        setIsLoggedIn(authService.isAuthenticated());
    },[]);

    const handleLoginSuccess = (userData) => {
        setIsLoggedIn(true);
        setUserName(userData.username);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        setUserName("");
    };

return(
    <div className={styles.container}>
        
            <h1 className={styles.title}>tasks up to date</h1>
       
        <div className={styles.configButton}>

        <li>
            <Link className={styles.home} to={"/"}>Home</Link>
        </li>
        <li>
            {isLoggedIn ? (
                <div className={styles.userInfo} onClick={handleLogout}>
                  <User size={24} weight="fill" className={styles.userIcon}/>
                  <span className={styles.username}>{username}</span>
                </div>
            ):(
            <button className={styles.button} onClick={()=> setIsModalOpen(true)}>
                Login
            </button>
            )}
        </li>
        </div>
     

       <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
)


}