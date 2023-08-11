import CommonListing from '@/components/CommonListing'
import { getAllProducts } from '@/services/product'
import React from 'react'

const AllProducts = async () => {

    const getData = await getAllProducts();
    console.log(getData);
    

  return (
    <CommonListing data={getData && getData?.data} />
  )
}

export default AllProducts
