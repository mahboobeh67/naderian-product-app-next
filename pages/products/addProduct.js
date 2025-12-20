import { useForm } from "react-hook-form";
import styles from "../../styles/AddProduct.module.css";
import { useAddProductItem } from "../services/mutation";
function AddProduct({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
const addProductMutation = useAddProductItem();
  const onSubmit = (data) => {
    addProductMutation.mutate(data, {
    onSuccess: () => onClose()
  });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>ایجاد محصول جدید</h1>

        <div>
          <label>نام کالا</label>
          <input
            type="text"
            placeholder="نام کالا"
            {...register("title", { required: "نام کالا الزامی است" })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label>تعداد موجودی</label>
          <input
            type="text"
            placeholder="تعداد"
            {...register("quantity", { required: true, min: 1 })}
          />
        </div>

        <div>
          <label>قیمت</label>
          <input
            type="text"
            placeholder="قیمت"
            {...register("price", { required: true })}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className="active" disabled={addProductMutation.isPending}>
            {addProductMutation.isPending ? "در حال ایجاد ..." : "ایجاد"}
          </button>
          <button type="button" className="disable" onClick={onClose}>
            انصراف
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default AddProduct;
