import styles from "./page.module.css";

import { ProductsList } from "@/components/products-list";
import { FilterBar } from "@/components/filter-bar";

export default function Home() {
  return (
    <main className={styles.main}>
      <FilterBar />
      <ProductsList />
    </main>
  );
}
