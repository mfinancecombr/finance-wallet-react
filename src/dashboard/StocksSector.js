/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

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

const StocksSector = ({ data, itemType }) => {
  const classes = useStyles();
  if (Object.keys(data.items).length === 0) {
    return null;
  }

  if (!data.items.hasOwnProperty(itemType)) {
    return null;
  }

  data = data.items[itemType];

  const sector = {};
  data.forEach((item) => {
    if (item.sector in sector) {
      sector[item.sector] += 1;
    } else {
      sector[item.sector] = 1;
    }
  });

  const items = [];
  Object.entries(sector).forEach(([key, value]) => {
    items.push({ name: key, value: value });
  });

  return (
    <Grid item xs={12} md={4} lg={6}>
      <Paper className={classes.paper}>
        <Title>{convertIdToTitle(itemType)} Sector</Title>
        <div style={{ width: "100%", height: 280 }}>
          <PieChart data={items} outerRadius={100} />
        </div>
      </Paper>
    </Grid>
  );
};

export default StocksSector;
