import { useEffect, useState } from "react"
import style from "../Tarefas/tarefas.module.css"
import { taskService } from "../../service/api";
import "axios";
import { useNavigate } from "react-router-dom";

export function CreatList() {
   const [lista, setLista] = useState([]);
   const [titulo, setTitulo] = useState("");
   const [categoria, setCategoria] = useState("");
   const [ filtroCategoria, setFiltroCategoria] = useState("todos")
   const [status, setStatus] = useState("");
   const [editarLista, setEditarLista] = useState(null);
   const [completarTarefa, setCompletarTarefa] = useState(new Set());
   const navigate = useNavigate();


   const getTarefas = async () => {
      try {
         const response = await taskService.getTasks();
         setLista(response.data);
      } catch (error) {
         console.error("Erro ao buscar tarefa", error)

      }
   }
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
      if (!user) {
         navigate("/");
         return;
      }
      getTarefas();
   }, []);

   const creatTasks = async (event) => {
      event.preventDefault();

      if (!titulo || !categoria) {
         alert("Preencha os campos");
         return;
      }

      try {
       const statusValido = status || "pendente";

        if(editarLista){
         await taskService.updateTask(editarLista.id,{
            titulo,
            categoria,
            status:statusValido,
         });
        } else{
         await taskService.createTask({titulo, categoria,status:statusValido});
        }
        setCategoria("");
        setTitulo(""); 
        setStatus("")
        setEditarLista(null);
        getTarefas();

      } catch (error) {
         console.error('Erro ao criar tarefa', error.response?.data || error)
      }
   }

   const deleteTarefa = async (id) => {
      try {
         await taskService.deleteTask(id);
         setLista(lista.filter((tarefa) => tarefa.id !== id))
         getTarefas();
      } catch (error) {
         console.error("Erro ao excluir tarefa", error)
      }
   }

    const formeditarTarefa = (tarefa) =>{
         setEditarLista(tarefa);
         setTitulo(tarefa.titulo);
         setCategoria(tarefa.categoria);
     }

   const completeTarefa = async (id, statusAtual) => {
      try {
         const novoStatus = statusAtual === "completo" ? "pendente" : "completo";
         
          await taskService.updateTask(id,{status:novoStatus});

          setLista((prevLista) =>
         prevLista.map((tarefa) =>
         tarefa.id === id ? {...tarefa, status:novoStatus} : tarefa
         )
         );
      } catch (error) {
         console.error("Erro ao atualizar status da tarefa" , error)
      }
   };
   const tarefasfiltro = lista.filter((tarefa) => {
      return filtroCategoria === "todos" || tarefa.categoria === filtroCategoria;
   });
   

   return (
      <div className={style.body}>


         <div className={style.container}>
            
               <h1>Lista de Tarefas</h1>
            
            <div className={style.containerButton}>

               <form onSubmit={creatTasks}>
                  <div className={style.criarTarefa}>
                     <h3>{editarLista ? "Editar tarefa" : "Criar tarefa"}</h3>
                     <div className={style.criar}>
                   

                     <select 
                      className={style.buttonCategoria}
                     name="criar"
                        id="criar"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                     >
                        <option value="">Selecione uma Categoria</option>
                        <option value="Estudo">Estudo</option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Pessoal">Pessoal</option>
                     </select>
                           
                     </div>

                     <div className={style.tituloPesquisa}>


                        <input
                           placeholder="Digite o titulo"
                           type="text"
                           id="titulo"
                           value={titulo}
                           onChange={(e) => setTitulo(e.target.value)}
                           required
                        />

                        <button type="submit">{editarLista ? "Salvar Edição" : "Criar Tarefa"}</button>
                     </div>
                  </div>
               </form>



               <div className={style.pesquisarTarefa}>

                  <h3>Pesquisar</h3>

                  <select 
               
                   id="pesquisa"
                   value={filtroCategoria}
                   onChange={(e) => setFiltroCategoria(e.target.value)}
                   >

                     <option value="todos">Todos</option>
                     <option value="Estudo"> Estudo</option>
                     <option value="Trabalho">Trabalho</option>
                     <option value="Pessoal">Pessoal</option>
                  </select>
               </div>


               <div className={style.listaTarefa}>
                  {tarefasfiltro.length === 0 ? (
                     <p>Não ha tarefas cadastradas</p>
                  ) :
                     tarefasfiltro.map((listas) => (
                        <div key={listas.id} className={style.todasTarefas}>
                          <div className={`${style.categoria} ${listas.status === "completo" ? style.completar : ""}`}>
                              <p className={style.titulo}>{listas.titulo}</p>
                              <p className={style.categoryList}>({listas.categoria})</p>
                           </div>
                           <div className={style.status}>
                              <button className={style.complete} onClick={()=> completeTarefa(listas.id)}>Completar</button>
                              <button className={style.deletar} onClick={() => deleteTarefa(listas.id)}><i className="fa-solid fa-trash"></i></button>
                              <button className={style.edit} onClick={() => formeditarTarefa(listas)}><i className="fa-solid fa-pen-to-square"></i></button>
                           </div>
                        </div>

                     ))}
               </div>
               {tarefasfiltro.length === 0 && <p>Nenhuma tarefa encontrada com essa categoria</p>}
            </div>
         </div>
      </div>
   )
}