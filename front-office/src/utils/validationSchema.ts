import { z } from "zod";

export const validationSchema = z.object({
  firstName: z.string().min(1,{message: "性は必須です"}),
  lastName: z.string().min(1,{message: "名は必須です"}),
  email: z.string().min(1,{message: "メールアドレスは必須です"}).email({message: "正しいメールアドレスを入力してください"}),
  password: z.string().min(1,{message: "パスワードは必須です"}).min(8,{message: "パスワードは8文字以上で入力してください"}),
  postcode: z.coerce.number().min(1,{message: "郵便番号は必須です"}),
  prefectures: z.string().refine(value => {return value !== '---';},{message: "都道府県を選択してください"}).transform(value => (value === '' ? undefined : value)),
  municipalities: z.string().min(1,{message: "市区町村は必須です"}),
  address: z.string().min(1,{message: "住所は必須です"}),
  tel: z.coerce.number().min(1,{message: "電話番号は必須です"}),
});