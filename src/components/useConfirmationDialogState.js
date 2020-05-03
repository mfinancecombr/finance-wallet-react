/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import { useState } from "react";

const useConfirmationDialogState = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState.isOpen);
  const [modalProps, setModalProps] = useState(initialState.modalProps);
  const setModalState = ({ isOpen, modalProps = {} }) => {
    setIsOpen(isOpen);
    setModalProps(modalProps);
  };
  return [{ isOpen, modalProps }, setModalState];
};

export default useConfirmationDialogState;
