import { z } from "zod";

export const validationSchema = z.object({
  firstName: z.string().nonempty("性は必須です"),
  lastName: z.string().nonempty("名は必須です"),
  email: z.string().nonempty("メールアドレスは必須です").email("正しいメールアドレスを入力してください"),
  password: z.string().nonempty("パスワードは必須です").min(8,"パスワードは8文字以上で入力してください"),
  postcode: z.string().nonempty("郵便番号は必須です"),
  prefectures: z.string().nonempty("都道府県は必須です"),
  municipalities: z.string().nonempty("市区町村は必須です"),
  address: z.string().nonempty("住所は必須です"),
  tel: z.string().nonempty("電話番号は必須です"),

});
