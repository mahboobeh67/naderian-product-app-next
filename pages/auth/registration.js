
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegistrationFormSchema } from "../schema/RegistrationFormSchema"
import { useRegister } from "../services/mutation"

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm({resolver: yupResolver(RegistrationFormSchema)})

const {mutate} = useRegister()

  const onSubmit = (data) => {
    const {username, password} = data;
    mutate({username, password},

      {
        onSuccess: (data) => {
          navigate("/login")
          console.log(data)},
      onError : (erroe) => {console.log(erroe)},
    }
      ,
    )
  }




  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>

          <input type="text" placeholder="نام کاربری" {...register("username")} />

       {!!errors.username && <span>{errors.username.message}</span>}
      </div>
    <div>

        <input type="password" placeholder="رمز عبور" {...register("password")} />
 {!!errors.password && <span>{errors.password.message}</span>}
    </div>
    
<div>

   <input type="password" placeholder="تکرار رمز عبور"{...register("confirmPassword")} />
 {!!errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
</div>
     

      


      <button type="submit" >ثبت نام </button>
      <style jsx>{`
      form{
        background-color: red;
      }
      `}</style>
    </form>
  )
}