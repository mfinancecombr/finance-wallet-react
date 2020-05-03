/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import Chart from "./Chart";
import conf from "../conf";
import CurrentEquity from "./CurrentEquity";
import DashboardItem from "./DashboardItem";
import Loading from "../components/Loading";
import MFinanceHttpClient from "../MFinanceHttpClient";
import StocksSector from "./StocksSector";
import WalletAllocation from "./WalletAllocation";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [rows, setData] = useState({});
  const fetchData = () => {
    // FIXME
    const payload = { entity: "portfolios", id: "default" };
    MFinanceHttpClient("GET_ONE", payload).then((data) => {
      setData(data);
    });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      console.debug("Updating...");
      fetchData();
    }, conf.walletRefreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  // FIXME
  if (Object.keys(rows).length === 0) {
    return <Loading />;
  }

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={5}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>

      {/* CurrentEquity */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <CurrentEquity
            costBasics={rows.costBasics}
            gain={rows.gain}
            overallReturn={rows.overallReturn}
          />
        </Paper>
      </Grid>

      {/* Wallet Allocation */}
      <Grid item xs={12} md={6} lg={4}>
        <Paper className={classes.paper}>
          <WalletAllocation data={rows} />
        </Paper>
      </Grid>

      {/* Stocks Sector */}
      <Grid item xs={12} md={4} lg={6}>
        <Paper className={classes.paper}>
          <StocksSector data={rows} itemType="stocks" />
        </Paper>
      </Grid>

      <DashboardItem
        rows={rows}
        itemType="stocks"
        allocationHeight={280}
        performanceHeight={320}
      />
      <DashboardItem rows={rows} itemType="fiis" />
      <DashboardItem rows={rows} itemType="treasuries-direct" />
      <DashboardItem rows={rows} itemType="stocks-funds" />
      <DashboardItem rows={rows} itemType="certificates-of-deposit" />
      <DashboardItem rows={rows} itemType="ficfi" />
    </Grid>
  );
};

export default Dashboard;
