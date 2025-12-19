import styles from "../../styles/EditProduct.module.css";
import { useForm } from "react-hook-form";

function EditProduct() {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>ویرایش اطلاعات</h1>
        <div className={styles.form}>

          <form>
          <div>
            <label>نام کالا</label>
            <input placeholder="تیشرت"></input>
          </div>
          <div>
            <label>تعداد موجودی</label>
            <input placeholder="22"></input>
          </div>
          <div>
            <label>قیمت</label>
            <input placeholder="90,000"></input>
          </div>
          <div className={styles.btn}>
            <div id={styles.btn}>
              <button>ثبت اطلاعات جدید</button> 
            </div>
           <div>
            <button>انصراف</button>
           </div>
            
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
}

export default EditProduct;
