import React from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi'; // BiSearch アイコンをインポート
import { AiOutlineShoppingCart } from 'react-icons/ai'; // AiOutlineShoppingCart アイコンをインポート
import { IoPersonOutline } from 'react-icons/io5'; // IoPersonOutline アイコンをインポート

const Navbar: React.FC = () => (
  <div className="bg-gray-200 shadow-lg py-2">
    <div className="navbar container mx-auto" style={{ width: '80%', height: 'calc(3.25rem * 2.0)' }}>
      <div className="flex-1 flex items-center">
        <a className="text-4xl font-poiret font-semibold">RakuStyle</a>
        <ul className="menu menu-horizontal p-0 ml-8">
          <li>
            <Link to="/item-list/set" className="text-xl font-poiret font-extrabold hover:underline">Sets</Link>
          </li>
          <li>
            <Link to="/item-list/top" className="text-xl font-poiret font-extrabold hover:underline">Tops</Link>
          </li>
          <li>
            <Link to="/item-list/bottom" className="text-xl font-poiret font-extrabold hover:underline">Bottom</Link>
          </li>
        </ul>
      </div>

      {/* 検索フォームの追加 */}
      <div className="flex items-center ml-auto space-x-4">
        <form className="flex gap-3">
          <div className="flex rounded-lg">
            <input
              type="text"
              placeholder="商品名で検索"
              className="w-full md:w-60 px-3 h-10 rounded-l-md border-2 border-gray-600 focus:outline-none focus:border-gray-600"
            />
            <button
              type="submit"
              className="bg-gray-600 text-white rounded-r-md px-2 md:px-3 py-0 md:py-1 flex items-center justify-center"
            >
              <BiSearch className="text-white" />
            </button>
          </div>

          <select
            id="pricingType"
            name="pricingType"
            className="w-24 h-10 border-2 border-gray-600 focus:outline-none focus:border-gray-600 text-black rounded-md px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="All" selected>
              All
            </option>
            <option value="set">set</option>
            <option value="tops">tops</option>
            <option value="bottoms">bottoms</option>
          </select>
        </form>

        {/* カートアイコンとその内容 */}
        <div className="dropdown dropdown-end ml-4">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator flex items-center" style={{ marginLeft: '-3px' }}>
              <AiOutlineShoppingCart className="h-6 w-6 text-black" /> {/* AiOutlineShoppingCart アイコン */}
              <span className="badge badge-sm indicator-item">1</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="bg-gray-600 text-white rounded-md px-2 md:px-3 py-1 md:py-2">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {/* ユーザーアイコンとその内容 */}
        <div className="dropdown dropdown-end ml-4">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="indicator flex items-center">
              <IoPersonOutline className="h-6 w-6 text-black" /> {/* IoPersonOutline アイコン */}
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
);

export default Navbar;
