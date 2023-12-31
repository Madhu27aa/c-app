import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToBasket } from "@/redux/basketSlice";

//product showing props
interface Props {
  product: Product;
}
//redux and toast adding item and showing notification
//showing notification by toaster in app.tsx page
export default function Product({ product }: Props) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} added to cart`, {
      position: "bottom-center",
    });
  };
  //showing image
  return (
    <div className="flex h-[10px] w-[32px] select-none flex-col space-y-1 rounded-xl bg-[#ddccd8]  md:h-[300px] md:w-[400px] md:p-12 ">
      <div className="relative h-64 w-64 md:h-72 md:w-72">
        <Image
          src={urlFor(product.image[0]).url()}
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
        <div
          className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[50px] md:w-[60px]"
          onClick={addItemToBasket}
        >
          <ShoppingCartIcon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
}
