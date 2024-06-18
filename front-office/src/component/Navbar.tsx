import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="navbar is-light" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <img src="../static/img_aloha/header_logo.png" alt="main logo" height="35" />
      </Link>
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-end">
        <Link className="navbar-item" to="/cart">ショッピングカート</Link>
        <a href="order_history.html" className="navbar-item">注文履歴</a>
        <a href="login.html" className="navbar-item">ログイン</a>
        <a href="item_list_pizza.html" className="navbar-item">ログアウト</a>
      </div>
    </div>
  </nav>
);

export default Navbar;
