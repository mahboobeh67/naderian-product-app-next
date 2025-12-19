'use client'

import { FiSearch } from "react-icons/fi"
import useSWR from "swr"
import Image from "next/image"
import styles from "../../styles/product.module.css"

   

export default function Product(){
  const { data, error, isLoading } = useSWR(
    'http://localhost:3000/products',
    
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const products = Array.isArray(data) ? data : data?.data ?? []

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.searchBox}>
          <FiSearch size={24} color="#282828" />
          <input type="text" placeholder="جست و جوی کالا" />
        </div>

        <div className={styles.managementDetails}>
          <Image src="/images/mn.JPG" alt="" width={40} height={40} />
          <div className={styles.managementText}>
            <h4>محبوبه نادریان</h4>
            <span>مدیر</span>
          </div>
        </div>
      </div>

      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderText}>
          <Image src="/images/setting-3.svg" alt="" width={40} height={40} />
          <p>مدیریت کالا</p>
        </div>
        <div className={styles.pageHeaderBtn}>
          <button>افزودن محصول</button>
        </div>
      </div>

      <div className={styles.productTable}>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, any) => (
              <tr key={item.id}>
                <td>{item.title || item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <Image src="/images/edit.svg" alt="" width={20} height={20} />
                  <Image src="/images/trash.svg" alt="" width={20} height={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


