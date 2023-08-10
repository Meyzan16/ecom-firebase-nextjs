import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";
import React from "react";

const KidsProducts = async () => {
  const getData = await productByCategory("kids");
  return (
    <div>
      <CommonListing data={getData && getData.data} />
    </div>
  );
};

export default KidsProducts;
