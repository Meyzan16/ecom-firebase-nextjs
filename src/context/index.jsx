"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

const protectedRoutes = [
  "account",
  "orders",
  "cart",
  "checkout",
  "admin-view",
];

const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

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

  const [cartItems, setCartItems] = useState([]);

  const [products, setProducts] = useState([]);
  const [getaddress, setAddress] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    address: "",
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );

  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (
      pathName !== '/register' &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName) > -1
    )
       router.push("/login");

  }, [user, pathName]);

  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push("/unauth-page");
  }, [user, pathName]);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);

      const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser({}); //authentecated user
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
        cartItems,
        setCartItems,
        products,
        setProducts,
        getaddress,
        setAddress,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
        allOrdersForUser,
        setAllOrdersForUser,
        orderDetails,
        setOrderDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
