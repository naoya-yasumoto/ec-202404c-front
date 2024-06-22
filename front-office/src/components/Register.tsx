import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import MySelect from "./MySelect";
import { prefecturesOptions } from "../utils/prefectures";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from '../utils/validationSchema';
import { HOST_IP } from '../config';
import { useNavigate } from "react-router-dom";


interface SignUpForm {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  postcode: number;
  prefectures: string;
  municipalities: string;
  address: string;
  tel: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onBlur",
    resolver: zodResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data: SignUpForm) => {
    const combinedName = `${data.lastName} ${data.firstName}`;

    const formData = {
      name: combinedName,
      email: data.email,
      password: data.password,
      zipcode: data.postcode,
      prefecture: data.prefectures,
      municipalities: data.municipalities,
      address: data.address,
      telephone: data.tel
    };

    try {
      const response = await axios.post(`http://${HOST_IP}:8080/ec-202404c/users/register`, formData);
      if (response.status === 201) {
        navigate('/login');
      }
      console.log('User data:', response.data);
    } catch (error:any) {
      if (error.response && error.response.status === 409) {
        alert("そのメールアドレスはすでに使われています。");
      } else if (error.response && error.response.status >= 500) {
        console.error('サーバーエラー:', error);
      } else {
        console.error('An error occurred:', error);
      }
    }
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
      <h1>登録フォーム</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="lastName">姓</label>
        <input type="text" id="lastName" {...register("lastName")} />
        <p className="error-message">{errors.lastName && errors.lastName.message}</p>
        <label htmlFor="firstName">名</label>
        <input type="text" id="firstName" {...register("firstName")} />
        <p className="error-message">{errors.firstName && errors.firstName.message}</p>
        <br />

        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" {...register("email")} />
        <p className="error-message">{errors.email && errors.email.message}</p>
        <br />

        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" {...register("password")} />
        <p className="error-message">{errors.password && errors.password.message}</p>
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
        <p className="error-message">{errors.postcode && errors.postcode.message}</p>
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
        <br />

        <label htmlFor="municipalities">市区町村</label>
        <input
          type="text"
          id="municipalities"
          {...register("municipalities")}
        />
        <p className="error-message">{errors.municipalities && errors.municipalities.message}</p>
        <br />

        <label htmlFor="address">住所</label>
        <input type="text" id="address" {...register("address")} />
        <p className="error-message">{errors.address && errors.address.message}</p>
        <br />

        <label htmlFor="tel">電話番号</label>
        <input
          type="tel"
          id="tel"
          inputMode="numeric"
          {...register("tel")}
          maxLength={11}
        ></input>
        <p>{errors.tel && errors.tel?.message}</p>
        <br />

        <button type="submit">登録</button>
        <button type="reset">キャンセル</button>
      </form>
    </div>
  );
};

export default Register;
