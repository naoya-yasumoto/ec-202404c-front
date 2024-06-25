import { z } from "zod";

const phoneRegex = /^0\d{10,11}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/; // パスワードの形式制限

export const validationSchema = z.object({
  firstName: z.string().min(1,{message: "名は必須です"}),
  lastName: z.string().min(1,{message: "姓は必須です"}),
  email: z.string().min(1,{message: "メールアドレスは必須です"}).email({message: "正しいメールアドレスを入力してください"}),
  password: z.string().min(1,{message: "パスワードは必須です"}).min(8,{message: "パスワードは8文字以上で入力してください"})
  .regex(passwordRegex, { message: "パスワードは半角英字の大文字、小文字、記号をそれぞれ1つ以上含める必要があります" }),
  confirmationPassword: z.string().min(1,{message: "確認用パスワードは必須です"}).min(8,{message: "確認用パスワードは8文字以上で入力してください"}),
  postcode: z.coerce.number().min(1,{message: "郵便番号は必須です"}),
  prefecture: z.string().nonempty({ message: "都道府県を選択してください" }),
  municipalities: z.string().min(1, { message: "市区町村は必須です" }),
  address: z.string().min(1,{message: "住所は必須です"}),
  tel: z.string().min(1,{message: "電話番号は必須です"}).regex(phoneRegex,{message: "正しい形式で入力してください"}),
}).refine(data => data.password === data.confirmationPassword, {
  message: "パスワードと確認用パスワードが不一致です",
  path: ['confirmationPassword'], // エラーメッセージを表示するフィールド
});
