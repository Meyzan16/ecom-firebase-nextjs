"use client";

import React, { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deletFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";

const CartModal = () => {
  const router = useRouter();
  const {
    showCartModal,
    setShowCartModal,
    user,
    cartItems,
    setCartItems,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const data =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,

              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];

      setCartItems(data);
      localStorage.setItem("cartItems", JSON.stringify(data));
    }
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

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y devide-gray-300">
            {cartItems.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                  <img
                    src={item.productID.imageUrl}
                    alt="cart image"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{item.productID.name}</a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      ${item.productID.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-red-800 sm:order-2"
                      onClick={() => handleDeleteCartItem(item._id)}
                    >
                      {componentLevelLoader.loading &&
                      componentLevelLoader.id === item._id ? (
                        <ComponentLevelLoader
                          text={"Removing"}
                          color={"#000000"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            onClick={() => {
              router.push("/cart")
              setShowCartModal(false)
            }}
            type=" button"
            className="w-full mt-1.5 inline-block button"
          >
            Go To Cart
          </button>

          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            className="mt-1.5  w-full inline-block button button disabled:opacity-50"
            onClick={() => {
              setShowCartModal(false)
              router.push('/checkout')}
            } 
            
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <button type="button" className="font-medium text-grey">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
};

export default CartModal;
