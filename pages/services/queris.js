

import { api } from "./mutation";


export const getProducts = async ({ page, limit, search }) => {
  const res = await api.get("/products", {
    params: { page, limit, search },
  })
  return res.data
}

export const addProduct = async (data) => {
  const res = await api.post("/products", data)
  return res.data
}

