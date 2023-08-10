import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";
import React from "react";

const MenProducts = async () => {
  const getData = await productByCategory("men");
  return (
    <div>
      <CommonListing data={getData && getData.data} />
    </div>
  );
};

export default MenProducts;
