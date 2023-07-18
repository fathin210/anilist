import styled from "@emotion/styled";
import React from "react";
import { Button, Modal } from "..";
import useModal from "../../customHooks/useModal";

interface PaginationProps {
  total?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 1.5rem;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  lastPage,
  hasNextPage,
  ...props
}) => {
  const { isOpen, closeModal, openModal } = useModal()
  const handlePreviousPage = () => props.handlePrevPage();

  const handleNextPage = () => props.handleNextPage();

  return (
    <PaginationWrapper>
      <Button variant="text" onClick={openModal}>
        Page {currentPage} of {lastPage}
      </Button>
      <ButtonWrapper>
        <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextPage} disabled={!hasNextPage}>
          Next
        </Button>
      </ButtonWrapper>
      <Modal isOpen={isOpen} onClose={closeModal}>
        
      </Modal>
    </PaginationWrapper>
  );
};

export default Pagination;
