import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import ItemList from './pages/ItemList.tsx';
import Cart from './pages/Cart.tsx';
import ItemDetail from './pages/ItemDetail.tsx';
import Navbar from './components/layout/Navbar.tsx';
import Order_cconfirm from './components/order_confirm.tsx';

export const RouterConfig = () => {
    return (
        <>
                <BrowserRouter>
                <Navbar />
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cart" element={<Cart />} />
                        {/* <Route path="/item-list" element={<ItemList />} /> */}
                        <Route path="/item-list/:type" element={<ItemList />} />
                        <Route path="/item/:id" element={<ItemDetail />} />
                        <Route path="/order_confirm" element={<Order_cconfirm />} />
                    </Routes>
                </BrowserRouter>
        </>
    );
};
