import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import LoginModal from "../LoginModal"; // モーダルコンポーネントのインポート
import { getAccessToken, decodeToken, isLoggedIn } from "../../utils/authUtils";
import { getCartInfo } from "../../pages/Cart";
import { HOST_IP } from "../../config";
import Price from "../Price";

interface NavbarProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<any>>;
}

const Navbar: React.FC<NavbarProps> = ({ username, setUsername }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  // const [username, setUsername] = useState('ゲストさん');
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("All"); // 初期値はAll
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      const token = getAccessToken();
      if (token) {
        const userInfo = decodeToken(token);
        if (userInfo) {
          setUsername(userInfo.username);
          setLoginStatus(true);
          console.log(userInfo.username);
          getCartInfo(userInfo.userid).then((cartItems) => {
            const itemCount = cartItems.length;
            const subtotal = cartItems.reduce(
              (total, item) => total + item.item.price * item.quantity * 1.1,
              0
            );
            setCartItemsCount(itemCount);
            setCartSubtotal(subtotal);
          });
        }
      }
    }
  }, [username]);

  const handleViewCart = () => {
    if (isLoggedIn()) {
      navigate("/cart");
    } else {
      setShowModal(true);
    }
  };

  const handleLogout = async () => {
    try {
      const token = getAccessToken();
      if (token) {
        await axios.post(
          `http://${HOST_IP}:8080/ec-202404c/auth/signout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.sessionStorage.removeItem("accessToken");
        setUsername("ゲストさん");
        setLoginStatus(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // console.log(`/item-list/${searchType.toLowerCase()}?q=${encodeURIComponent(searchQuery)}`)
    if (searchType.toLowerCase() === "all") {
      navigate(`/item-list?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(
        `/item-list/${searchType.toLowerCase()}?q=${encodeURIComponent(
          searchQuery
        )}`
      );
    }
  };

  return (
    <div className="bg-gray-200 shadow-lg py-2">
      <div
        className="navbar container mx-auto"
        style={{ width: "80%", height: "calc(3.25rem * 2.0)" }}
      >
        <div className="flex-1 flex items-center">
          <Link to="/item-list" className="text-4xl font-poiret font-semibold" title="一覧画面に遷移">RakuStyle</Link>
          <ul className="menu menu-horizontal p-0 ml-8">
            <li>
              <Link
                to="/item-list/set"
                className="text-xl font-poiret font-extrabold hover:underline"
              >
                Sets
              </Link>
            </li>
            <li>
              <Link
                to="/item-list/top"
                className="text-xl font-poiret font-extrabold hover:underline"
              >
                Tops
              </Link>
            </li>
            <li>
              <Link
                to="/item-list/bottom"
                className="text-xl font-poiret font-extrabold hover:underline"
              >
                Bottoms
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center ml-auto space-x-4">
          <form className="flex gap-3" onSubmit={handleSubmit}>
            <div className="flex rounded-lg">
              <input
                type="text"
                placeholder="商品名で検索"
                className="w-full md:w-60 px-3 h-10 rounded-l-md border-2 border-gray-600 focus:outline-none focus:border-gray-600"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gray-600 text-white rounded-r-md px-2 md:px-3 py-0 md:py-1 flex items-center justify-center hover:bg-gray-700"
              >
                <BiSearch className="text-white" />
              </button>
            </div>

            <select
              id="pricingType"
              name="pricingType"
              className="w-24 h-10 border-2 border-gray-600 focus:outline-none focus:border-gray-600 text-black rounded-md px-2 md:px-3 py-0 md:py-1 tracking-wider"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="All" selected>
                All
              </option>
              <option value="set">sets</option>
              <option value="top">tops</option>
              <option value="bottom">bottoms</option>
            </select>
          </form>

          <div className="dropdown dropdown-end ml-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div
                className="indicator flex items-center"
                style={{ marginLeft: "-3px" }}
              >
                <AiOutlineShoppingCart className="h-6 w-6 text-black" />
                <span className="badge badge-sm indicator-item">
                  {cartItemsCount}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cartItemsCount} <span className='text-sm'>点</span>
                </span>
                <span className="text-info">
                  合計金額(税込) <Price amount={cartSubtotal.toFixed(2)} />
                </span>
                <div className="card-actions">
                  <button
                    className="bg-gray-600 text-white rounded-md px-2 md:px-3 py-1 md:py-2 hover:bg-gray-800"
                    onClick={handleViewCart}
                  >
                    カートを見る
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown dropdown-end ml-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="indicator flex items-center">
                <IoPersonOutline className="h-6 w-6 text-black" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  {username}さん
                  {loginStatus && <span className="badge">ログイン中</span>}
                </a>
              </li>
              {!loginStatus ? (
                <>
                  <li>
                    <Link to="/register" className="text-lg">
                      新規登録
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="text-lg">
                      ログイン
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <a onClick={handleLogout} className="text-lg cursor -pointer">
                    ログアウト
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Navbar;
