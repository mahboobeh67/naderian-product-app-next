import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../services/mutation";
import Image from "next/image";
import logo from "../images/Union (1).svg";
import { LoginFormSchema } from "../schema/LoginFormSchema";
import { setCookie } from "../utils/cooki";
import styles from "../../styles/Login.module.css";
import Link from "next/link";
export default function LoginPage() {
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
          setCookie("token", data?.data?.token);
          console.log(data);
        },
        onError: (erroe) => {
          console.log(erroe);
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <Image src={logo}></Image>
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
    </div>
  );
}
