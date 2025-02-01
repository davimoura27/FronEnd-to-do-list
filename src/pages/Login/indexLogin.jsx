import { useState } from "react";
import { api } from "../../service/api";
import "axios";
import PropTypes from "prop-types";
import style from './login.module.css'

const SignUp = ({ isOpen, onClose}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email:'',
        password: ''
    });
    const[isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }

      
    try {
        const response = await api.post("/users/register", user);
        if (response.status === 201 || response.status === 200) {
          alert("Usuário registrado com sucesso! Verifique o email.");
          onClose();
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Erro ao cadastrar: ${error.response.data.message}`);
        } else {
          alert("Erro ao se conectar com o servidor");
        }
      } finally{
        setIsLoading(false);
      }
    };
  
    if (!isOpen) return null;

    return (
        <div className={style.container} >
            <div className={style.modal}>
                <button className={style.closeButton} onClick={onClose}>X</button>
                <h1 className={style.title}>Crie sua conta</h1>
                <form onSubmit={handleLogin}>
                    <div className={style.inputContainer}>
                        <label htmlFor="name">Nome completo:</label>
                        <input
                            type="text"
                            id="name"
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            required
                            disabled = {isLoading}
                        />
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="userName">Nome de usuário:</label>
                        <input
                            type="text"
                            id="userName"
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            required
                            disabled = {isLoading}
                        />
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled = {isLoading}
                        />
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                            disabled = {isLoading}
                        />
                    </div>
                    <button 
                    className={style.submitButton} 
                    type="submit"
                    disabled = {isLoading}                    
                    >
                        {isLoading ? 'Registrando...': 'Registrar'}
                        
                        </button>

                </form>

              
            </div>
        </div>

    )

};
SignUp.propTypes = {
    isOpen:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired,
   
};
export default SignUp;
/* const [email, setEmail] = useState('');
 const [senha, setSenha] = useState('');
 const navigate = useNavigate();

 const handleLogin = (e) => {
     e.preventDefault();
     if (email === 'admin@admin.com' && senha === '123456') {
         navigate('/tarefas');
     } else {
         alert('Email ou senha invalido')
     }
 }
                  <div className="container">
                 <h1>E-Tasks</h1>
     <h3>Login</h3>
     <form onSubmit={handleLogin} className="formulario">
        <input type="email" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password"
         placeholder="Senha"
         value={senha}
         onChange={(e)=> setSenha(e.target.value)}
         />
      <button type="submit">Entrar</button>
     </form>
     <p>Não tem uma conta? <Link to={"/cadastro"}>Cadastre-se</Link> </p>
 </div> */







