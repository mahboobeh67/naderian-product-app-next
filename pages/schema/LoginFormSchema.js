import * as yup from "yup"

export const LoginFormSchema = yup
  .object({
    username: yup.string().required("نام کاربری را وارد کنید"),
    password: yup.string().required("رمز عبور را وارد کنید").min(4, "حداقل باید 4 کاراکتر باشد").max(20, "حداکثر باید 20 کاراکتر باشد"),
   
  })
  .required()