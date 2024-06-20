import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import MySelect from './MySelect';
import { prefecturesOptions } from '../utils/prefectures';
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from '../utils/validationSchema';

interface SignUpForm {
    
    email: string,
    password: string,
    postcode: number
  }

const Register2: React.FC = () => {
    const { register, handleSubmit, control, setValue, watch, formState: { errors } } 
    = useForm<SignUpForm>({mode:"onBlur", resolver: zodResolver(validationSchema)});
  const [loading, setLoading] = useState(false);
  

  const onSubmit = async (data: SignUpForm) => {
    

    // 結合したフィールドを含むオブジェクトを作成
    const formData = {
      email: data.email,
      password: data.password,
      zipcode: data.postcode,
      
      
    };
    console.log(formData);
    //ここにjson送信を入れる
    const response = await axios.post('http://192.168.16.175:8080/ec-202404c/users/register', formData);
    console.log(response);
  };
  
  // const fetchAddress = async (postcode: number) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postcode}`);
  //     const data = response.data;

  //     if (data.results) {
  //       const result = data.results[0];
  //       setValue('prefectures', result.address1);
  //       setValue('municipalities', result.address2);
  //       setValue('address', result.address3);
  //     } else {
  //       alert('住所が見つかりませんでした。');
  //     }
  //   } catch (error) {
  //     console.error('住所の取得に失敗しました:', error);
  //     alert('住所の取得に失敗しました。');
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="form-container">
      <h1>登録フォーム</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        


        <label htmlFor='email'>メールアドレス</label>
        <input type='email' id='email' {...register("email")}></input>
        <p>{errors.email && errors.email?.message}</p><br />
        
        <label htmlFor='password'>パスワード</label>
        <input type='password' id='password' {...register("password")}></input>
        <p>{errors.password && errors.password?.message}</p><br />

        <label htmlFor='postcode'>郵便番号</label>
           <p>{errors.postcode && errors.postcode?.message}</p><br />

        
        

        <button type='submit'>登録</button><button type='reset'>キャンセル</button>
      </form>
      
    </div>
  )
};

export default Register2;
