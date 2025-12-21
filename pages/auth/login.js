import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../services/mutation";
import Image from "next/image";
import logo from "../images/Union (1).svg";
import { LoginFormSchema } from "../schema/LoginFormSchema";
import { setCookie } from "../utils/cooki";
import styles from "../../styles/Login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginFormSchema) });

  const { mutate } = useLogin();

  const onSubmit = (data) => {
    const { username, password } = data;
    mutate(
      { username, password },

      {
        onSuccess: (data) => {
          const token = data?.data?.token;
         if(!token){
          setErrorMessage("توکن دریافت نشد")
          return
         }
         setCookie("token", token)
         router.push("/components/product")
        },
      onError: (error) => {
  if (!error.response) {
    setErrorMessage("ارتباط با سرور برقرار نشد 🌐");
    return;
  }

  switch (error.response.status) {
    case 400:
      setErrorMessage("اطلاعات وارد شده نامعتبر است");
      break;
    case 401:
      setErrorMessage("نام کاربری یا رمز عبور اشتباه است");
      break;
    case 500:
      setErrorMessage("خطای داخلی سرور، کمی صبر کنید 🧑‍🔧");
      break;
    default:
      setErrorMessage("خطای ناشناخته‌ای رخ داد");
  }
}
      }
    );
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="botostartLogo"></Image>
      <h1>فرم ورود</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
          />

          {!!errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password")}
          />
          {!!errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">ورود </button>
        <Link className={styles.regLink} href={"/auth/registration"}>
          ایجاد حساب کاربری!
        </Link>
      </form>
      {errorMessage && (<div className={styles.errorBox}> {errorMessage} </div>)}
    </div>
  );
}
