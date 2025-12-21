"use client"

import { useQuery } from "@tanstack/react-query"
import { FiSearch } from "react-icons/fi"
import Image from "next/image"
import styles from "../../styles/product.module.css"
import { getProducts } from "../services/queris"
import { useState } from "react"
import EditProduct from "../products/editProduct"
import Modal from "./modal"
import AddProduct from "../products/addProduct"
import { useDeleteProductItem } from "../services/mutation"

export default function Product() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)
const [search, setSearch] = useState("")
  const {
    mutate: deleteProductMutate,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteProductItem()

  const { data: queryData, isLoading, isError } = useQuery({
    queryKey: ["products", { page: 1, limit: 10, search }],
    queryFn: () => getProducts({page:1, limit:10, search}),
  })

  const handleConfirmDelete = () => {
    if (!productToDelete) return

    deleteProductMutate(productToDelete.id, {
      onSuccess: () => {
        setProductToDelete(null)
      },
    })
  }

  if (isLoading) return <div>⏳ در حال دریافت محصولات...</div>
  if (isError) return <div>❌ خطا در دریافت محصولات</div>

  const products = Array.isArray(queryData?.data)
    ? queryData.data
    : []

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.searchBox}>
          <FiSearch size={24} color="#282828" />
          <input type="text" placeholder="جست و جوی کالا" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>

        <div className={styles.managementDetails}>
          <Image src="/images/mn.JPG" alt="" width={40} height={40} className={styles.pngPic} />
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
          <button onClick={() => setIsAddOpen(true)}>
            افزودن محصول
          </button>
        </div>

        {isAddOpen && (
          <AddProduct onClose={() => setIsAddOpen(false)} />
        )}
      </div>

      <div className={styles.productTable}>
        <table  width="95%" className={styles.table}>
          <thead>
            <tr>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>شناسه کالا</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title || product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.id}</td>
                <td>
                  <Image
                    src="/images/edit.svg"
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => setEditProduct(product)}
                  />
                  <Image
                    src="/images/trash.svg"
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => setProductToDelete(product)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editProduct && (
        <EditProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}

      {productToDelete && (
        <Modal
          product={productToDelete}
          isLoading={isDeleting}
          onClose={() => setProductToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
