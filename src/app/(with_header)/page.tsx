import BurgerBuilder from "@/components/organisms/BurgerBuilder";
import classes from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className={classes.content}>
        <BurgerBuilder />
      </main>
    </div>
  );
}
