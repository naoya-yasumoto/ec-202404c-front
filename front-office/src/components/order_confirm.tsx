import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import MySelect from "./MySelect";
import { prefecturesOptions } from "../utils/prefectures";
import { times } from "../utils/times";
import { HOST_IP } from "../config";
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

const Order_confirm: React.FC = () => {
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

    console.log(formData);
    //ここにjson送信を入れる
    const response = await axios.post(
      `http://${HOST_IP}192.168.16.175:8080/ec-202404c/confirm`,
      formData
    );
    console.log("rsponse" + response);
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/item-list/set');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full sm:w-4/5 lg:w-3/5 mt-20 mb-20">
        <div className="mx-2 my-20 sm:my-auto">
          <div className="flex justify-center">
            <div className="w-full sm:w-11/12 p-12 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
              <h2 className="text-center  font-semibold text-3xl lg:text-4xl text-gray-800 mt-6 mb-6">
                注文確認画面
              </h2>
              <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                <label
                  htmlFor="orderName"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  お名前
                </label>
                <input
                  type="text"
                  id="orderName"
                  {...register("orderName")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.orderName && errors.orderName.message}
                </p>
                <br />

                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.email && errors.email.message}
                </p>
                <br />

                <label
                  htmlFor="postcode"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  郵便番号
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="postcode"
                    {...register("postcode")}
                    className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => fetchAddress(watch("postcode"))}
                    disabled={loading}
                    className="ml-4 w-48 bg-gray-800 py-3 px-6 rounded-sm text-white uppercase font-medium focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  >
                    {loading ? "取得中..." : "住所取得"}
                  </button>
                </div>
                <p className="text-red-500 text-xs mt-1">
                  {errors.postcode && errors.postcode.message}
                </p>
                <br />

                <label
                  htmlFor="prefectures"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  都道府県
                </label>
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.prefectures && errors.prefectures.message}
                </p>
                <br />

                <label
                  htmlFor="municipalities"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  市区町村
                </label>
                <input
                  type="text"
                  id="municipalities"
                  {...register("municipalities")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.municipalities && errors.municipalities.message}
                </p>
                <br />

                <label
                  htmlFor="address"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  住所
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.address && errors.address.message}
                </p>
                <br />

                <label
                  htmlFor="tel"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  電話番号
                </label>
                <input
                  type="tel"
                  id="tel"
                  inputMode="numeric"
                  {...register("telephone")}
                  maxLength={11}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.telephone && errors.telephone.message}
                </p>
                <br />

                <label
                  htmlFor="deliveryDate"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  配達日時
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  {...register("deliveryDate")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <br />
                <br />

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
                <p className="text-red-500 text-xs mt-1">
                  {errors.deliveryDate && errors.deliveryDate.message}
                </p>
                <p className="text-red-500 text-xs mt-1">
                  {errors.delivaryTime && errors.delivaryTime.message}
                </p>
                <br />

                <label className="block text-xs font-semibold text-gray-600 uppercase">
                  お支払方法
                </label>
                <div>
                  <Controller
                    name="paymentMethod"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <div className="mt-2">
                          <input
                            type="radio"
                            {...field}
                            value="2"
                            id="answer_visa"
                            className="mr-2"
                          />
                          <label
                            htmlFor="answer_visa"
                            className="inline-flex items-center"
                          >
                            <img
                              src="/images/payment-icons/visa.svg"
                              alt="VISA"
                              className="w-8 h-8 mr-2"
                            />
                            <div>
                              Card Ending <span> 6475</span>
                            </div>
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            type="radio"
                            {...field}
                            value="1"
                            id="answer_paypal"
                            className="mr-2"
                          />
                          <label
                            htmlFor="answer_paypal"
                            className="inline-flex items-center"
                          >
                            <img
                              src="/images/payment-icons/paypal.svg"
                              alt="PayPal"
                              className="w-8 h-8 mr-2"
                            />
                            <div>代金引換</div>
                          </label>
                        </div>
                      </>
                    )}
                  />
                </div>
                <br />

                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gray-800 text-white rounded-sm focus:outline-none hover:bg-gray-700"
                  >
                    登録
                  </button>
                  <button
                    type="reset"
                    className="px-6 py-2 bg-gray-500 text-white rounded-sm focus:outline-none hover:bg-gray-400"
                    onClick={handleBackClick}
                  >
                    トップ戻る
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_confirm;
