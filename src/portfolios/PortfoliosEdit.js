/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MFinanceHttpClient from "../MFinanceHttpClient";
import PortfolioForm from "./PortfolioForm";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const PortfolioEdit = () => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const { slug } = useParams();

  const fetchData = () => {
    MFinanceHttpClient("GET_ONE", { entity: "portfolios", slug: slug })
      .then((data) => {
        setValues(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (Object.keys(values).length === 0 && values.constructor === Object) {
      fetchData();
    }
  });

  const handleUpdateItem = (event) => {
    event.preventDefault();

    // FIXME: Only update name/slug
    delete values.items;
    delete values.costBasis;
    delete values.gain;
    delete values.overallReturn;

    MFinanceHttpClient("UPDATE", { entity: "portfolios", formData: values })
      .then((data) => {
        window.location.href = "/portfolios";
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // FIXME
  if (Object.keys(values).length === 0 && values.constructor === Object) {
    return <Loading />;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        Edit portfolio
      </Typography>
      <PortfolioForm
        id="portfolio-edit"
        handleSubmit={handleUpdateItem}
        handleChange={handleChange}
        values={values}
      />
    </Paper>
  );
};

export default PortfolioEdit;
