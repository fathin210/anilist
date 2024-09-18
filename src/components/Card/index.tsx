import styled from "@emotion/styled";
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

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  min-height: 250px;
  min-width: 150px;
  height: 100%;
  width: 100%;
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

const CardTitle = styled.h1`
  font-size: 12px;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 576px) {
    font-size: 16px;
  }
`;

const Card: React.FC<CardProps> = ({ handleDelete, handleClick, deleteAction, editAction, handleEdit, coverImage, ...props }) => {
  return (
    <Wrapper style={{backgroundImage: `url(${coverImage!.medium ?? coverImage!.large})`, backgroundSize: "cover"}}>
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
    </Wrapper>
  );
};

export default Card;
