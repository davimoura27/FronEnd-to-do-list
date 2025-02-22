
import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.css'
import { Router } from './routes/index'



function App() {
  return (
    <div className={styles.bodyContainer}>    
    <div className={styles.container}
     
      >
       
      <BrowserRouter>
      
        <Router />
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
