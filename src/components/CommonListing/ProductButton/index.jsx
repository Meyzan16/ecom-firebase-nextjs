"use client";

import { GlobalContext } from "@/context";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { deleteAdminProducts } from "@/services/product";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { addToCart } from "@/services/cart";

const ProductButton = ({ item }) => {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    componentLevelLoader,
    setComponentLevelLoader,
    user,
    setShowCartModal,
    products,
    setProducts,

  } = useContext(GlobalContext);
  const router = useRouter();

  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(getitem) {
    const res = await deleteAdminProducts(item._id.toString());
    const filteredPosts = products.filter((p) => p._id !== getitem._id);
    setProducts(filteredPosts);
    
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: item._id });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  async function handleAddToCart(getItem) {
    // console.log(getItem);
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await addToCart({
      productID: getItem._id,
      userID: user._id,
      owner: item.owner,
    });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowCartModal(true);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowCartModal(true);
    }
  }

  return isAdminView ? (
    <div className="flex gap-2">
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
        className="w-full button-update"
      >
        update
      </button>
      <button onClick={() => handleDeleteProduct(item)} className="w-full button-delete">
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "delete"
        )}
      </button>
    </div>
  ) : (
    <button onClick={() => handleAddToCart(item)} className="button">
      {componentLevelLoader.loading && componentLevelLoader.id === item._id ? (
        <ComponentLevelLoader
          text={"Adding to cart"}
          color={"#ffffff"}
          loading={componentLevelLoader.loading}
        />
      ) : (
        "Add to cart"
      )}
    </button>
  );
};

export default ProductButton;
