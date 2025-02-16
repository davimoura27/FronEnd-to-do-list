import { useState } from "react";
import PropTypes from "prop-types";
import SignUp from "../Login/indexLogin";
import style from "./modal.module.css";
import { loginUser } from "../../service/api";
import { useNavigate } from "react-router-dom";

export function Modal({ isOpen, isSignUp, onClose, onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const data = await loginUser(username, password);
            console.log("Resposta da Api ao fazer login: ", data)

            if (data && data.accessToken) {
                localStorage.setItem("user", 
                JSON.stringify({ token: data.accessToken,
                    userId:data.userId || data.id,
                     username: data.username }));
            }
            setUsername("");
            setPassword("");
            onLoginSuccess(data);
            navigate("/lista");
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais!");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={style.container}>
            <div className={style.modal}>
                <button className={style.closeButton} onClick={onClose}>X</button>
                {isSignUp ? (
                    <SignUp isOpen={isOpen} onClose={onClose} />
                ) : (
                    <>
                        <h1 className={style.title}>Entre na sua conta</h1>
                        {error && <p className={style.errorMessage}>{error}</p>}
                        <form onSubmit={handleLogin}>
                            <div className={style.containerGroup}>
                                <label htmlFor="userName">Nome de usuário:</label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={style.containerGroup}>
                                <label htmlFor="password">Senha:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                type="submit"
                                className={style.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? "Entrando..." : "Entrar"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isSignUp: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired,
};
