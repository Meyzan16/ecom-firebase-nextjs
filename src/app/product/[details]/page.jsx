import CommonDetails from '@/components/CommonDetails';
import { productBySlug } from '@/services/product'
import React from 'react'

const ProductDetails = async ({params}) => {

    const productDetailsData = await productBySlug(params.details);

    console.log(productDetailsData);

  return (
    <CommonDetails item={productDetailsData && productDetailsData.data} />
  )
}

export default ProductDetails
