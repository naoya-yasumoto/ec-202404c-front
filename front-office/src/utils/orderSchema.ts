import { z } from 'zod';

export const orderSchema = z.object({
  destinationName: z.string().min(1,"お名前は必須です"),
  destinationEmail: z.string().min(1,"メールアドレスは必須です").email("有効なメールアドレスを入力してください"),
  postcode: z.string().min(1,"郵便番号は必須です").regex(/^\d{7}$/, "郵便番号は7桁の数字で入力してください"),
  prefecture: z.string().min(1,"都道府県を選択してください"),
  municipalities: z.string().min(1,"市区町村は必須です"),
  address: z.string().min(1,"住所は必須です"),
  telephone: z.string().regex(/^\d{10,11}$/, "電話番号は10桁または11桁の数字で入力してください"),
  deliveryDate: z.string().nonempty("配達日時を選択してください"),
  deliveryTime: z.string().nonempty("配達時間を選択してください"),
  paymentMethod: z.string().nonempty({ message: '' }),
});
