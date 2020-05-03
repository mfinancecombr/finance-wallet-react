/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import ConfirmationDialog from "./ConfirmationDialog";
import ModalStateContext from "./ModalStateContext";
import ModalUpdaterContext from "./ModalUpdaterContext";
import useConfirmationDialogState from "./useConfirmationDialogState";

const WithConfirmationDialog = ({ children }) => {
  const [modalOptions, setModalOptions] = useConfirmationDialogState({
    isOpen: false,
    modalProps: {},
  });

  return (
    <ModalUpdaterContext.Provider value={setModalOptions}>
      <ModalStateContext.Provider value={modalOptions}>
        <ConfirmationDialog />
        {children}
      </ModalStateContext.Provider>
    </ModalUpdaterContext.Provider>
  );
};

export default WithConfirmationDialog;
