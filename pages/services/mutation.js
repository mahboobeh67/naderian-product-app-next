import { useMutation } from "@tanstack/react-query";
import axios from "axios";


export const useRegister = () => {
    const mutationFn = data => axios.post("http://localhost:3000/auth/register", data)
    return useMutation({mutationFn})
}

export const useLogin = () => {
    const mutationFn = data => axios.post("http://localhost:3000/auth/login", data)
    return useMutation({mutationFn})
}