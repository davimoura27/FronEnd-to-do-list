

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import { Router } from './routes/index'
import backgroundImage from './img/img.png';

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
