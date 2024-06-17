import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from "./component/Register";
import Login from "./component/Login";

export const RouterConfig = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};