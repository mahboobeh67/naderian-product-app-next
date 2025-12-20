import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { updateProduct } from "./products";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const useRegister = () => {
  const mutationFn = (data) => api.post("/auth/register", data);
  return useMutation({ mutationFn });
};

export const useLogin = () => {
  const mutationFn = (data) => api.post("/auth/login", data);
  return useMutation({ mutationFn });
};



export const useAddProductItem = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post("/products", data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["products"]})
    }
  });
};
export const useDeleteProductItem = () => {
  return useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
