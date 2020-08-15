/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

import AddButton from "../components/AddButton";
import EmptyEntity from "../components/EmptyEntity";
import Loading from "../components/Loading";
import LotTable from "../components/LotTable";
import MFinanceHttpClient from "../MFinanceHttpClient";
import WithConfirmationDialog from "../components/WithConfirmationDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SalesAddButton = () => <AddButton href="/sales/add" />;

const Data = ({ rows, handleDeleteItem }) => {
  if (!rows || rows.length === 0) {
    return <EmptyEntity name="sales" />;
  }
  return (
    <WithConfirmationDialog>
      <LotTable type="sales" rows={rows} handleDeleteItem={handleDeleteItem} />
    </WithConfirmationDialog>
  );
};

const Sales = () => {
  const classes = useStyles();
  const [rows, setData] = useState({});
  const fetchData = () => {
    MFinanceHttpClient("GET_ALL", { entity: "sales" })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };
  const handleDeleteItem = (id) => {
    MFinanceHttpClient("DELETE", { entity: "operations", id: id })
      .then((data) => {
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FIXME
  if (rows && Object.keys(rows).length === 0 && rows.constructor === Object) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6" paragraph>
          Sales
        </Typography>
        <Data rows={rows} handleDeleteItem={handleDeleteItem} />
      </Paper>
      <SalesAddButton />
    </React.Fragment>
  );
};

export default Sales;
