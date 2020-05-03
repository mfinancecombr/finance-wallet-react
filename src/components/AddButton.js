/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const AddButton = ({ href }) => {
  const classes = useStyles();
  return (
    <Fab aria-label="add" className={classes.fab} color="primary" href={href}>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
