import { z } from "zod";

export const loginSchema = z.object({
  
  email: z.string().min(1,{message: "メールアドレスは必須です"}).email({message: "正しいメールアドレスを入力してください"}),
  password: z.string().min(1,{message: "パスワードは必須です"}).min(8,{message: "パスワードは8文字以上で入力してください"}),
  
});