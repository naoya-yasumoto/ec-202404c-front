import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx'
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import ItemList from './pages/ItemList.tsx';

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