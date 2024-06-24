import React, { useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import ItemList from './pages/ItemList.tsx';
import Cart from './pages/Cart.tsx';
import ItemDetail from './pages/ItemDetail.tsx';
import OrderConfirm from './components/order_confirm.tsx';
import CreditCardInfo from './components/credit-card-info.tsx';
import OrderComplete from './pages/OrderComplete.tsx';
import NotFound from './pages/NotFound.tsx'; 
import Navbar from './components/layout/Navbar.tsx';
import ItemListAll from './pages/ItemListAll.tsx';

export const RouterConfig = () => {
    const [username, setUsername] = useState<any>(null);
    return (
        <>
                <BrowserRouter>
                <Navbar username={username} setUsername={setUsername} />
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setUsername={setUsername} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/item-list/:type" element={<ItemList />} />
                        <Route path="/item-list" element={<ItemListAll />} />
                        <Route path="/item/:id" element={<ItemDetail />} />
                        <Route path="/order_confirm" element={<OrderConfirm />} />
                        <Route path="/credit-card-info" element={<CreditCardInfo />} />
                        <Route path="/complete" element={<OrderComplete />} />
                        <Route path="*" element={<NotFound />} /> {/* 404ページへのルート */}
                    </Routes>
                </BrowserRouter>
        </>
    );
};
