/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "./components/Loading";
import MFinanceHttpClient from "./MFinanceHttpClient";
import { convertToBRLMoney } from "./convertToBRLMoney";
import { convertIdToTitle } from "./convertTypeIdToTitle";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(3),
  },
  yearSelect: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    minWidth: 120,
  },
}));

const DataTable = ({ items, itemType }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        {convertIdToTitle(itemType)}
      </Typography>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Broker</TableCell>
              <TableCell align="right">Shares</TableCell>
              <TableCell align="right">Average Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={item.symbol}
                style={
                  index % 2
                    ? { backgroundColor: "rgba(242,242,242,0.5)" }
                    : { backgroundColor: "" }
                }
              >
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.brokerId}</TableCell>
                <TableCell align="right">{item.shares}</TableCell>
                <TableCell align="right">
                  {convertToBRLMoney(item.averagePrice)}
                </TableCell>
                <TableCell align="right">
                  {convertToBRLMoney(item.costBasics)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell colSpan={1}>
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  {convertToBRLMoney(
                    items
                      .map((item) => item.costBasics)
                      .reduce((prev, next) => prev + next)
                  )}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const Data = ({ rows }) => {
  const byType = {};
  Object.entries(rows.items).forEach(([key, value]) => {
    if (value.shares < 1) {
      return;
    }
    value.symbol = key;
    if (value.itemType in byType) {
      byType[value.itemType].push(value);
    } else {
      byType[value.itemType] = [value];
    }
  });

  return (
    <div>
      {Object.entries(byType).map(([key, value]) => {
        return <DataTable key={key} itemType={key} items={value} />;
      })}
    </div>
  );
};

const IncomeTax = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [year, setYear] = React.useState(currentYear - 1);

  const handleChange = (event) => {
    const year = event.target.value;
    setYear(year);
    fetchPortfolio(year);
  };

  const classes = useStyles();

  const [portfolio, setPortfolio] = useState({});

  // FIXME called twice on init
  const fetchPortfolio = (year) => {
    // FIXME
    const payload = {
      entity: "portfolios",
      id: "default",
      query: { year: year },
    };
    MFinanceHttpClient("GET_ONE", payload).then((data) => {
      setPortfolio(data);
    });
  };

  useEffect(() => {
    fetchPortfolio(year);
  }, [year]);

  // FIXME
  if (portfolio.constructor === Object && Object.keys(portfolio).length === 0) {
    return <Loading />;
  }

  // FIXME
  let total = 0;
  Object.entries(portfolio.items).forEach(([key, value]) => {
    if (value.shares < 1) {
      return;
    }
    total += value.costBasics;
  });

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" paragraph>
        Income Tax
      </Typography>
      <FormControl variant="outlined" className={classes.yearSelect}>
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          id="year"
          value={year}
          onChange={handleChange}
          label="Year"
        >
          {[...Array(6)].map((e, i) => {
            const year = 2015 + i;
            return (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Typography component="p" paragraph>
        Total: {convertToBRLMoney(total)}
      </Typography>
      <Data rows={portfolio} />
    </Paper>
  );
};

export default IncomeTax;