import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../utils/loginSchema';
<<<<<<< HEAD
import { Navigate, useNavigate } from 'react-router-dom';
import { HOST_IP } from '../config';
=======
<<<<<<<< HEAD:front-office/src/components/Login.tsx
import { HOST_IP } from '../config';
========
import { Navigate, useNavigate } from 'react-router-dom';
>>>>>>>> b0398f170a31e679ff1715f8a06db38b783213e9:front-office/src/component/Login.tsx
>>>>>>> b0398f170a31e679ff1715f8a06db38b783213e9

interface SignUpForm {
    
    email: string,
    password: string,
    postcode: number
  }

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } 
    = useForm<SignUpForm>({mode:"onBlur", resolver: zodResolver(loginSchema)});
  
    const navigate = useNavigate();

  const onSubmit = async (data: SignUpForm) => {
    

    // 結合したフィールドを含むオブジェクトを作成
    const formData = {
      email: data.email,
      password: data.password,
      
      
      
    };
    console.log(formData);
    //ここにjson送信を入れる
<<<<<<< HEAD
    //const response = await axios.post('http://192.168.16.175:8080/ec-202404c/auth/login', formData);
    const response = await axios.post(`http://${HOST_IP}:8080/ec-202404c/auth/login`, formData);
=======
<<<<<<<< HEAD:front-office/src/components/Login.tsx
    const response = await axios.post(`http://${HOST_IP}:8080/ec-202404c/auth/login`, formData);
========
    const response = await axios.post('http://192.168.16.175:8080/ec-202404c/auth/login', formData);
>>>>>>> b0398f170a31e679ff1715f8a06db38b783213e9
    // 成功
    if(response.status === 200){
      navigate('/item-list/set');
    }else{
      <p>エラーが発生しました！</p>
    }
<<<<<<< HEAD
   
=======
>>>>>>>> b0398f170a31e679ff1715f8a06db38b783213e9:front-office/src/component/Login.tsx
>>>>>>> b0398f170a31e679ff1715f8a06db38b783213e9
    console.log(response);
    
  };
  
  

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
        

        <button type='submit'>登録</button><button type='reset'>キャンセル</button>
      </form>
      
    </div>
  )
};

export default Login;
