/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MFinanceHttpClient from "../MFinanceHttpClient";
import PortfolioForm from "./PortfolioForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const PorfolioAdd = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    MFinanceHttpClient("CREATE", {
      entity: "portfolios",
      formData: values,
    }).then(() => {
      window.location.href = "/portfolios";
    });
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        Add portfolios
      </Typography>
      <PortfolioForm
        id="portfolio-add"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Paper>
  );
};

export default PorfolioAdd;
