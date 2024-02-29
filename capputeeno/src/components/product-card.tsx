import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Divider } from "./divider";
import { formatPrice } from "@/utils/format-price";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  id: string;
}

const Card = styled.div`
  background-color: #ffffff66;
  backdrop-filter: blur(10px);
  border-radius: 8px, 8px, 0px, 0px;
  cursor: pointer;

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
    padding: 8px 12px;
    width: 100%;
    background-color: #ffffff;
  }
`;

export function ProductCard(props: ProductCardProps) {
  const router = useRouter();
  const price = formatPrice(props.price);

  const handleNavigate = () => {
    router.push("/product?id=" + props.id);
  };

  return (
    <Card onClick={handleNavigate}>
      <Image
        src={props.image}
        alt="imagem do produto"
        width={190}
        height={290}
      />
      <div>
        <h3>{props.title}</h3>
        <Divider />
        <p>{price}</p>
      </div>
    </Card>
  );
}
