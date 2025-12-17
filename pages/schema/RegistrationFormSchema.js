
import * as yup from "yup"

export const RegistrationFormSchema = yup
  .object({
    username: yup.string().required("نام کاربری را وارد کنید"),
    password: yup.string().required("رمز عبور را وارد کنید").min(4, "حداقل باید 4 کاراکتر باشد").max(20, "حداکثر باید 20 کاراکتر باشد"),
    confirmPassword: yup.string().required().oneOf([yup.ref("password"), null], "رمز عبور و تکرارش باید یکسان باشند")
  })
  .required()