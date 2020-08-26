/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useEffect, useState } from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "moment/locale/pt-br";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import Form from "./Form";
import MFinanceHttpClient from "../MFinanceHttpClient";

const LotForm = ({ id, handleChange, handleSubmit, values }) => {
  const today =
    values && values.date ? values.date : moment().utc().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = React.useState(
    moment(today).utc().format("YYYY-MM-DD")
  );
  const handleDateChange = (date) => {
    if (!date) {
      return "";
    }
    const value = date.utc().format("YYYY-MM-DD");
    handleChange("date")({ target: { value: value } });
    setSelectedDate(value);
  };
  const [portfolios, setPortfolios] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const fetchPortfolios = () => {
    MFinanceHttpClient("GET_ALL", { entity: "portfolios" })
      .then((data) => {
        setPortfolios(data);
      })
      .catch((err) => console.error(err));
  };
  const fetchBrokers = () => {
    MFinanceHttpClient("GET_ALL", { entity: "brokers" })
      .then((data) => {
        setBrokers(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // FIXME
    handleChange("date")({ target: { value: today } });
    fetchPortfolios();
    fetchBrokers();
  }, []);

  //FIXME: duplicated
  const itemTypeList = [
    {
      value: "stocks",
      label: "Ações",
    },
    {
      value: "fiis",
      label: "Fundo Imobiliário",
    },
    {
      value: "certificates-of-deposit",
      label: "CDB",
    },
    {
      value: "treasuries-direct",
      label: "Tesouro Direto",
    },
    {
      value: "stocks-funds",
      label: "Fundos de ações",
    },
    {
      value: "ficfi",
      label: "FICFI",
    },
  ];

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Form id="sales-add" handleSubmit={handleSubmit}>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="portfolioSlug"
            InputLabelProps={{
              shrink: true,
            }}
            label="Portfolio"
            onChange={handleChange("portfolioSlug")}
            required
            select
            value={values.portfolioSlug}
            variant="outlined"
          >
            {portfolios &&
              portfolios.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="itemType"
            InputLabelProps={{
              shrink: true,
            }}
            label="Type"
            onChange={handleChange("itemType")}
            required
            select
            value={values.itemType}
            variant="outlined"
          >
            {itemTypeList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="broker"
            InputLabelProps={{
              shrink: true,
            }}
            label="Broker"
            onChange={handleChange("brokerSlug")}
            required
            select
            value={values.brokerSlug}
            variant="outlined"
          >
            {brokers &&
              brokers.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <KeyboardDatePicker
            autoOk
            format="DD/MM/YYYY"
            fullWidth
            id="date"
            InputAdornmentProps={{ position: "start" }}
            inputVariant="outlined"
            label="Date"
            onChange={handleDateChange}
            orientation="landscape"
            required
            value={selectedDate}
            variant="inline"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="symbol"
            InputLabelProps={{
              shrink: true,
            }}
            label="Symbol"
            onChange={handleChange("symbol")}
            placeholder="PETR4"
            required
            value={values.symbol}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="shares"
            InputLabelProps={{
              shrink: true,
            }}
            label="Shares"
            onChange={handleChange("shares")}
            placeholder="100"
            required
            type="number"
            value={values.shares}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="price"
            InputLabelProps={{
              shrink: true,
            }}
            label="Price"
            onChange={handleChange("price")}
            placeholder="7"
            required
            type="number"
            value={values.price}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="commission"
            InputLabelProps={{
              shrink: true,
            }}
            label="Commission"
            onChange={handleChange("commission")}
            placeholder="0"
            type="number"
            value={values.commission}
            variant="outlined"
          />
        </Grid>
      </Form>
    </MuiPickersUtilsProvider>
  );
};

export default LotForm;
