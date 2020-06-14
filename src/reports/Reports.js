/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { MoneyRow, PercentageRow } from "../components/Rows";

import Loading from "../components/Loading";
import MFinanceHttpClient from "../MFinanceHttpClient";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(3),
  },
  isConsolidated: {
    padding: "6px 24px 6px 16px",
    fontWeight: "bold",
  },
  isMonth: {
    padding: "6px 24px 6px 32px",
  },
}));

const DataTable = ({ items }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Variação (R$)</TableCell>
            <TableCell align="right">Variação (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              style={
                index % 2
                  ? { backgroundColor: "rgba(242,242,242,0.5)" }
                  : { backgroundColor: "" }
              }
            >
              <TableCell
                className={
                  item.isConsolidated ? classes.isConsolidated : classes.isMonth
                }
              >
                {item.date}
              </TableCell>
              <MoneyRow>{item.value}</MoneyRow>
              <PercentageRow>{item.percentage}</PercentageRow>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Reports = () => {
  const classes = useStyles();
  const items = [
    {
      date: "2020",
      value: -32403.64,
      percentage: -18.11,
      isConsolidated: true,
    },
    { date: "Junho", value: 10562.23, percentage: 7.77, isConsolidated: false },
    { date: "Maio", value: 10197.28, percentage: 8.11, isConsolidated: false },
    {
      date: "Abril",
      value: 12228.17,
      percentage: 10.77,
      isConsolidated: false,
    },
    {
      date: "Março",
      value: -45516.39,
      percentage: -30.98,
      isConsolidated: false,
    },
    {
      date: "Fevereiro",
      value: -17543.03,
      percentage: -10.67,
      isConsolidated: false,
    },
    {
      date: "Janeiro",
      value: -2331.9,
      percentage: -1.43,
      isConsolidated: false,
    },
    { date: "2019", value: 18002.69, percentage: 14.25, isConsolidated: true },
  ];

  // FIXME
  if (items.constructor === Object && Object.keys(items).length === 0) {
    return <Loading />;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        Reports
      </Typography>
      <Typography variant="h6" paragraph>
        Yield
      </Typography>
      <DataTable items={items} />
    </Paper>
  );
};

export default Reports;
