/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useContext } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import ModalStateContext from "./ModalStateContext";

const ConfirmationDialog = () => {
  const {
    isOpen,
    modalProps: { context, title, message, onConfirm, onCancel, onClose },
  } = useContext(ModalStateContext);

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={isOpen}
      onClose={(e) => onClose(e, context)}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => onConfirm(e, context)}>Confirm</Button>
        <Button
          color="secondary"
          autoFocus
          onClick={(e) => onCancel(e, context)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
