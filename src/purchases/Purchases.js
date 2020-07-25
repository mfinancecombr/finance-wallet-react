/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const PurchasesAddButton = () => <AddButton href="/purchases/add" />;

const Data = ({ rows, handleDeleteItem }) => {
  if (!rows || rows.length === 0) {
    return <EmptyEntity name="purchases" />;
  }
  return (
    <WithConfirmationDialog>
      <LotTable
        type="purchases"
        rows={rows}
        handleDeleteItem={handleDeleteItem}
      />
    </WithConfirmationDialog>
  );
};

const Purchases = () => {
  const classes = useStyles();
  const [rows, setData] = useState({});
  const fetchData = () => {
    MFinanceHttpClient("GET_ALL", { entity: "purchases" }).then((data) => {
      setData(data);
    });
  };
  const handleDeleteItem = (id) => {
    MFinanceHttpClient("DELETE", { entity: "purchases", id: id }).then(
      (data) => {
        fetchData();
      }
    );
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
          Purchases
        </Typography>
        <Data rows={rows} handleDeleteItem={handleDeleteItem} />
      </Paper>
      <PurchasesAddButton />
    </React.Fragment>
  );
};

export default Purchases;
