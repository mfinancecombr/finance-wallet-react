/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rowLink: {
    cursor: "pointer",
  },
}));

const TableCellWithLink = ({ children, link }) => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <TableCell className={classes.rowLink} onClick={() => history.push(link)}>
      {children}
    </TableCell>
  );
};

export default TableCellWithLink;
