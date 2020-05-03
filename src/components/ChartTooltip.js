import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { convertToBRLMoney } from "../convertToBRLMoney";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap",
  },
}));

const ChartTooltip = ({ active, payload, label, isMoney }) => {
  const classes = useStyles();
  if (active) {
    const value = isMoney
      ? convertToBRLMoney(payload[0].value)
      : payload[0].value;

    return (
      <div className={classes.tooltip}>
        <p className={classes.label}>{`${payload[0].name}: ${value}`}</p>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
