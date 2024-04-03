"use client";

import { BackBtn } from "@/components/back-button";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { ShoppingBagIcon } from "@/components/icons/shopping-bar-icon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useProduct } from "@/hooks/useProduct";
import { formatPrice } from "@/utils/format-price";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  section {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 32px;
    margin-top: 24px;

    div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        border-radius: 4px;
        color: #ffffff;
        background-color: #115d8c;
        border: none;
        cursor: pointer;
        padding: 10px 0;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    }
  }

  img {
    max-width: 640px;
    width: 50%;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  span {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-dark-2);
    text-transform: capitalize;
  }

  h2 {
    font-size: 32px;
    font-weight: 300;
    line-height: 48px;
    color: var(--text-dark-2);
    margin-top: 12px;
  }

  span:nth-of-type(2) {
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: var(--shapes-dark);
    margin-bottom: 24px;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: var(--text-dark-2);
  }

  div {
    margin-top: 24px;

    h3 {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: var(--text-dark);
      text-transform: uppercase;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      color: var(--text-dark-2);
    }
  }
`;

export default function Product({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const { data } = useProduct(searchParams.id);

  const handleAddToCart = () => {
    let cartItems = localStorage.getItem("cart-items");
    if (cartItems) {
      let cartItemsArray = JSON.parse(cartItems);

      let existingProductIndex = cartItemsArray.findIndex(
        (item: { id: string }) => item.id === searchParams.id
      );

      if (existingProductIndex != -1) {
        cartItemsArray[existingProductIndex].quantity += 1;
      } else {
        cartItemsArray.push({ ...data, quantity: 1, id: searchParams.id });
      }

      localStorage.setItem("cart-items", JSON.stringify(cartItemsArray));
    } else {
      const newCart = [{ ...data, quantity: 1, id: searchParams.id }];
      localStorage.setItem("cart-items", JSON.stringify(newCart));
    }
  };

  return (
    <DefaultPageLayout>
      <Container>
        <BackBtn navigate="/" />
        <section>
          <img src={data?.image_url} alt="imagem produto" />
          <div>
            <ProductInfo>
              <span>{data?.category}</span>
              <h2>{data?.name}</h2>
              <span>{formatPrice(data?.price_in_cents ?? 0)}</span>
              <p>
                *Frete de R$40,00 para todo o Brasil. Grátis para compras acima
                de R$900,00.
              </p>
              <div>
                <h3>Descrição</h3>
                <p>{data?.description}</p>
              </div>
            </ProductInfo>
            <button onClick={handleAddToCart}>
              <ShoppingBagIcon />
              Adicionar ao carrinho
            </button>
          </div>
        </section>
      </Container>
    </DefaultPageLayout>
  );
}
