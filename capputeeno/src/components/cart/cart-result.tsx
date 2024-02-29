import styled from "styled-components";
import { Divider } from "../divider";

interface CartResultProps {
  cartTotal: string;
  cartTotalWithDelivery: string;
  deliveryFee: string;
}

const CartResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 352px;
  padding: 16px 24px;

  background: #ffffff;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;

    h3 {
      font-weight: 600;
      font-size: 20px;
      color: var(--text-dark-2);
      text-transform: uppercase;
      margin-bottom: 30px;
    }
  }
`;

const TotalItem = styled.div<{ isBold: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-weight: ${(props) => (props.isBold ? "600" : "400")};
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 12px;
`;

const ShopBtn = styled.button`
  color: #ffffff;
  border-radius: 4px;
  background-color: var(--sucess-color);
  padding: 12px 12px;
  width: 100%;
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
`;

const ContainerLinks = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const LinksItens = styled.a`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: var(--text-dark);
  text-transform: uppercase;
  text-decoration: underline;
  margin-top: 8px;
  cursor: pointer;
`;

export default function CartResult({
  cartTotal,
  cartTotalWithDelivery,
  deliveryFee,
}: CartResultProps) {
  return (
    <CartResultContainer>
      <div>
        <h3>Resumo do pedido</h3>
        <TotalItem isBold={false}>
          <p>Subtotal de produtos</p>
          <p>{cartTotal}</p>
        </TotalItem>
        <TotalItem isBold={false}>
          <p>Entrega</p>
          <p>{deliveryFee}</p>
        </TotalItem>
        <Divider />
        <TotalItem isBold>
          <p>Total</p>
          <p>{cartTotalWithDelivery}</p>
        </TotalItem>
        <ShopBtn>Finalizar Compra</ShopBtn>
      </div>
      <ContainerLinks>
        <LinksItens>Ajuda</LinksItens>
        <LinksItens>Reembolsos</LinksItens>
        <LinksItens>Entregas e fretes</LinksItens>
        <LinksItens>Trocas e devoluções</LinksItens>
      </ContainerLinks>
    </CartResultContainer>
  );
}
