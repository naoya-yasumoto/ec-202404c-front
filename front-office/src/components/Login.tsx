import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { HOST_IP } from "../config";

interface SignUpForm {
  email: string;
  password: string;
  postcode: number;
}

interface LoginProps {
  setUsername: React.Dispatch<React.SetStateAction<any>>;
}

const Login: React.FC<LoginProps> = ({ setUsername }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpForm) => {
    // 結合したフィールドを含むオブジェクトを作成
    const formData = {
      email: data.email,
      password: data.password,
    };

    //ここにjson送信を入れる
    //const response = await axios.post('http://192.168.16.175:8080/ec-202404c/auth/login', formData);
    const response = await axios.post(
      `http://${HOST_IP}:8080/ec-202404c/auth/login`,
      formData
    );
    console.log(response)
    // 成功
    if (response.status === 200) {
      navigate("/item-list");
    } else {
      <p>エラーが発生しました！</p>;
    }

    console.dir("response:" + JSON.stringify(response));
    const accessToken = response.headers["access-token"];

    // アクセストークンをセッションストレージに格納
    window.sessionStorage.setItem("accessToken", accessToken);
    const token = window.sessionStorage.getItem("accessToken");

    if (token) {
      // デコードしてユーザー名を取得
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const username = tokenPayload.username;
      const userid = tokenPayload.userid;
      setUsername(tokenPayload.username);
      // 必要に応じて username を使用する
    }

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
    //sample
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full sm:w-4/5 lg:w-3/5 mt-20 mb-20">
        <div className="mx-2 my-20 sm:my-auto">
          <div className="flex justify-center">
            <div className="w-full sm:w-11/12 p-12 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
              <h2 className="text-center  font-semibold text-3xl lg:text-4xl text-gray-800 mt-6 mb-6">
                Login
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
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

                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                >
                  ログイン
                </button>
                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                  <a href="#" className="flex-2 underline">
                    Forgot password? 
                  </a>
                  <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                    or
                  </p>
                  <Link to="/register" className="flex-2 underline">
                    Create an Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
