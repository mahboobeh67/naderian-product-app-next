
import * as yup from "yup"

export const RegistrationFormSchema = yup
  .object({
    username: yup.string().required("نام کاربری را وارد کنید"),
    password: yup.string().required("رمز عبور را وارد کنید").min(6, "حداقل باید 6 کاراکتر باشد").max(20, "حداکثر باید 20 کاراکتر باشد").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "رمز عبور باید شامل حرف بزرگ، حرف کوچک، عدد و کاراکتر خاص باشد"
  ),
    confirmPassword: yup.string().required().oneOf([yup.ref("password"), null], "رمز عبور و تکرارش باید یکسان باشند")
  })
  .required()