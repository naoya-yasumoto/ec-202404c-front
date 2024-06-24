import { z } from "zod";

const phoneRegex = /^0\d{9,10}$/;

export const validationSchema = z.object({
  firstName: z.string().min(1,{message: "性は必須です"}),
  lastName: z.string().min(1,{message: "名は必須です"}),
  email: z.string().min(1,{message: "メールアドレスは必須です"}).email({message: "正しいメールアドレスを入力してください"}),
  password: z.string().min(1,{message: "パスワードは必須です"}).min(8,{message: "パスワードは8文字以上で入力してください"}),
  postcode: z.coerce.number().min(1,{message: "郵便番号は必須です"}),
  prefecture: z.string().nonempty({ message: "都道府県を選択してください" }),
  municipalities: z.string().min(1, { message: "市区町村は必須です" }),
  address: z.string().min(1,{message: "住所は必須です"}),
  tel: z.string().min(1,{message: "電話番号は必須です"}).regex(phoneRegex,{message: "半角数字で入力してください"}),
});
