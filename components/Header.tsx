import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "@/redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";

//cart items down near items.length

export default function Header() {
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);

  return (
    <header className="top-0 z-30 flex w-full items-center justify-between bg-[#dac4d4] p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-20 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src="/favicon.ico"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex  ">
        <Link href="/">
          <div className="headerLink">Home </div>
        </Link>
        <Link href="/">
          <div className="headerLink">Product </div>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <Link href="checkout">
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {items.length}
              </span>
            )}

            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
}
