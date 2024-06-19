import { z } from "zod";

export const validationSchema = z.object({
  firstName: z.string().min(1,"性は必須です"),
  lastName: z.string().min(1,"名は必須です"),
  email: z.string().min(1,"メールアドレスは必須です").email("正しいメールアドレスを入力してください"),
  password: z.string().min(1,"パスワードは必須です").min(8,"パスワードは8文字以上で入力してください"),
  postcode: z.string().min(1,"郵便番号は必須です"),
  prefectures: z.string().min(1,"都道府県は必須です"),
  municipalities: z.string().min(1,"市区町村は必須です"),
  address: z.string().min(1,"住所は必須です"),
  tel: z.string().min(1,"電話番号は必須です"),
});
