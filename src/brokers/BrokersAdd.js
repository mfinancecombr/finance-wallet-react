/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MFinanceHttpClient from "../MFinanceHttpClient";
import BrokersForm from "./BrokersForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const BrokersAdd = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    MFinanceHttpClient("CREATE", { entity: "brokers", formData: values }).then(
      () => {
        window.location.href = "/brokers";
      }
    );
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        Add brokers
      </Typography>
      <BrokersForm
        id="brokers-add"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Paper>
  );
};

export default BrokersAdd;
