import styles from "../../styles/EditProduct.module.css";
import { useForm } from "react-hook-form";
import { useUpdateProduct } from "../services/mutation";
function EditProduct({product, onClose}) {
  const {register, handleSubmit} = useForm({defaultValues:{
    title:product.title,
    quantity:product.quantity,
    price: product.price
  }})

  const {mutate, isPending} = useUpdateProduct()
  const onSubmit = (data) =>{
   mutate({id: product.id , data,},{onSuccess : () =>{onClose()}})
    
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>ویرایش اطلاعات</h1>
        <div className={styles.form}>

          <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>نام کالا</label>
<input {...register("title")}/>
          </div>
          <div>
            <label>تعداد موجودی</label>
           <input {...register("quantity")}/>
          </div>
          <div>
            <label>قیمت</label>
           <input {...register("price")}/>
          </div>
          <div className={styles.btn}>
            <div id={styles.btn}>
              <button type="submit" disabled={isPending}>{isPending ?"در حال ذخیره..." :"ثبت اطلاعات جدید"}</button> 
            </div>
           <div>
            <button type="button" onClick={onClose} disabled={isPending}>انصراف</button>
           </div>
            
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
}

export default EditProduct;
