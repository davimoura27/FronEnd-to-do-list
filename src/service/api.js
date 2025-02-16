import axios from 'axios';
import { use } from 'react';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const taskService = {
    getTasks: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user) return Promise.reject("Usuaio não autenticado");
        return api.get(`/tarefas?userId = ${user.userId}`);
    },
    createTask:(task) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user || !user.userId) {
            console.error("Erro:Usuario não autenticado ou sem Id")
            return Promise.reject("Usuario não autenticado");
        }
            return api.post("/tarefas", {...task, userId: user.userId});
    
    },
    updateTask:(id, task) => api.put(`/tarefas/${id}`, task),
    deleteTask:(id) => api.delete(`/tarefas/${id}`)
}

api.interceptors.request.use((config) => {
   const user = localStorage.getItem('user');
   if(user){
     const {token} = JSON.parse(user);
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});


export const authService = {
    login: (userData) => {
        localStorage.setItem('user',JSON.stringify(userData));
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    },
    
    logout: () => {
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        window.location.href = "/";
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    },
    getUser:() =>{
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
      
        if (response.status === 200 && response.data) {
           
             const userData={
                username,
                userId:response.data.userId,
                token:response.data.token,
             }
             authService.login(userData);
             return userData;
            }
        throw new Error('Falha na autenticação');
    } catch (error) {
        console.error('[Login]:', error.message);
        throw error;
    }
};
