import { useEffect } from "react";


const api = axios.create({
  baseURL: "http://localhost:3000",
});
 export const GetProductList = () => useEffect(() => {
    fetch("http://localhost:3000/products?page=1&limit=10")
      .then(res => res.json())
      .then(res => {
        const products =
          res?.data?.products ??
          res?.data ??
          res?.products ??
          res ??
          [];
  
        setProductList(Array.isArray(products) ? products : []);
      });
  }, []);
  
