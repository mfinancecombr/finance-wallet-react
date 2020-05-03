/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import MFinanceHttpClient from "../MFinanceHttpClient";
import LotForm from "../components/LotForm";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const PurchasesEdit = () => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const { id, itemType } = useParams();
  const fetchData = () => {
    MFinanceHttpClient("GET_ONE", { entity: `${itemType}/purchases`, id: id })
      .then((data) => {
        setValues(data);
      })
      .catch((err) => console.error(err));
  };
  const handleUpdateItem = (event) => {
    event.preventDefault();
    MFinanceHttpClient("UPDATE", {
      entity: `${itemType}/purchases`,
      formData: values,
    })
      .then((data) => {
        window.location.href = "/purchases";
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (Object.keys(values).length === 0 && values.constructor === Object) {
      fetchData();
    }
  });

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
        Edit purchase
      </Typography>
      <LotForm
        handleChange={handleChange}
        handleSubmit={handleUpdateItem}
        id="purchases-edit"
        values={values}
      />
    </Paper>
  );
};

export default PurchasesEdit;
