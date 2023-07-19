import { useState } from 'react';

interface UseModalResult {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;