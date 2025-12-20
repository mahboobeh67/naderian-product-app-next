import { api } from "./mutation";

export const updateProduct = async ({ id, data }) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};