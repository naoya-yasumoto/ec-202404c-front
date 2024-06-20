import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import MySelect from './MySelect';
import { prefecturesOptions } from '../utils/prefectures';
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from '../utils/validationSchema';
import { useNavigate } from "react-router-dom";

interface SignUpForm {
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    postcode: number,
    prefectures: string,
    municipalities: string,
    address: string,
    tel: number;
  }

  

const Register: React.FC = () => {
    const { register, handleSubmit, control, setValue, watch, formState: { errors } } 
    = useForm<SignUpForm>({mode:"onBlur", resolver: zodResolver(validationSchema)});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  

  const onSubmit = async (data: SignUpForm) => {
    const combinedName = `${data.lastName} ${data.firstName}`;

    // 結合したフィールドを含むオブジェクトを作成
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
    console.log(formData);
    //ここにjson送信を入れる
    // const response = await axios.post('http://192.168.16.133:8080/ec-202404c/users/register', formData);
    // // 成功
    // console.log("a" + response.status);
    // if(response.status === 200){
    //   navigate('/login');
    // }else{
    //   console.log("b" + response.status);
    //   <p>エラーが発生しました！</p>
    // }
    //console.log(response);

    try {
      const response = await axios.post('http://192.168.16.133:8080/ec-202404c/users/register', formData);
      if(response.status === 200){
          navigate('/login');
         }
      console.log('Employee data:', response.data);
    } catch (error:any) {
      console.log("catch:" + error.response.status);
      if (error.response && error.response.status >= 500) {
        // サーバーエラーの場合
        console.log("500:" + error.response.status);
      } else {
        // その他のエラーの場合は適切な処理を行う
        console.error('An error occurred:', error);
      }
    }
    

  };
  
  const fetchAddress = async (postcode: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postcode}`);
      const data = response.data;

      if (data.results) {
        const result = data.results[0];
        setValue('prefectures', result.address1);
        setValue('municipalities', result.address2);
        setValue('address', result.address3);
      } else {
        alert('住所が見つかりませんでした。');
      }
    } catch (error) {
      console.error('住所の取得に失敗しました:', error);
      alert('住所の取得に失敗しました。');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h1>登録フォーム</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='lastName'>性</label>
        <input type='text' id='lastName' {...register("lastName")}></input>
        <label htmlFor='firstName'>名</label>
        <input type='text' id='firstName' {...register("firstName")}></input><br />
        <p>{errors.lastName && errors.lastName?.message}</p>
        <p>{errors.firstName && errors.firstName?.message}</p><br />


        <label htmlFor='email'>メールアドレス</label>
        <input type='email' id='email' {...register("email")}></input>
        <p>{errors.email && errors.email?.message}</p><br />
        
        <label htmlFor='password'>パスワード</label>
        <input type='password' id='password' {...register("password")}></input>
        <p>{errors.password && errors.password?.message}</p><br />

        <label htmlFor='postcode'>郵便番号</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type='number' id='postcode' {...register("postcode")} />
        <button type="button" onClick={() => fetchAddress(watch('postcode'))} disabled={loading}>
          {loading ? '取得中...' : '住所取得'}
        </button>
      </div>
      <p>{errors.postcode && errors.postcode?.message}</p><br />

        <label htmlFor='prefectures'>都道府県</label>
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
        {/* <p>{errors.prefectures && errors.prefectures?.message}</p> */}
        <br />

        <label htmlFor='municipalities'>市区町村</label>
        <input type='text' id='municipalities' {...register("municipalities")}></input>
        <p>{errors.municipalities && errors.municipalities?.message}</p><br />

        <label htmlFor='address'>住所</label>
        <input type='text' id='address' {...register("address")}></input>
        <p>{errors.address && errors.address?.message}</p><br />

        <label htmlFor='tel'>電話番号</label>
        <input type='tel' id='tel' inputMode='numeric' {...register("tel")} maxLength={11} ></input>
        <p>{errors.tel && errors.tel?.message}</p><br />

        <button type='submit'>登録</button><button type='reset'>キャンセル</button>
      </form>
      
    </div>
  )
};

export default Register;
