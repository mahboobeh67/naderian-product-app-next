
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLogin } from "../services/mutation"

import { LoginFormSchema } from "../schema/LoginFormSchema"
import { setCookie } from "../utils/cooki"
import styles from "../../styles/Login.module.css"
export default function LoginPage() {
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm({resolver: yupResolver(LoginFormSchema)})

const {mutate} = useLogin()

  const onSubmit = (data) => {
    const {username, password} = data;
    mutate({username, password},

      {
        onSuccess: (data) => {
         
          setCookie("token", data?.data?.token)
          console.log(data)},
      onError : (erroe) => {console.log(erroe)},
    }
      ,
    )
  }




  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>

      <div>

          <input type="text" placeholder="نام کاربری" {...register("username")} />

       {!!errors.username && <span>{errors.username.message}</span>}
      </div>
    <div>

        <input type="password" placeholder="رمز عبور" {...register("password")} />
 {!!errors.password && <span>{errors.password.message}</span>}
    </div>
    

     

      


      <button type="submit" >ورود  </button>
    </form>
  )
}