

import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.css'
import { Router } from './routes/index'


function App() {
  return (
    <div
      className={styles.container}
     
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
