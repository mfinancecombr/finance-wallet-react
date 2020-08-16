/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Title from "./Title";
import { convertToBRLMoney } from "../convertToBRLMoney";
import { convertToBRLFloat } from "../convertToBRLFloat";

const useStyles = makeStyles({
  overallReturn: ({ overallReturn }) => ({
    color: parseFloat(overallReturn, 10) > 0 ? "green" : "red",
    flex: 1,
  }),
});

const CurrentEquity = ({ gain, overallReturn, costBasis }) => {
  const currentEquity = convertToBRLMoney(costBasis + gain);
  const classes = useStyles({ overallReturn });
  return (
    <React.Fragment>
      <Title>Current equity</Title>
      <Typography component="p" variant="h4">
        {currentEquity}
      </Typography>
      <Typography className={classes.overallReturn}>
        {convertToBRLFloat(overallReturn)}%
      </Typography>
    </React.Fragment>
  );
};

export default CurrentEquity;
