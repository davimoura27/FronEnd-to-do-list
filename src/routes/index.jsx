import { Routes, Route, Outlet } from "react-router-dom"
import { Header } from "../pages/Header/indexHeader"
import { Home } from "../pages/Home/indexHome"
import { CreatList } from "../pages/Tarefas/indexCreatTarefas"


export const Router = () => {
    return (
        <div>     
        <Routes>

            <Route element={<LayoutHeader />}>
                <Route path="/"  element={<Home />} />
            </Route>
            
            <Route  element = {<LayoutHeader/>}>

            <Route path="/lista" element={<CreatList />} />
            </Route>
        </Routes>
        </div>


    )
};


const LayoutHeader = () => {
    return (
        <>
            <Header />
            <Outlet />

        </>
    )
}

