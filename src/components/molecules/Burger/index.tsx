import React, { FC } from "react";
import classes from "./index.module.css";
import BurgerIngredient from "../../atoms/BurgerIngredient";

type BurgerProps = {
  ingredients: any;
};

const Burger: FC<BurgerProps> = ({ ingredients }) => {
  let transformedIngredients: any = Object.keys(ingredients)
    .map((igKey) => {
      return [...Array(ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
