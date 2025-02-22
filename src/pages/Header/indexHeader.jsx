import { useEffect, useState } from "react";
import { User } from "phosphor-react";
import { Modal } from "../Modal/indexModal";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import img from "../../img/logo5.png"


export function Header() {
     const navigate = useNavigate(); 
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState("");

   

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setIsLoggedIn(true);
            setUserName(storedUser.username);
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setIsLoggedIn(true);
        setUserName(userData.username);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserName("");
        navigate("/");
    };
    
    return (
        <div className={styles.containerBody}>
        <div className={styles.container}>
            <div className={styles.logoContainer}>
            <img className={styles.imagem} src={img} alt="" width={40} />
            <h1 className={styles.title}>Tarefas do dia</h1>
           
            </div>
         
      
         
            <div className={styles.configButton}>
                <li className={styles.containerButton}>
                    {isLoggedIn ? (
                        <div className={styles.userInfo} onClick={handleLogout}>
                            <User size={24} weight="fill" className={styles.userIcon} />
                            <span className={styles.username}>{username}</span>
                        </div>
                    ) : (
                        <>  
                        

                 
                            <button
                                className={styles.buttonEntrar}
                                onClick={() => {
                                    setIsSignUp(false); 
                                    setIsModalOpen(true);
                                }}
                                >
                                Entrar
                            </button>
                            <button
                                className={styles.buttonCriar}
                                onClick={() => {
                                    setIsSignUp(true); 
                                    setIsModalOpen(true);
                                }}
                                >
                                Criar Conta
                            </button>
                           
                        </>
                    )}
                </li>
           
            </div>
            <Modal
                isOpen={isModalOpen}
                isSignUp={isSignUp} 
                onClose={() => setIsModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
            <div className={styles.linha}></div>
        </div>
    );
}
