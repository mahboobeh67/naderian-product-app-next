

import { api } from "./mutation";


export const getProducts = async ({ queryKey }) => {
  const [, params] = queryKey
  const res = await api.get("/products", { params })

  return res.data
}
export const addProduct = async (data) => {
  const res = await api.post("/products", data)
  return res.data
}

