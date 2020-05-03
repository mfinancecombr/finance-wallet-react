/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import BrokersForm from "./BrokersForm";
import Loading from "../components/Loading";
import MFinanceHttpClient from "../MFinanceHttpClient";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const BrokersEdit = () => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const { id } = useParams();

  const fetchData = () => {
    MFinanceHttpClient("GET_ONE", { entity: "brokers", id: id })
      .then((data) => {
        setValues(data);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateItem = (event) => {
    event.preventDefault();
    MFinanceHttpClient("UPDATE", { entity: "brokers", formData: values })
      .then((data) => {
        window.location.href = "/brokers";
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (Object.keys(values).length === 0 && values.constructor === Object) {
      fetchData();
    }
  });

  // FIXME
  if (Object.keys(values).length === 0 && values.constructor === Object) {
    return <Loading />;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        Edit broker
      </Typography>
      <BrokersForm
        id="brokers-edit"
        handleSubmit={handleUpdateItem}
        handleChange={handleChange}
        values={values}
      />
    </Paper>
  );
};

export default BrokersEdit;
