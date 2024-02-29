"use client";

import styled from "styled-components";

import { DefaultPageLayout } from "@/components/default-page-layout";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product, ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { Divider } from "@/components/divider";
import CartList from "@/components/cart/cart-list";
import CartResult from "@/components/cart/cart-result";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    flex-direction: row;
  }
`;

export default function CartPage() {
  const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>(
    "cart-items",
    []
  );

  const calculateTotal = (value: ProductInCart[]) => {
    return value.reduce(
      (sum, item) => (sum += item.price_in_cents * item.quantity),
      0
    );
  };

  const cartTotal = formatPrice(calculateTotal(value));

  const deliveryFee = 4000;

  const formattedDeliveryFee = formatPrice(deliveryFee);

  const cartTotalWithDelivery = formatPrice(
    calculateTotal(value) + deliveryFee
  );

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const newValue = value.map((item) => {
      if (item.id !== id) return item;

      return { ...item, quantity: quantity };
    });
    updateLocalStorage(newValue);
  };

  const handleDeleteItem = (id: string) => {
    const newValue = value.filter((item) => {
      if (item.id !== id) return item;
    });

    updateLocalStorage(newValue);
  };

  return (
    <DefaultPageLayout>
      <Container>
        <CartList
          productForCart={value}
          cartTotal={cartTotal}
          handleUpdateQuantity={handleUpdateQuantity}
          handleDeleteItem={handleDeleteItem}
        />
        <CartResult
          cartTotal={cartTotal}
          cartTotalWithDelivery={cartTotalWithDelivery}
          deliveryFee={formattedDeliveryFee}
        />
      </Container>
    </DefaultPageLayout>
  );
}
