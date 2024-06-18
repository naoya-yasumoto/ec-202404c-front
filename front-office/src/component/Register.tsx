import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import MySelect from './MySelect';
import {prefecturesOptions} from './MySelect'

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
    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<SignUpForm>({ mode: 'onBlur' });
  const [loading, setLoading] = useState(false);
  

  const onSubmit = (data: SignUpForm) => {
    const combinedName = `${data.lastName} ${data.firstName}`;

    // 結合したフィールドを含むオブジェクトを作成
    const formData = {
      name: combinedName,
      email: data.email,
      password: data.password,
      zipcode: data.postcode,
      prefectures: data.prefectures,
      municipalities: data.municipalities,
      address: data.address,
      tel: data.tel
    };
    console.log(formData);
    //ここにjson送信を入れる

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
        <input type='text' id='lastName' {...register("lastName", {required: "名前は必須です"})}></input>
        <label htmlFor='firstName'>名</label>
        <input type='text' id='firstName' {...register("firstName", {required: "名前は必須です"})}></input><br />
        
        <p>{errors.firstName?.message as React.ReactNode}</p><br />


        <label htmlFor='email'>メールアドレス</label>
        <input type='email' id='email' {...register("email")}></input>
        <p>{errors.email?.message as React.ReactNode}</p><br /> 
        
        <label htmlFor='password'>パスワード</label>
        <input type='password' id='password' {...register("password")}></input>
        <p>{errors.password?.message as React.ReactNode}</p><br />

        <label htmlFor='postcode'>郵便番号</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type='number' id='postcode' {...register("postcode", { required: "郵便番号は必須です" })} />
        <button type="button" onClick={() => fetchAddress(watch('postcode'))} disabled={loading}>
          {loading ? '取得中...' : '住所取得'}
        </button>
      </div>
        <p>{errors.postcode?.message as React.ReactNode}</p><br />

        <label htmlFor='prefectures'>都道府県</label>
        <Controller
        name="prefectures"
        control={control}
        render={({ field }) => (
          <MySelect
            value={field.value}
            onChange={field.onChange}
            options={prefecturesOptions}
            error={errors.prefectures?.message}
          />
        )}
      />
        <p>{errors.prefectures?.message as React.ReactNode}</p><br />

        <label htmlFor='municipalities'>市区町村</label>
        <input type='text' id='municipalities' {...register("municipalities")}></input>
        <p>{errors.municipalities?.message as React.ReactNode}</p><br />

        <label htmlFor='address'>住所</label>
        <input type='text' id='address' {...register("address")}></input>
        <p>{errors.address?.message as React.ReactNode}</p><br />

        <label htmlFor='tel'>電話番号</label>
        <input type='tel' id='tel' inputMode='numeric' {...register("tel")} maxLength={11} ></input>
        <p>{errors.tel?.message as React.ReactNode}</p><br />

        <button type='submit'>登録</button><button type='reset'>キャンセル</button>
      </form>
      
    </div>
  )
};

export default Register;
