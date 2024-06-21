import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import MySelect from "./MySelect";
import { prefecturesOptions } from "../utils/prefectures";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../utils/orderSchema";
import { times } from "../utils/times";
import { useNavigate } from "react-router-dom";

interface OrderfirmForm {
  orderName: string;
  email: string;
  postcode: number;
  prefectures: string;
  municipalities: string;
  address: string;
  telephone: number;
  deliveryDate: Date;
  delivaryTime: string;
  paymentMethod: string;
}

const Order_cconfirm: React.FC = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderfirmForm>({
    mode: "onBlur",
    // resolver: zodResolver(orderSchema),
    
  });
  const [loading, setLoading] = useState(false);
  const [paymentValue, setPaymentValue] = useState("");

  const onSubmit = async (data: OrderfirmForm) => {
    
    // const date = new Date(data.deliveryDate).setHours(Number.parseInt(data.delivaryTime));
    // `deliveryDate` を Date オブジェクトとして作成
    const deliveryDate = new Date(data.deliveryDate);

    // デリバリー時間をセット
    const deliveryHour = Number.parseInt(data.delivaryTime);
                                              
    if (!isNaN(deliveryHour)) {
        deliveryDate.setHours(deliveryHour);
    }

    // 結合したフィールドを含むオブジェクトを作成
    const formData = {
      name: data.orderName,
      email: data.email,
      zipcode: data.postcode,
      prefecture: data.prefectures,
      municipalities: data.municipalities,
      address: data.address,
      telephone: data.telephone,
      deliveryDate: deliveryDate,
      paymentMethodId: data.paymentMethod,
    };
    // console.log(data.prefectures);
    // console.log(data);
    
    console.log(formData);
    //ここにjson送信を入れる
    const response = await axios.post(
      "http://192.168.16.175:8080/ec-202404c/confirm",
      formData
    );
    console.log("rsponse" + response);
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
        setValue("prefectures", result.address1);
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
        <input type="text" id="orderName" {...register("orderName")}></input>
        <br />
        <p>{errors.orderName && errors.orderName?.message}</p>
        <br />

        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" {...register("email")}></input>
        <p>{errors.email && errors.email?.message}</p>
        <br />

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
          name="prefectures"
          control={control}
          render={({ field }) => (
            <MySelect
              value={field.value}
              onChange={field.onChange}
              options={prefecturesOptions}
            />
          )}
        />
        <p>{errors.prefectures && errors.prefectures?.message}</p>
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
          name="delivaryTime"
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
        <p>{errors.delivaryTime && errors.delivaryTime?.message}</p>
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
    </div>
  );
};

export default Order_cconfirm;
