import Head from "next/head";
import Header from "../components/Header";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import CheckoutProduct from "@/components/checkoutProduct";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import Stripe from "stripe";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripejs";

//groupstate by same items

function Checkout() {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_session",
      {
        items: items,
      }
    );

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Head>
        <title>Bag - Dessert stop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-2">
          <h1 className="my-4 text-3xl font- lg:text-2xl">
            {items.length > 0 ? "Review your bag" : "Your bag is empty."}
          </h1>
          <p className="my-4"></p>

          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
          </div>
        )}
        <div className="my-12 mt-6 ml-auto max-w-3xl">
          <div className="divide-y divide-gray-300">
            <div className="pb-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>
                  <Currency quantity={basketTotal} currency="INR" />
                </p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>50</p>
              </div>
              <div className="flex justify-between"></div>
              <p></p>
            </div>
            <div className="flex justify-between pt-4 text-xl font-semibold">
              <h4>Total</h4>
              <h4>
                <Currency quantity={basketTotal} currency="INR" />
              </h4>
            </div>
          </div>
          <Button
            noIcon
            loading={loading}
            title="checkout"
            width="w-20px"
            onClick={createCheckoutSession}
          />
        </div>
      </main>
    </div>
  );
}

export default Checkout;
