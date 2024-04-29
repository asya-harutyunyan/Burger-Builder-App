"use client";
import { $apiClient } from "@/api/axios";
import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import { IngredientsType } from "@/types/ingredient";

type Props = {};

type OrderItem = {
  customer: {
    order: {
      address: {
        zipCode: string;
      };
      email: string;
      name: string;
    };
  };
  ingredients: IngredientsType;
  price: string;
};

const Orders = (props: Props) => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  useEffect(() => {
    $apiClient
      .get("/orders.json")
      .then((res) => setOrder(Object.values(res.data)));
  }, []);

  useEffect(() => {
    console.log(order, "*************");
  }, [order]);

  return (
    <div>
      <p className={classes.heading}>All orders</p>
      <ul className={classes.ul}>
        <span>
          {order.map((item, index) => (
            <li key={index} className={classes.list_item}>
              <div className={classes.display}>
                <p className={classes.title}>Name</p>
                <span className={classes.information}>
                  {item.customer.order.name}
                </span>
              </div>
              <div className={classes.display}>
                <p className={classes.title}>Email</p>
                <span className={classes.information}>
                  {item.customer.order.email}
                </span>
              </div>
              <div className={classes.display}>
                <p className={classes.title}>ZipCode</p>
                <span className={classes.information}>
                  {item.customer.order.address.zipCode}
                </span>
              </div>
              <div className={classes.display}>
                <p className={classes.title}>Ingredients</p>
                <span
                  className={classes.information}
                  style={{ marginRight: "10px" }}
                >
                  {Object.entries(item.ingredients).map(
                    ([ingredient, quantity]) => `${ingredient}: ${quantity},  `
                  )}
                </span>
              </div>
              <div className={classes.display}>
                <p className={classes.title}>Price</p>
                <span className={classes.information}>{item.price}$</span>
              </div>
            </li>
          ))}
        </span>
      </ul>
    </div>
  );
};

export default Orders;
