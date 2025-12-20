"use client";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import styles from "../../styles/product.module.css";
import { getProducts } from "../services/queris";
import { useState } from "react";
import EditProduct from "../products/editProduct";
import Modal from "./modal";
import AddProduct from "../products/addProduct";
export default function Product() {
  const [isAddOpen, setIsAddOpen] = useState(false)
const [editProduct, setEditProduct] = useState(null)
const [deleteProduct, setDeleteProduct] = useState(null)
  
  const { data:queryData, isLoading, isError } = useQuery({
    queryKey: ["products", { page: 1, limit: 10 }],
    queryFn: getProducts,
  });
 

  if (isLoading) return <div>⏳ در حال ذخیره محصول...</div>;
  if (isError) return <div>❌ خطا در ثبت محصول</div>;

const products = Array.isArray(queryData?.data)
  ? queryData.data
  : [];
const total = queryData?.totalProducts
const meta = queryData?.meta
 

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
          <button onClick={() => setIsAddOpen(true)}>افزودن محصول</button>
        </div>
        {isAddOpen && (<AddProduct onClose={() => setIsAddOpen(false)}/>)}
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title || product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Image
                    src="/images/edit.svg"
                    alt=""
                    width={20}
                    height={20}
                    type="submit"
                    onClick={() => setEditProduct(product)}
                  />
                  <Image
                    src="/images/trash.svg"
                    alt=""
                    width={20}
                    height={20}
                    type="submit"
                    onClick={() => setDeleteProduct(product)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editProduct && (<EditProduct product={editProduct} onClose={() => setEditProduct(null)}/>)}
        {deleteProduct && (<Modal product={deleteProduct} onClose ={()=> setDeleteProduct(null)}/>)}
    </div>
  );
}
