import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 1) 5%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 12px;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 576px) {
    font-size: 15px;
  }
`;

const Card: React.FC = (props: any) => {
  // const navigate = useNavigate()
  return (
    <Wrapper layout whileHover={{ scale: 1.05 }} onClick={props?.handleClick}>
        <TextWrapper>
          <Title>{props?.title?.userPreferred}</Title>
        </TextWrapper>
        <Image src={props?.coverImage?.large} />
    </Wrapper>
  );
};

export default Card;
