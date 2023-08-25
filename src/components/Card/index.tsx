import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Button } from "..";
import { Title } from "../../interfaces";

interface CardProps {
  handleClick?: () => void;
  title?: Title;
  coverImage?: {
    large: string,
    medium: string
  };
  deleteAction?: boolean;
  handleDelete?: () => void;
  editAction?: boolean;
  handleEdit?: () => void;
  animateHover?: boolean;
}

const Wrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  height: 100%;
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
  z-index: 8;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  width: fit-content;
  padding: 1rem;
  z-index: 9;
  top: 0;
  right: 0;
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const CardTitle = styled.h1`
  font-size: 12px;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 576px) {
    font-size: 16px;
  }
`;

const Card: React.FC<CardProps> = ({animateHover = true, handleDelete, handleClick, deleteAction, editAction, handleEdit, ...props }) => {
  return (
    <Wrapper layout whileHover={ animateHover ? { scale: 1.05 } : {}}>
      <ButtonWrapper>
        {deleteAction ? (
          <Button color="danger" onClick={handleDelete}><FaTrash /></Button>
        ) : null}
        {editAction ? (
          <Button color="primary" onClick={handleEdit}><FaEdit /></Button>
        ) : null}
      </ButtonWrapper>
      <TextWrapper onClick={handleClick}>
        <CardTitle>{props?.title?.userPreferred}</CardTitle>
      </TextWrapper>
      <Image rel="preload" src={props?.coverImage?.medium} />
    </Wrapper>
  );
};

export default Card;
