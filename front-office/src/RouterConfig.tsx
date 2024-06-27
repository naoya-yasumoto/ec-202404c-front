import React, { useState, useContext } from "react";
import { ECsiteContext, CartItem } from "./contexts.ts";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import ItemList from "./pages/ItemList.tsx";
import Cart from "./pages/Cart.tsx";
import ItemDetail from "./pages/ItemDetail.tsx";
import OrderConfirm from "./components/OrderConfirm.tsx";
import CreditCardInfo from "./components/credit-card-info.tsx";
import OrderComplete from "./pages/OrderComplete.tsx";
import NotFound from "./pages/NotFound.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import ItemListAll from "./pages/ItemListAll.tsx";
import Favorite from "./pages/Favorite.tsx";
import OrderHistory from "./components/OrderHistory"; // Import OrderHistory component

const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [username, setUsername] = useState<any>(null);

  const showNavbar =
    !["/login", "/register"].includes(pathname) && pathname !== "*";

  return (
    <>
      {showNavbar && <Navbar username={username} setUsername={setUsername} />}
      {children}
    </>
  );
};

export const RouterConfig = () => {
  const [username, setUsername] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  return (
    <>
      <BrowserRouter>
        <ECsiteContext.Provider value={{ cartItems, setCartItems }}>
          <AppLayout>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={<Login setUsername={setUsername} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/item-list/:type" element={<ItemList />} />
              <Route path="/item-list" element={<ItemListAll />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/order_confirm" element={<OrderConfirm />} />
              <Route path="/credit-card-info" element={<CreditCardInfo />} />
              <Route path="/complete" element={<OrderComplete />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/order_history" element={<OrderHistory userId={username} />} /> {/* Order History route */}
              <Route path="*" element={<NotFound />} /> {/* 404ページへのルート */}
            </Routes>
          </AppLayout>
        </ECsiteContext.Provider>
      </BrowserRouter>
    </>
  );
};
