"use client";

import { useEffect } from "react";
import ProductButton from "./ProductButton";
import ProductTile from "./ProductTile";
import { useRouter } from "next/navigation";
import Notification from "../Notification";

const CommonListing = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4  xl:px-0">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border-2 cursor-pointer rounded-xl"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : 
              null
            }
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default CommonListing;
