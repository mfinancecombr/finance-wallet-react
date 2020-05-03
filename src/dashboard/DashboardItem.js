/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Allocation from "./Allocation";
import PerformanceChart from "./PerformanceChart";
import WalletItems from "./WalletItems";

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

const DashboardItem = ({
  itemType,
  rows,
  allocationHeight,
  performanceHeight,
}) => {
  const classes = useStyles();
  // FIXME
  const aHeight = allocationHeight ? allocationHeight : 240;
  const pHeight = performanceHeight ? performanceHeight : 240;
  const aLg = performanceHeight ? 6 : 4;
  const pLg = performanceHeight ? 12 : 8;

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={aLg}>
        <Paper className={classes.paper}>
          <Allocation data={rows} itemType={itemType} height={aHeight} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={pLg}>
        <Paper className={classes.paper}>
          <PerformanceChart data={rows} itemType={itemType} height={pHeight} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <WalletItems data={rows} itemType={itemType} />
        </Paper>
      </Grid>
    </React.Fragment>
  );
};
export default DashboardItem;
