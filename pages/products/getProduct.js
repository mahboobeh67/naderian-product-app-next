import { useState } from "react";
import { GetProductList } from "../services/queris";


function GetProduct() {
  const [productList, setProductList] = useState([]);


  return (
      <div>
      <h1>🛍 product list</h1>

      {productList.map((product) => (
        <ul key={product.id}>
          <li>{product.name}</li>
        </ul>
      ))}
    </div>
  )
}

export default GetProduct