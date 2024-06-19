import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import ItemList from './pages/ItemList.tsx';
import { validationSchema } from "./utils/validationSchema.ts";

export const RouterConfig = () => {
    return (
        <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/item-list" element={<ItemList />} />
                    </Routes>
                </BrowserRouter>
        </>
    );
};