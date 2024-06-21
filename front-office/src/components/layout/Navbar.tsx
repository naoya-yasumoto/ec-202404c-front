import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar: React.FC = () => {
  
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate('/cart');
  };
  
  return (
  <div className="bg-gray-100">
    <div className="navbar container mx-auto" style={{ width: '80%', height: 'calc(3.25rem * 2.0)'} }>
      <div className="flex-1 flex items-center">
        <a className="text-3xl font-poiret font-extrabold">RakuStyle</a>
        <ul className="menu menu-horizontal p-0 ml-4">
        <li><Link to="/item-list/set" className="text-lg">Sets</Link></li>
        <li><Link to="/item-list/top" className="text-lg">Tops</Link></li>
        <li><Link to="/item-list/bottom" className="text-lg">Bottom</Link></li>
        </ul>
      </div>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="badge badge-sm indicator-item">1</span>
          </div>
        </div>
        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div className="card-body">
            <span className="font-bold text-lg">8 Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block" onClick={handleViewCart}>View cart</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                初田さん
                <span className="badge">ログイン中</span>
              </a>
            </li>
            <li><Link to="/register" className="text-lg">Sign up</Link></li>
            <li><Link to="/login" className="text-lg">Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)};

export default Navbar;
