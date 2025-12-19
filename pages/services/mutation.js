import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const useRegister = () => {
    const mutationFn = data => api.post("/auth/register", data)
    return useMutation({mutationFn})
}

export const useLogin = () => {
    const mutationFn = data => api.post("/auth/login", data)
    return useMutation({mutationFn})
}

export const useEditProductItem = ( ) => {

    return useMutation({
        mutationFn: ({id , data}) => api.put(`/products/${id}`, data)
    })
    
}

export const useAddProductItem = ( ) => {

      return useMutation({
        mutationFn: data => api.post("/products", data)})
    
  
}
export const useDeleteProductItem = ( ) => {

    return useMutation({
        mutationFn: (id) => api.delete(`/products/${id}`)
    })
   
}