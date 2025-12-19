import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { RegistrationFormSchema } from "../schema/RegistrationFormSchema";
import { useRegister } from "../services/mutation";
import styles from "../../styles/Registration.module.css";
import logo from "../images/Union (1).svg";
export default function RegistrationPage() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(RegistrationFormSchema) });

  const { mutate } = useRegister();

  const onSubmit = (data) => {
    const { username, password } = data;
    mutate(
      { username, password },

      {
        onSuccess: (data) => {
          navigate("/login");
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
      <Image src={logo} />
      <h1>فرم ثبت نام</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.regForm}>
        <div className={styles.username}>
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

        <div>
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("confirmPassword")}
          />
          {!!errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit">ثبت نام </button>
        <Link className={styles.regLink} href={"/auth/login"}>
          حساب کاربری دارید؟
        </Link>
      </form>
    </div>
  );
}
