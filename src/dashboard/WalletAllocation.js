/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PieChart from "../components/PieChart";
import Title from "./Title";
import { convertIdToTitle } from "../convertTypeIdToTitle";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const WalletAllocation = ({ data }) => {
  const classes = useStyles();

  if (Object.keys(data.items).length === 0) {
    return null;
  }

  const items = [];
  Object.entries(data.items).forEach(([itemType, values]) => {
    const value = values
      .map((o) => o.costBasis)
      .reduce((a, c) => {
        return a + c;
      });
    items.push({ name: convertIdToTitle(itemType), value: value });
  });

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper className={classes.paper}>
        <Title>Wallet Allocation</Title>
        <div style={{ width: "100%", height: 170 }}>
          <PieChart data={items} outerRadius={50} isMoney />
        </div>
      </Paper>
    </Grid>
  );
};

export default WalletAllocation;
