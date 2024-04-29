"use client";
import React, {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import classes from "./index.module.css";
import Button from "@/components/atoms/Button";
import { IngredientsType } from "@/types/ingredient";
import { $apiClient } from "@/api/axios";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/atoms/Loading";

type ContactDataProps = {
  ingredients: IngredientsType;
  price: number;
};

const initData = {
  name: "",
  email: "",
  address: {
    street: "",
    postalCode: "",
  },
};

const ContactData: FC<ContactDataProps> = () => {
  const router = useRouter();
  const [state, setState] = useState(initData);
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredients, setIngredients] =
    useState<null | Partial<IngredientsType>>(null);
  const params = useSearchParams();
  const price = useMemo(() => params.get("price"), [params]);
  const [order, setOrder] = useState({
    name: "",
    email: "",
    deliveryMethod: "",
    address: {
      street: "",
      zipCode: "",
      country: "",
    },
  });

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

  const formSubmitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      setLoading(true);
      const data = {
        ingredients,
        price,
        customer: {
          order,
        },
      };

      $apiClient
        .post("/orders.json", data)
        .then(() => {
          router.push("/orders");
          setState(initData);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    },
    [ingredients, order, price, router]
  );

  return (
    <div className={classes.contactData}>
      <h2>Enter your Contact Data</h2>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={formSubmitHandler}>
          <input
            className={classes.input}
            type="text"
            name="name"
            onChange={(e) => {
              setOrder((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
            placeholder="Your Name"
          />
          <input
            className={classes.input}
            onChange={(e) => {
              setOrder((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
            type="email"
            name="email"
            placeholder="Your Mail"
          />
          <input
            className={classes.input}
            type="text"
            name="street"
            placeholder="Street"
            onChange={(e) => {
              setOrder((prevState: any) => ({
                ...prevState,
                address: { street: e.target.value },
              }));
            }}
          />
          <input
            className={classes.input}
            type="text"
            name="postal"
            placeholder="Postal Code"
            onChange={(e) => {
              setOrder((prevState: any) => ({
                ...prevState,
                address: { zipCode: e.target.value },
              }));
            }}
          />
          <Button btnType="success">ORDER</Button>
        </form>
      )}
    </div>
  );
};

export default ContactData;
