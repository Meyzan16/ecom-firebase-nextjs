"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);

  //register
  const [pageLevelLoader, setPageLevelLoader] = useState(false);

  //login
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  const [cartItem, setCartItem] = useState([]);

  const [products, setProducts] = useState([]);
  const [getaddress, setAddress] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    address: "",
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
  });

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItem,
        setCartItem,
        products,
        setProducts,
        getaddress,
        setAddress,
        addressFormData,
        setAddressFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
