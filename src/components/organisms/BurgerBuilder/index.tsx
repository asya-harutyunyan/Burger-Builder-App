"use client";
import { $apiClient } from "@/api/axios";
import Loading from "@/components/atoms/Loading";
import Burger from "@/components/molecules/Burger";
import BurgerBuilderControllers from "@/components/molecules/BurgerBuilderControllers";
import Modal from "@/components/molecules/Modal";
import OrderSummary from "@/components/molecules/OrderSummary";
import {
  IngredientKeyEnum,
  IngredientsType,
  StateType,
} from "@/types/ingredient";
import { useRouter } from "next/navigation";

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

type BurgerBuilderProps = {};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder: FC<BurgerBuilderProps> = () => {
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const router = useRouter();
  const [state, setState] = useState<StateType>({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    loading: false,
  });

  useEffect(() => {
    $apiClient
      .get("/ingredients.json")
      .then(({ data }: { data: IngredientsType }) => {
        const totalPrice = Object.entries(data).reduce(
          (acc: number, [key, value]: [key: string, value: number]) => {
            return (acc += INGREDIENT_PRICES[key as IngredientKeyEnum] * value);
          },
          0
        );
        console.log(totalPrice);

        setState((prevState) => ({
          ...prevState,
          ingredients: data,
          totalPrice,
        }));
      });
  }, []);

  const updatedIngredientsHandler = useCallback(
    (ingredients: IngredientsType) => {
      $apiClient
        .put("/ingredients.json", ingredients)
        .then((res) => console.log(res));
    },
    []
  );

  const updatePurchaseState = useCallback(
    (ingredients: IngredientsType) => {
      updatedIngredientsHandler(ingredients);
      const sum = Object.keys(ingredients)
        .map((igKey: string) => ingredients[igKey as IngredientKeyEnum])
        .reduce((sum, el) => sum + el, 0);
      setState((prevState) => ({ ...prevState, purchasable: sum > 0 }));
    },
    [updatedIngredientsHandler]
  );

  const addIngredientHandler = useCallback(
    (type: IngredientKeyEnum) => {
      const oldCount = state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients: IngredientsType = {
        ...state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice + priceAddition;

      setState((prevState) => ({
        ...prevState,
        totalPrice: newPrice,
        ingredients: updatedIngredients,
      }));
      updatePurchaseState(updatedIngredients);
    },
    [state.ingredients, state.totalPrice, updatePurchaseState]
  );

  const removeIngredientHandler = useCallback(
    (type: IngredientKeyEnum) => {
      const oldCount = state.ingredients[type];
      if (oldCount <= 0) {
        return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients: IngredientsType = {
        ...state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      setState((prevState) => ({
        ...prevState,
        totalPrice: newPrice,
        ingredients: updatedIngredients,
      }));
      updatePurchaseState(updatedIngredients);
    },
    [state.ingredients, state.totalPrice, updatePurchaseState]
  );

  const disabledInfo = useMemo(() => {
    const data: IngredientsType = {
      ...state.ingredients,
    };

    Object.keys(data).forEach((key: string) => {
      data[key as IngredientKeyEnum] = data[key as IngredientKeyEnum];
    });
  }, [state.ingredients]);

  const purchaseHandler = useCallback(() => {
    setPurchasing(true);
  }, []);

  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
  }, []);

  const purchaseContinueHandler = useCallback(() => {
    const queryParams = Object.keys(state.ingredients).reduce(
      (acc: string[], key: string) => {
        if (state.ingredients[key as IngredientKeyEnum]) {
          acc.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(
              state.ingredients[key as IngredientKeyEnum]
            )}`
          );
        }
        return acc;
      },
      []
    );
    queryParams.push(`price=${state.totalPrice}`);
    const queries = queryParams.join("&");
    router.push(`/checkout?${queries}`);
  }, [router, state.ingredients, state.totalPrice]);

  const orderSummary = useMemo(() => {
    if (state.ingredients) {
      return (
        <Modal isOpen={purchasing} onClose={purchaseCancelHandler}>
          <OrderSummary
            ingredients={state.ingredients}
            price={state.totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
          />
        </Modal>
      );
    }
  }, [
    purchaseCancelHandler,
    purchaseContinueHandler,
    purchasing,
    state.ingredients,
    state.totalPrice,
  ]);

  const content = useMemo(() => {
    if (state.loading) {
      return <Loading />;
    } else if (state.ingredients) {
      return (
        <>
          <Burger ingredients={state.ingredients} />
          <BurgerBuilderControllers
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={state.purchasable}
            price={state.totalPrice}
            orderHandler={purchaseHandler}
          />
        </>
      );
    }
    return null;
  }, [
    addIngredientHandler,
    disabledInfo,
    purchaseHandler,
    removeIngredientHandler,
    state.ingredients,
    state.loading,
    state.purchasable,
    state.totalPrice,
  ]);

  return (
    <>
      {orderSummary}
      {content}
    </>
  );
};

export default BurgerBuilder;
