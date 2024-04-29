"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IngredientKeyEnum, IngredientsType } from "@/types/ingredient";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CheckoutSummary from "@/components/molecules/CheckoutSummary";

type CheckoutProps = {};

const Checkout: FC<CheckoutProps> = () => {
  const [ingredients, setIngredients] =
    useState<null | Partial<IngredientsType>>(null);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = useParams();

  const price = useMemo(() => params.get("price"), [params]);

  useEffect(() => {
    const salad = params.get("salad");
    const bacon = params.get("bacon");
    const cheese = params.get("cheese");
    const meat = params.get("meat");

    const data: Partial<IngredientsType> = {};

    if (salad) {
      data.salad = +salad;
    }
    if (bacon) {
      data.bacon = +bacon;
    }
    if (cheese) {
      data.cheese = +cheese;
    }
    if (meat) {
      data.meat = +meat;
    }

    setIngredients(data);
  }, [params]);

  const checkoutCancelledHandler = useCallback(() => {
    router.back();
  }, [router]);

  const checkoutContinuedHandler = useCallback(() => {
    if (!ingredients) return;

    const queryParams = (
      Object.keys(ingredients) as IngredientKeyEnum[]
    ).reduce((acc: string[], key: IngredientKeyEnum) => {
      const ingredientValue = ingredients[key];
      if (ingredientValue !== undefined) {
        acc.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(ingredientValue)}`
        );
      }
      return acc;
    }, []);

    queryParams.push(`price=${encodeURIComponent(price || "")}`);
    const queries = queryParams.join("&");
    router.push(`/checkout/contact-data?${queries}`);
  }, [ingredients, price, router]);

  return (
    <div>
      {ingredients && (
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
      )}
    </div>
  );
};

export default Checkout;
