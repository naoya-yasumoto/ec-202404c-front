import { z } from 'zod';

export const orderSchema = z.object({
  destinationName: z.string().nonempty("お名前は必須です"),
  destinationEmail: z.string().email("有効なメールアドレスを入力してください"),
  postcode: z.string().regex(/^\d{7}$/, "郵便番号は7桁の数字で入力してください"),
  prefecture: z.string().nonempty("都道府県を選択してください"),
  municipalities: z.string().nonempty("市区町村は必須です"),
  address: z.string().nonempty("住所は必須です"),
  telephone: z.string().regex(/^\d{10,11}$/, "電話番号は10桁または11桁の数字で入力してください"),
  deliveryDate: z.string().nonempty("配達日時を選択してください"),
  deliveryTime: z.string().nonempty("配達時間を選択してください"),
  //paymentMethod: z.string().nonempty("お支払い方法を選択してください"),
});
