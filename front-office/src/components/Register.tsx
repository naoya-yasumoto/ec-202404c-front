import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import MySelect from "./MySelect";
import { prefecturesOptions } from "../utils/prefectures";
import { HOST_IP } from "../config";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  postcode: string;
  prefecture: string;
  municipalities: string;
  address: string;
  tel: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<SignUpForm>({
    mode: "onBlur",
    resolver: zodResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpForm) => {
    const combinedName = `${data.lastName} ${data.firstName}`;

<<<<<<< HEAD
=======
    // Create form data object with combined fields
>>>>>>> origin/feature/creditCardInfo
    const formData = {
      name: combinedName,
      email: data.email,
      password: data.password,
      zipcode: data.postcode,
      prefecture: data.prefecture,
      municipalities: data.municipalities,
      address: data.address,
      telephone: data.tel,
    };
<<<<<<< HEAD

    console.log(formData);

    try {
      const response = await axios.post(`http://${HOST_IP}:8080/ec-202404c/users/register`, formData);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        alert("そのメールアドレスはすでに使われています。");
      } else if (error.response && error.response.status >= 500) {
        console.error('サーバーエラー:', error);
      } else {
        console.error('An error occurred:', error);
=======
    console.log(formData);

    try {
      const response = await axios.post(
        `http://${HOST_IP}:8080/ec-202404c/users/register`,
        formData
      );
      if (response.status === 201) {
        navigate("/login");
      }
      console.log("Employee data:", response.data);
    } catch (error: any) {
      console.error("An error occurred:", error);
      if (error.response && error.response.status >= 500) {
        console.log("500:", error.response.status);
      } else {
        console.error("An error occurred:", error);
>>>>>>> origin/feature/creditCardInfo
      }
    }
  };

  const fetchAddress = async (postcode: string) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-4/5 lg:w-3/5">
        <div className="mx-2 my-20 sm:my-auto">
          <div className="flex justify-center">
            <div className="w-full sm:w-11/12 p-12 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
              <h2 className="text-center  font-semibold text-3xl lg:text-4xl text-gray-800 mt-6 mb-6" >
                Sign Up
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                  <div className="w-1/2 pr-2">
                    <label
                      htmlFor="lastName"
                      className="block text-xs font-semibold text-gray-600 uppercase mt-4"
                    >
                      姓
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName")}
                      className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    />
                    <p>{errors.lastName && errors.lastName.message}</p>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label
                      htmlFor="firstName"
                      className="block text-xs font-semibold text-gray-600 uppercase mt-4"
                    >
                      名
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName")}
                      className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    />
                    <p>{errors.firstName && errors.firstName.message}</p>
                  </div>
                </div>

                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-600 uppercase mt-4"
                >
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p>{errors.email && errors.email.message}</p>

                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-600 uppercase mt-4"
                >
                  パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p>{errors.password && errors.password.message}</p>

                <label
                  htmlFor="postcode"
                  className="block text-xs font-semibold text-gray-600 uppercase mt-4"
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
                <p>{errors.postcode && errors.postcode.message}</p>

                <label
                  htmlFor="prefectures"
                  className="block text-xs font-semibold text-gray-600 uppercase mt-4"
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

                <label
                  htmlFor="municipalities"
                  className="block text-xs font-semibold text-gray-600 uppercase mt-4"
                >
                  市区町村
                </label>
                <input
                  type="text"
                  id="municipalities"
                  {...register("municipalities")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p>{errors.municipalities && errors.municipalities.message}</p>

                <label
                  htmlFor="address"
                  className="block text-xs font-semibold text-gray-600 uppercase mt-4"
                >
                  住所
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p>{errors.address && errors.address.message}</p>

                <label
                  htmlFor="tel"
                  className="block text-xs font-semibold text-gray-600 uppercase mt-4"
                >
                  電話番号
                </label>
                <input
                  type="tel"
                  id="tel"
                  inputMode="numeric"
                  {...register("tel")}
                  maxLength={11}
                  className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                />
                <p>{errors.tel && errors.tel.message}</p>

                <div className="flex space-x-4 mt-8">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  >
                    登録
                  </button>
                  <button
                    type="reset"
                    className="w-full py-3 bg-gray-300 rounded-sm font-medium text-gray-800 uppercase focus:outline-none hover:bg-gray-400 hover:shadow-none"
                  >
                    キャンセル
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

export default Register;
