import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../utils/loginSchema';

interface SignUpForm {
    
    email: string,
    password: string,
    postcode: number
  }

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } 
    = useForm<SignUpForm>({mode:"onBlur", resolver: zodResolver(loginSchema)});
  
  

  const onSubmit = async (data: SignUpForm) => {
    

    // 結合したフィールドを含むオブジェクトを作成
    const formData = {
      email: data.email,
      password: data.password,
      
      
      
    };
    console.log(formData);
    //ここにjson送信を入れる
    const response = await axios.post('http://192.168.16.133:8080/ec-202404c/auth/login', formData);
    console.log(response);

    
    console.dir("response:" + JSON.stringify(response));
    // console.dir("access token : " + JSON.stringify(response.headers));
    const accessToken = response.headers["access-token"];
    console.log("access token : " + accessToken);

    // アクセストークンをセッションストレージに格納
    window.sessionStorage.setItem('accessToken', accessToken);
    const token = window.sessionStorage.getItem('accessToken');
  


    ///アクセスが必要なものに記述する
    // セッションストレージに格納したアクセストークンを取得する方法
    //  const token = window.sessionStorage.getItem('accessToken');

    //   // WebAPIから従業員一覧情報を取得する
    //   const response = await axios.get(
    //     `${config.EMP_WEBAPI_URL}/employee/employees`,
    //     {
    //       headers: {
    //         Authorization: "Bearer " + accessToken,
    //       },
    //     }
    //   );
    //   // 取得したJSONデータをコンソールに出力して確認
    //   console.dir("response:" + JSON.stringify(response));



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
