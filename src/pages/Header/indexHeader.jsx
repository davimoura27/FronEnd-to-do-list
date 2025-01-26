import { useEffect, useState } from "react";
import { User } from "phosphor-react";
import { Modal } from "../Modal/indexModal";
import styles from "./header.module.css";

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false); // Novo estado para controlar se é login ou registro
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
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tasks Up to Date</h1>

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
                                className={styles.button}
                                onClick={() => {
                                    setIsSignUp(false); // Exibir formulário de login
                                    setIsModalOpen(true);
                                }}
                            >
                                Login
                            </button>
                            <button
                                className={styles.button}
                                onClick={() => {
                                    setIsSignUp(true); // Exibir formulário de registro
                                    setIsModalOpen(true);
                                }}
                            >
                                Register
                            </button>
                        </>
                    )}
                </li>
            </div>

            <Modal
                isOpen={isModalOpen}
                isSignUp={isSignUp} // Passa o estado de registro
                onClose={() => setIsModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}
