import React, { Fragment } from "react";
import SingleProductList from "./SingleProductList";
import productData from "../productData";
import PageTitle from "../../../../layouts/PageTitle";

const ProductList = () => {
   return (
      <Fragment>
         <PageTitle activeMenu="Product List" motherMenu="Shop" />

         <div className="row">
            {productData.map((product) => (
               <SingleProductList key={product.key} product={product} />
            ))}
         </div>
      </Fragment>
   );
};

export default ProductList;
