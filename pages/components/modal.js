import { useRouter } from "next/router"
import Image from "next/image"
import styles from "../../styles/Modal.module.css"
import { useState } from "react"
function Modal({product, onClose}) {
    const router = useRouter()
    const [isClosing , setIsClosing] = useState(false)
    if (isClosing) return null
    const handleClose = () =>{
      setIsClosing(true)
      router.back()
    }
    const handleDelete = async () => {
  // await deleteProduct(id)
 onClose()
}
  return (
     <div className={styles.overlay}>
      <div  className={styles.modal}>
        <div >
          <Image onClick={() => handleClose()}
            src="/images/Close.svg"
            alt="close"
            width={96}
            height={97}
            className={styles.img}
          />
          <div className={styles.modalText}>
            <p >{product.title}آیا از حذف این محصول مطمئنید؟</p>
          </div>
          <div >

           <div className={styles.btn}>
<div className={styles.deleteBtn}>

              <button onClick={handleDelete}>حذف</button>
            </div>
            <button
              onClick={onClose}
             
            >
              لغو
            </button>
            
            
           </div>
            

          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal