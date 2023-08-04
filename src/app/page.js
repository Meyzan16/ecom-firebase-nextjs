'use client';
import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function Home() {

  const {isAuthUser} = useContext(GlobalContext);

  // console.log(isAuthUser);

  return (
      <h1>
        E commerce website
      </h1>
  )
}
