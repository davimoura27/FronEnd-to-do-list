import { useState } from "react";
import SignUp from "../Login/indexLogin";
import PropTypes from "prop-types";
import style from './modal.module.css'
import { loginUser } from "../../service/api";

export function Modal({isOpen, onClose, onLoginSuccess}){
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [showSignUp,setShowSignUp] = useState(false);
 const [error, setErro] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setIsLoading(true);
  
try{
   const data = await loginUser(username, password);
   console.log('[Modal] Dados do login:', data);
   if(data && data.accessToken){
    localStorage.setItem('user', JSON.stringify({token: data.accessToken, username: data.username}));

   }
     setUsername("");
     setPassword("");
     onLoginSuccess({
        ...data, username: data.username || username
     });
 
   
} catch (error){
    console.error("[Modal]:", error.message);
    setErro(
        error.response?.data?.message || error.message || 'Erro ao fazer login. Verifique suas credenciais!'
    );
} finally{
    setIsLoading(false);
}

 };

 const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
    setUsername("");
    setPassword("");
    setErro("");
 };
 if(!isOpen) return null;

 if(showSignUp) {
    return <SignUp isOpen={isOpen} onClose={onClose} onToggle={toggleSignUp}/>;
 }

 return(
    <div className={style.container}>
        <div className={style.modal}>
            <button className={style.closeButton} onClick={onClose}>X</button>
            <h1 className={style.title}>Entre na sua conta</h1>
            {error && <p className={style.errorMessage}>{error}</p>}
 
          <form onSubmit={handleLogin}>
            <div className={style.containerGroup}>
                <label htmlFor="userName">Nome de ususario:</label>
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

            >{isLoading ? "Entrando..." : "Entrar"}
            </button>

          </form>
          <p className={style.createAccount}>
            Não tem uma conta?{""}
            <a className={style.createAccountLink} href="#" onClick={toggleSignUp}> Crie uma conta</a>
          </p>
        </div>
    </div>
 );
};
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired,
  };