import {
  PriceTable,
  CardHeader,
  Price,
  Features,
  PurchaseButton,
} from "@/components/ui/snappy-price-table";
import { useCheckout } from "@/queries/paymentQuires";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

export interface purchaseType {
  name: string;
  price: number;
  quantity: number;
}

const Premium = () => {
  const { mutate: checkout, data: apiData } = useCheckout();

  const checkouthandler = async (data: purchaseType) => {
    try {
      await checkout(data);
      console.log(apiData);

      if (apiData?.id) {
        console.log(apiData.id);

        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: apiData.id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto container my-10">
      <div className="flex items-center justify-center h-screen gap-9 flex-row">
        <PriceTable className="dark:border-text-secondary">
          <CardHeader title="Beginner" />
          <Price price={"$999"} timeFrame="mothly" />
          <Features text="Basic Equipment Access" />
          <Features text="Guided Workout Plan" />
          <Features text="Locker Facility" />
          <Features text="Personal Training" disable={true} />
          <PurchaseButton
            onClick={() =>
              checkouthandler({ name: "basic", quantity: 1, price: 25 })
            }
          />
        </PriceTable>

        <PriceTable mostPopular={true} className="dark:border-text-secondary">
          <CardHeader title="Warrior" />
          <Price price={"$1999"} timeFrame="mothly" />
          <Features text="24/7 Gym Access" />
          <Features text="Personal Training (2x/week)" />
          <Features text="Nutrition Guide" />
          <Features text="Group Classes" disable={true} />
          <PurchaseButton
            onClick={() =>
              checkouthandler({ name: "Warrior", quantity: 1, price: 35 })
            }
          />
        </PriceTable>

        <PriceTable className="dark:border-text-secondary">
          <CardHeader title="Champion" />
          <Price price={"$3999"} timeFrame="mothly" />
          <Features text="All Warrior Benefits" />
          <Features text="Daily Personal Training" />
          <Features text="Custom Meal Plans" />
          <Features text="Recovery Spa Access" />
          <PurchaseButton
            onClick={() =>
              checkouthandler({ name: "Champion", quantity: 1, price: 45 })
            }
          />
        </PriceTable>
      </div>
    </div>
  );
};

export default Premium;
