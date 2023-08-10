'use client'

import CommonListing from '@/components/CommonListing'
import { GlobalContext } from '@/context';
import { getAllAdminProducts, getAllProducts } from '@/services/product'
import React, { useContext,useState,useEffect } from 'react'

const AdminAllProducts =   () => {
  const {user,products, setProducts} = useContext(GlobalContext);

  async function extractGetProduct() {
    const allAdminProducts = await getAllAdminProducts(user?._id);
    setProducts(allAdminProducts.data);
  }

  useEffect(() => {
    if (user !== null) extractGetProduct();
  }, [user]);


  return (
    <div>
      <CommonListing data={products} />
    </div>
  )
}

export default AdminAllProducts
