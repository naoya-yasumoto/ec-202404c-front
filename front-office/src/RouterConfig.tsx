import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx'
import Register from './component/Register.tsx';
import Login from './component/Login.tsx';

export const RouterConfig = () => {
    return (
        <>

                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<App/>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        {
                        
                        /* <Route path="/room/:room_id" element={<ChatGUI />} /> */}
                    </Routes>
                </BrowserRouter>
        </>
    );
};