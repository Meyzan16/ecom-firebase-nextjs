import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";
import React from "react";

const WomenProducts = async () => {
  const getData = await productByCategory("women");
  return (
    <div>
      <CommonListing data={getData && getData.data} />
    </div>
  );
};

export default WomenProducts;
