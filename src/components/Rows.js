/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { TableCell } from "@material-ui/core";

import { convertToBRLFloat } from "../convertToBRLFloat";
import { convertToBRLMoney } from "../convertToBRLMoney";

const GenericRow = ({ children, color, align, type }) => {
  color = color ? color : parseFloat(children, 10) > 0 ? "#008000" : "#f44336";
  switch (type) {
    case "money":
      children = convertToBRLMoney(children);
      break;
    case "float":
      children = convertToBRLFloat(children);
      break;
    case "percentage":
      children = `${convertToBRLFloat(children)}%`;
      break;
    default:
  }

  align = align ? align : "right";

  return (
    <TableCell align={align}>
      <span style={{ color: color, fontWeight: 700 }}>{children}</span>
    </TableCell>
  );
};

export const IntegerRow = ({ children, color, align }) => (
  <GenericRow color={color} align={align}>
    {children}
  </GenericRow>
);

export const FloatRow = ({ children, color }) => (
  <GenericRow color={color} tupe="float">
    {children}
  </GenericRow>
);

export const MoneyRow = ({ children, color, align }) => (
  <GenericRow color={color} align={align} type="money">
    {children}
  </GenericRow>
);

export const PercentageRow = ({ children, color, align }) => (
  <GenericRow color={color} align={align} type="percentage">
    {children}
  </GenericRow>
);
