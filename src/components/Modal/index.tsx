import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #111827;
  padding: 20px;
  border-radius: 4px;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the modal content
    event.stopPropagation();

    // Call the onClose prop to close the modal
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the overlay
    event.stopPropagation();
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={handleContentClick}>{children}</ModalContent>
    </ModalOverlay>
  );
};

export default Modal;