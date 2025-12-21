import Image from "next/image"
import styles from "../../styles/Modal.module.css"

function Modal({ product, onClose, onConfirm, isLoading }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <Image
          onClick={onClose}
          src="/images/Close.svg"
          alt="close"
          width={24}
          height={24}
          className={styles.img}
        />

        <div className={styles.modalText}>

<p>آیا از حذف
            <strong>{product?.title ?? "  این محصول  "}</strong>
            مطمئنید؟
          </p>
        </div>

        <div className={styles.btn}>
          <button
            className={styles.deleteBtn}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "در حال حذف..." : "حذف"}
          </button>

          <button onClick={onClose} disabled={isLoading}>
            لغو
          </button>
        </div>

      </div>
    </div>
  )
}

export default Modal
