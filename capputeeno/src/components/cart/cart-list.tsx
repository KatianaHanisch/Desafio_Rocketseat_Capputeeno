import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInCart } from "@/types/product";
import styled from "styled-components";
import { BackBtn } from "../back-button";
import { CartItem } from "./cart-item";

interface CartListProps {
  cartTotal: string;
  productForCart: ProductInCart[];
  handleUpdateQuantity(id: string, quantity: number): void;
  handleDeleteItem(id: string): void;
}

const CartListContainer = styled.div`
  h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 150%;
    text-transform: uppercase;
    color: var(--text-dark-2);
    margin-top: 24px;
  }

  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);

    span {
      font-weight: 600;
    }
  }
`;

const CartListContainerItem = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

export default function CartList({
  productForCart,
  cartTotal,
  handleUpdateQuantity,
  handleDeleteItem,
}: CartListProps) {
  return (
    <CartListContainer>
      <BackBtn navigate="/" />
      <h3>Seu carrinho</h3>
      <p>
        Total {productForCart.length} produtos
        <span> {cartTotal}</span>
      </p>
      <CartListContainerItem>
        {productForCart.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            handleUpdateQuantity={handleUpdateQuantity}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </CartListContainerItem>
    </CartListContainer>
  );
}
