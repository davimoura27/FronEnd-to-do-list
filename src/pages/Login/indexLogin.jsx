import { useState } from "react";
import { api } from "../../service/api";
import "axios";
import PropTypes from "prop-types";
import style from './login.module.css'

const SignUp = ({ isOpen, onClose, onToggle }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/register', formData);
            alert('Usuário registrado com sucesso!');
            onClose();
        } catch (error) {
            if(error.response?.status === 409){
                alert("Nome de usuario ja existe!")
            } else{

                alert('Erro ao registrar usuário');
            }
            
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
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="userName">Nome de usuário:</label>
                        <input
                            type="text"
                            id="userName"
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className={style.inputContainer}>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button className={style.submitButton} type="submit">
                        Criar conta</button>

                </form>

                <p className={style.loginAccount}>Já tem uma conta? {''}
                    <a className={style.loginAccountLink} href="#" onClick={onToggle}>Faça login</a>
                </p>

            </div>
        </div>

    )

};
SignUp.propTypes = {
    isOpen:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired,
    onToggle:PropTypes.func.isRequired
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







