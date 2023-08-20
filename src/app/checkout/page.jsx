"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getallAddress } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Checkout = () => {
  const router = useRouter();
  const params = useSearchParams();

  const publisKey = "pk_test_51NeujeHeMgTebgqptrLpEI1nELWiqoPfWkEpL9tsCmzwhw9fJYSzuMX4O7FhfHGfSXQQgKKD5XcE9VzPL3BZMxuU00X3KepGvY";
  const stripePromise = loadStripe(publisKey);

  const {
    cartItems,
    user,
    getaddress,
    setAddress,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  async function getAllAddress() {
    const res = await getallAddress(user?._id);

    if (res.success) {
      setAddress(res.data);
    }
  }

  useEffect(() => {
    if (user !== null) getAllAddress();
  }, [user]);

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        
          
        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: 1,
            product: item.productID,
            
          })),
          paymentMethod: "Stripe",
          totalPrice: cartItems.reduce(
            (total, item) => item.productID.price + total, 0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const res = await createNewOrder(createFinalCheckoutFormData);

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }

    createFinalOrder();
  }, [params.get("status"), cartItems]);


  function handleSelectedAddress(item) {
    if (item._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }

    setSelectedAddress(item._id);
    setCheckoutFormData({
      ...checkoutFormData,

      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: item.fullName,
        city: item.city,
        country: item.country,
        postalCode: item.postalCode,
        address: item.address,
      },
    });
  }

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });

    console.log(error);
  };

  useEffect(() => {
    if(orderSuccess) {
      setTimeout(() => {
        router.push('/orders');
      },[3000])
    }
  },[orderSuccess])

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200 py-12">
          <div className="mx-auto max-w-screen-xl px-4 ">
            <div className="bg-white shadow-lg  rounded-xl">
              <div className="px-4  py-6 sm:px-8 sm:py-10">
                <h1 className="font-bold text-lg text-center">
                  Your payment is succesfully and you will be redirected to orders page in 3 seconds !
                </h1>

             
              </div>
            </div>
          </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <PulseLoader
          color={"#000000"}
          loading={isOrderProcessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid py-8 lg:py-4  lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart summary</p>
          <p className="text-gray-400 font-bold">
            total purchases in your cart, payment
          </p>
          <div className="mt-8 space-y-3 rounded-lg border-2 bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    src={item.productID.imageUrl}
                    alt="image productid"
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-bold">{item.productID.name}</span>
                    <span className="font-semibold">
                      ${item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div> Your cart is empty </div>
            )}
          </div>
        </div>

        <div className=" px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping address details</p>
          <p className="text-gray-400 font-bold">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-8  mr-0 mb-0 ml-0 space-y-6">
            {getaddress && getaddress.length ? (
              getaddress.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border-2 p-6 rounded-xl ${
                    item._id === selectedAddress ? "border-red-900" : ""
                  }`}
                >
                  <p>Name : {item.fullName} </p>
                  <p>Address : {item.address} </p>
                  <p>City : {item.city}</p>
                  <p>Country : {item.country}</p>
                  <p>Postal Code : {item.postalCode}</p>

                  <button className="mt-4 mr-2 button inline-block">
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <p>No address added</p>
            )}
          </div>

          <button
            onClick={() => router.push("/account")}
            className="mt-4 mr-2 button inline-block"
          >
            Add new address
          </button>

          <div className="mt-6 border-border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-lg font-bold text-gray-900">Free</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={
                (cartItems && cartItems.length === 0) ||
                Object.keys(checkoutFormData.shippingAddress).length === 0
              }
              className="disabled:opacity-50 w-full mt-4 mr-2 button inline-block"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Checkout;
