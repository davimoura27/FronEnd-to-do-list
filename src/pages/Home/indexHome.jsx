
import img from "../../img/7.webp"
import img2 from "../../img/imagem2.jpg"
import img7 from "../../img/imag7.jpg"
import styles from "./home.module.css"
export function Home() {

    return (
        <div className={styles.containerBody}>       
        <div className={styles.container}>
            
            <div className={styles.text}>
          
                <h1>Bem-vindo ao gerenciador de tarefas 🚀</h1>
                    
             
            </div>
            <div className={styles.imgCardContainer}>

           
            <div className={styles.cardContainer}>
                
                <p>Organize suas tarefas de forma simples e eficiente!
                Gerencie prazos, acompanhe seu progresso e maximize sua produtividade.</p>
                <p>✅ Crie, edite e exclua tarefas com facilidade.</p> 
                <p>✅ Acesse suas atividades de qualquer lugar.</p>
                <p>✅ Visualize apenas suas tarefas pessoais.</p>
                <h4>💡 Torne seu dia mais produtivo com o Tarefas do dia!</h4>
            </div>
            </div>
        </div>

            <div className={styles.imgContainer}>
            <img src={img7} alt="" width={100} height={50}/>

            </div>
        </div>

    )
}