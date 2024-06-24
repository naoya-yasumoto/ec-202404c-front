import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HOST_IP } from '../config';
import { addItemSchema } from '../utils/addItemSchema';
import { getAccessToken, decodeToken } from '../utils/authUtils';
import LoginModal from '../components/LoginModal';
import Toast from '../components/ToCartToast';
import { z } from 'zod';
import Footer from '../components/layout/Footer';
import Price from '../components/Price';


interface Item {
  bottomId: number;
  description: string;
  id: number;
  imagePath: string;
  itemType: string;
  name: string;
  price: number;
  topId: number;
}

interface AddCartRequest {
  itemId: number;
  userId: number;
  size: string;
  quantity: number;
  price: number;
  color: string;  // 追加
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("gray-800");


  const navigate = useNavigate();

  type ItemFormData = z.infer<typeof addItemSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(addItemSchema),
  });

  const watchedQuantity = watch("quantity", 1);

  useEffect(() => {
    const getItemAsync = async () => {
      const response = await axios.get(
        `http://${HOST_IP}:8080/ec-202404c/item/${id}`
      );
      setItem(response.data);
      setTotalPrice(response.data.price); // Initialize with default price
    };
    getItemAsync();
  }, [id]);

  useEffect(() => {
    if (item) {
      const quantity = Number(watchedQuantity);
      setTotalPrice(item.price * quantity);
    }
  }, [watchedQuantity, item]);

  // 色の変更ハンドラ
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const onSubmit = async (data: ItemFormData) => {
    if (!item) return;

    const token = getAccessToken();
    if (!token) {
      setShowModal(true);
      return;
    }

    const formatNumberWithCommas = (number: number) => {
      return new Intl.NumberFormat('ja-JP').format(number);
    };

    const userInfo = decodeToken(token);
    if (!userInfo) {
      setShowModal(true);
      return;
    }

    const cartItem: AddCartRequest = {
      itemId: item.id,
      userId: userInfo.userid,
      quantity: data.quantity,
      size: data.size,
      price: totalPrice,
      color: selectedColor,  // 追加
    };
    try {
      const response = await axios.post(`http://${HOST_IP}:8080/ec-202404c/cart/add`, cartItem);
      if (response.status === 200) {
        setShowToast(true);
      }
    } catch (error: any) {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        navigate("/login");
      }
      console.error("There was an error adding the item to the cart!", error);
    }
  };

  if (item === null) {
    return null;
  }

  return (
    <>
      <div style={{display:'flex', justifyContent:'center', marginTop:'1.5rem'}}>
        <div className="bg-white py-6 sm:py-8 lg:py-12" style={{ width: '80%', marginLeft:'13.5rem'}}>
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="grid gap-4 lg:grid-cols-5">
                <div className="order-last flex gap-4 lg:order-none lg:flex-col">
                  <div className="overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src="https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250"
                      loading="lazy"
                      alt="Photo by Himanshu Dewangan"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src="https://images.unsplash.com/flagged/photo-1571366992968-15b65708ee76?auto=format&q=75&fit=crop&w=250"
                      loading="lazy"
                      alt="Photo by Himanshu Dewangan"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src="https://images.unsplash.com/flagged/photo-1571366992999-47669b775ef6?auto=format&q=75&fit=crop&w=250"
                      loading="lazy"
                      alt="Photo by Himanshu Dewangan"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
                  <img
                    src={`http://${HOST_IP}:9090/img/${item.imagePath}`}
                    loading="lazy"
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                  <a
                    href="#"
                    className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="md:py-8">
                <div className="mb-2 md:mb-3">

                  <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl" style={{ marginTop: '4px' }}>
                    {item.name}
                  </h2>
                </div>

                <div className="mb-4 md:mb-6">
                  <span className="mb-3 inline-block text-sm font-semibold text-gray-600 md:text-base">
                    値段
                  </span>
                  <Price amount={item.price.toFixed(0)} />
                </div>


                <div className="mb-8 md:mb-10">
                  <span className="mb-3 inline-block text-sm font-semibold text-gray-600 md:text-base">
                    Size
                  </span>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <div>
                        <input
                          type="radio"
                          id="size-s"
                          value="S"
                          {...register("size")}
                          className="peer hidden"
                        />
                        <label
                          htmlFor="size-s"
                          className="flex h-8 w-12 cursor-pointer items-center justify-center rounded-lg border bg-white text-center text-sm font-semibold text-gray-500 ring-2 ring-transparent transition duration-100 peer-checked:bg-gray-800 peer-checked:text-white peer-checked:ring-gray-800 hover:bg-gray-100 md:h-10 md:w-14"
                        >
                          S
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="size-m"
                          value="M"
                          {...register("size")}
                          defaultChecked
                          className="peer hidden"
                        />
                        <label
                          htmlFor="size-m"
                          className="flex h-8 w-12 cursor-pointer items-center justify-center rounded-lg border bg-white text-center text-sm font-semibold text-gray-500 ring-2 ring-transparent transition duration-100 peer-checked:bg-gray-800 peer-checked:text-white peer-checked:ring-gray-800 hover:bg-gray-100 md:h-10 md:w-14"
                        >
                          M
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="size-l"
                          value="L"
                          {...register("size")}
                          className="peer hidden"
                        />
                        <label
                          htmlFor="size-l"
                          className="flex h-8 w-12 cursor-pointer items-center justify-center rounded-lg border bg-white text-center text-sm font-semibold text-gray-500 ring-2 ring-transparent transition duration-100 peer-checked:bg-gray-800 peer-checked:text-white peer-checked:ring-gray-800 hover:bg-gray-100 md:h-10 md:w-14"
                        >
                          L
                        </label>
                      </div>
                    </div>

                    <div style={{ marginRight: '20rem' }}>
                      <label htmlFor="quantity" className='font-semibold text-gray-600'>数量</label>
                      <input
                        id="quantity"
                        type="number"
                        {...register("quantity")}
                        defaultValue={1}
                        min={1}
                        className="block w-full rounded-lg border border-gray-300 px-4 py-2"
                      />
                    </div>

                    <div className="relative w-28 h-10 bg-gray-800 text-white text-center rounded-md font-arial transition-colors duration-300 group overflow-hidden border border-transparent">
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
                        <div className="text-sm">カートに追加</div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                        <span className="icon">
                          <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                          </svg>
                        </span>
                      </div>
                      {/* グレーボーダーの要素 */}
                      <div className="absolute inset-0 rounded-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* ボタン要素 */}
                      <button type="submit" className="absolute inset-0 w-full h-full bg-transparent"></button>
                    </div>



                    <div>
                      <p><span className='font-semibold text-gray-600'>合計金額(税抜き)</span>
                        <Price amount={totalPrice.toFixed(0)} />
                      </p>
                    </div>
                  </form>
                </div>

                <div className="mt-10 md:mt-16 lg:mt-20">
                  <div className="mb-3 text-lg font-semibold text-gray-800">
                    商品詳細
                  </div>

                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
          <LoginModal show={showModal} onClose={() => setShowModal(false)} />
          <Toast show={showToast} message="カートに追加しました" onClose={() => setShowToast(false)} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemDetail;
