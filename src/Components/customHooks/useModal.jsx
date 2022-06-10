import { useState } from 'react';

export const useModal = () => {
  
  const [isOpen, setIsOpen] = useState('');

  const openModal = () => setIsOpen(true);
  
  const closeModal = () => setIsOpen(false);

  return [isOpen, openModal, closeModal];
};
