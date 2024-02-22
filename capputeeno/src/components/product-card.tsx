import { formatPrice } from "@/utils/format-price";
import Image from "next/image";
import styled from "styled-components";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
}

const Card = styled.div`
  background-color: #ffffff66;
  backdrop-filter: blur(10px);
  border-radius: 8px, 8px, 0px, 0px;

  width: 256px;

  img {
    width: auto;
    height: auto;
  }

  h3 {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);
  }

  p {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0em;
    color: var(--shapes-dark);
  }

  div {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    padding: 8px 8px;
    background-color: #ffffff;

    > div {
      width: 228px;
      height: 1px;
      top: 340px;
      left: 12px;
      padding: 0;
      background-color: var(--shapes);
      margin: 8px 0;
    }
  }
`;

export function ProductCard(props: ProductCardProps) {
  const price = formatPrice(props.price);

  return (
    <Card>
      <Image
        src={props.image}
        alt="imagem do produto"
        width={190}
        height={290}
      />
      <div>
        <h3>{props.title}</h3>
        <div></div>
        <p>{price}</p>
      </div>
    </Card>
  );
}
