import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import MySelect from "./MySelect";
import { prefecturesOptions } from "../utils/prefectures";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../utils/validationSchema";
import { orderSchema } from "../utils/orderSchema";
import { useNavigate } from "react-router-dom";
import { HOST_IP } from '../config';
import { times } from "../utils/times";
import { getAccessToken, decodeToken, isLoggedIn } from '../utils/authUtils';
import LoginModal from '../components/LoginModal';  

interface OrderConfirmForm {
  orderId: number;
  userId: number;
  destinationName: string;
  destinationEmail: string;
  postcode: string;
  prefecture: string;
  municipalities: string;
  address: string;
  telephone: string;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: string;
}

const OrderConfirm: React.FC = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderConfirmForm>({
    mode: "onBlur",
    // resolver: zodResolver(orderSchema),
  });
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setShowModal(true);
          return;
        }

        const userInfo = decodeToken(token);
        if (!userInfo) {
          setShowModal(true);
          return;
        }
        const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/cart/user/${userInfo.userid}`);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchOrder();
  }, []);

  const onSubmit = async (data: OrderConfirmForm) => {
    
    // `deliveryDate` を Date オブジェクトとして作成
    const deliveryDate = new Date(data.deliveryDate);

    // デリバリー時間をセット
    const deliveryHour = Number.parseInt(data.deliveryDate);
                                              
    if (!isNaN(deliveryHour)) {
        deliveryDate.setHours(deliveryHour);
    }

    // 結合したフィールドを含むオブジェクトを作成
    const formData = {
      orderId: order.id,
      userId: 2,
      destinationName: data.destinationName,
      destinationEmail: data.destinationEmail,
      zipcode: data.postcode,
      prefecture: data.prefecture,
      municipalities: data.municipalities,
      address: data.address,
      telephone: data.telephone,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryHour,
      paymentMethodId: data.paymentMethod,
    };
    //ここにjson送信を入れる
    const response = await axios.post(
      `http://${HOST_IP}:8080/ec-202404c/order`,
      formData
    );
    console.log(response);
  };

  const fetchAddress = async (postcode: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postcode}`
      );
      const data = response.data;

      if (data.results) {
        const result = data.results[0];
        setValue("prefecture", result.address1);
        setValue("municipalities", result.address2);
        setValue("address", result.address3);
      } else {
        alert("住所が見つかりませんでした。");
      }
    } catch (error) {
      console.error("住所の取得に失敗しました:", error);
      alert("住所の取得に失敗しました。");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h1>注文確認画面</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="orderName">お名前</label>
        <input type="text" id="destinationName" {...register("destinationName")} />
        <p>{errors.destinationName && errors.destinationName.message}</p>

        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="destinationEmail" {...register("destinationEmail")} />
        <p>{errors.destinationEmail && errors.destinationEmail.message}</p>

        <label htmlFor="postcode">郵便番号</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="number" id="postcode" {...register("postcode")} />
          <button
            type="button"
            onClick={() => fetchAddress(watch("postcode"))}
            disabled={loading}
          >
            {loading ? "取得中..." : "住所取得"}
          </button>
        </div>
        <p>{errors.postcode && errors.postcode?.message}</p>
        <br />

        <label htmlFor="prefectures">都道府県</label>
        <Controller
          name="prefecture"
          control={control}
          render={({ field }) => (
            <MySelect
              value={field.value}
              onChange={field.onChange}
              options={prefecturesOptions}
            />
          )}
        />
        <p>{errors.prefecture && errors.prefecture.message}</p>
        <br />

        <label htmlFor="municipalities">市区町村</label>
        <input
          type="text"
          id="municipalities"
          {...register("municipalities")}
        ></input>
        <p>{errors.municipalities && errors.municipalities?.message}</p>
        <br />

        <label htmlFor="address">住所</label>
        <input type="text" id="address" {...register("address")}></input>
        <p>{errors.address && errors.address?.message}</p>
        <br />

        <label htmlFor="tel">電話番号</label>
        <input
          type="tel"
          id="tel"
          inputMode="numeric"
          {...register("telephone")}
          maxLength={11}
        ></input>
        <p>{errors.telephone && errors.telephone?.message}</p>
        <br />

        <label htmlFor="deliveryDate">配達日時</label>

        <input
          type="date"
          id="deliveryDate"
          {...register("deliveryDate")}
        ></input>
        <br />
        <br />

        {/* selectに変更 */}
        <Controller
          name="deliveryTime"
          control={control}
          render={({ field }) => (
            <MySelect
              value={field.value}
              onChange={field.onChange}
              options={times}
            />
          )}
        />

        <p>{errors.deliveryDate && errors.deliveryDate?.message}</p>
        <br />
        <p>{errors.deliveryTime && errors.deliveryTime.message}</p>
        <br />

        {/* ラジオボタンのまま */}
        <label>お支払方法</label>
        <div>
        <Controller
          name="paymentMethod"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>

            {/* クレジット支払い */}
              <div>
                <input
                  type="radio"
                  {...field}
                  value="2"
                  id="answer_visa"
                />
                <label htmlFor="answer_visa">
                  <div>
                    <img src="/images/payment-icons/visa.svg" alt="VISA" />
                    <div>
                      Card Ending <span> 6475</span>
                    </div>
                  </div>
                </label>
              </div>
              
            {/* 代金引換 */}
              <div>
                <input
                  type="radio"
                  {...field}
                  value="1"
                  id="answer_paypal"
                />
                <label htmlFor="answer_paypal">
                  <div>
                    <img src="/images/payment-icons/paypal.svg" alt="PayPal" />
                    <div>代金引換</div>
                  </div>
                </label>
              </div>
            </>
          )}
        />
      </div>

        <button type="submit">登録</button>
        <button type="reset">キャンセル</button>
      </form>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default OrderConfirm;
