import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import { RegistrationFormSchema } from "../schema/RegistrationFormSchema";
import { useRegister } from "../services/mutation";

import styles from "../../styles/Registration.module.css";
import logo from "../images/Union (1).svg";

export default function RegistrationPage() {
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistrationFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useRegister();

  const onSubmit = (data) => {
    const { username, password, confirmPassword } = data;

    mutate(
      { username, password, confirmPassword },
      {
        onSuccess: () => {
          router.push("/auth/login");
        },
        onError: (error) => {
          const status = error?.response?.status;
          const message = error?.response?.data?.message;

          if (status === 409) {
            setApiError("این نام کاربری قبلاً ثبت شده است");
          } else if (status === 400) {
            setApiError(message || "اطلاعات وارد شده معتبر نیست");
          } else {
            setApiError("خطای ارتباط با سرور، لطفاً دوباره تلاش کنید");
          }
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="botostartLogo" />
      <h1>فرم ثبت نام</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.regForm}>
        {/* username */}
        <div className={styles.username}>
          <input
            type="text"
            placeholder="نام کاربری"
            className={errors.username ? styles.inputError : ""}
            {...register("username", {
              onChange: () => setApiError(""),
            })}
          />
          {errors.username && (
            <span className={styles.errorText}>
              {errors.username.message}
            </span>
          )}
        </div>

        {/* password */}
        <div>
          <input
            type="password"
            placeholder="رمز عبور"
            className={errors.password ? styles.inputError : ""}
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.errorText}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* confirm password */}
        <div>
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            className={errors.confirmPassword ? styles.inputError : ""}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className={styles.errorText}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button type="submit">ثبت نام</button>

        {apiError && (
          <div className={styles.apiErrorBox}>{apiError}</div>
        )}

        <Link className={styles.regLink} href="/auth/login">
          حساب کاربری دارید؟
        </Link>
      </form>
    </div>
  );
}
