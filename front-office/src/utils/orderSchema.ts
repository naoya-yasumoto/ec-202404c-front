import { coerce, z } from "zod";
import { phoneRegex } from "./phoneRegex";

export const orderSchema = z.object({
  
  orderName: z.string().min(1,{message: "お名前は必須です"}),
  email: z.string().min(1,{message: "メールアドレスは必須です"}).email({message: "正しいメールアドレスを入力してください"}),
  postcode: z.coerce.number().min(1,{message: "郵便番号は必須です"}),
  municipalitie: z.string().min(1,{message: "市区町村は必須です"}),
  address: z.string().min(1,{message: "住所は必須です"}),
  telephone: z.string().min(1,{message: "電話番号は必須です"}).regex(phoneRegex,{message: "正しい形式で入力してください"}),
  deliveryDate: z.string().min(1,{message: "配達日を指定してください"}),

});


