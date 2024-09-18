import styled from "@emotion/styled";
import React, { useState } from "react";
import { Button, Modal } from "..";
import useModal from "../../customHooks/useModal";

interface PaginationProps {
  total?: number;
  currentPage: number;
  lastPage?: number;
  hasNextPage?: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleSelectedPage: (page: number) => void;
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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ModalLabel = styled.span`
    font-weight: bold;
    margin-right: 8px;
    font-size: 13px;
    flex: 1;
`;

const InputPage = styled.input`
  padding: 8px;
`

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  lastPage,
  hasNextPage,
  ...props
}) => {
  const { isOpen, closeModal, openModal } = useModal()
  const [page, setPage] = useState<number>(currentPage)
  const handlePreviousPage = () => props.handlePrevPage();

  const handleNextPage = () => props.handleNextPage();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => setPage(Number(event.currentTarget.value))

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    props.handleSelectedPage(page)
  }

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
        <form onSubmit={handleSubmit}>
          <ModalWrapper>
            <ModalLabel>Where page do you want to go?</ModalLabel>
            <InputPage type="number" pattern="/^[0-9]+$/" name="page" onChange={handleChange} />
            <Button>Go</Button>
          </ModalWrapper>
        </form>
      </Modal>
    </PaginationWrapper>
  );
};

export default Pagination;
