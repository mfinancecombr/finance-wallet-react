/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MFinanceHttpClient from "../MFinanceHttpClient";
import LotForm from "../components/LotForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SalesAdd = () => {
  const classes = useStyles();
  // FIXME: duplicated
  const [values, setValues] = useState({
    brokerId: "",
    commission: "",
    date: "",
    itemType: "",
    portfolioId: "",
    price: "",
    shares: "",
    symbol: "",
    type: "sale",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const itemType = values["itemType"];
    MFinanceHttpClient("CREATE", {
      entity: `${itemType}/operations`,
      formData: values,
    })
      .then(() => {
        window.location.href = "/sales";
      })
      .catch((err) => console.error(err));
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        Add sales
      </Typography>
      <LotForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        id="sales-add"
        values={values}
      />
    </Paper>
  );
};

export default SalesAdd;
