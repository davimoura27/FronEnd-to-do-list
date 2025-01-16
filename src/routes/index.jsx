import { Routes, Route } from "react-router-dom"
import { Header } from "../pages/Header/indexHeader"
import { Home } from "../pages/Home/indexHome"


export const Router = () => {
    return (
        <>
      
        <Header />
        <Routes>          
            <Route path="/" element={<Home />} />
        </Routes>
   
        </>
    )
}