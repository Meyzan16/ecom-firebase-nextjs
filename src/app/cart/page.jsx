"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deletFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    user,
    cartItems,
    setCartItems,
    pageLevelLoader,
    setPageLevelLoader,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    setPageLevelLoader(true);
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      setCartItems(res.data);
      setPageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }

    // console.log(res);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);
  

  async function handleDeleteCartItem(getitemID) {
    setComponentLevelLoader({ loading: true, id: getitemID });
    const res = await deletFromCart(getitemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllCartItems();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return <CommonCart componentLevelLoader={componentLevelLoader} handleDeleteCartItem={handleDeleteCartItem} cartItems={cartItems} />;
};

export default Cart;
