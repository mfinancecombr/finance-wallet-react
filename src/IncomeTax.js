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

import Alert from "./components/Alert";
import EmptyEntity from "./components/EmptyEntity";
import Loading from "./components/Loading";
import MFinanceHttpClient from "./MFinanceHttpClient";
import { convertIdToTitle } from "./convertTypeIdToTitle";
import { convertToBRLMoney } from "./convertToBRLMoney";

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
                  {convertToBRLMoney(item.costBasis)}
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
                      .map((item) => item.costBasis)
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
  Object.entries(rows.items)
    .map(([_, value]) => value)
    .flat()
    .filter((asset) => asset.shares >= 1)
    .forEach((asset) => {
      if (asset.itemType in byType === false) {
        byType[asset.itemType] = [];
      }
      byType[asset.itemType].push(asset);
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
  const [error, setError] = useState({ hasError: false, message: "" });
  const [isLoading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState({});

  const handleChange = (event) => setYear(event.target.value);

  const classes = useStyles();

  const fetchPortfolio = async (year) => {
    setLoading(true);
    // FIXME Find a way to avoid fetching all portfolio data (removing items/costBasis/gain...). We only need a set of portfolio names.
    const portfolioID = "default";
    const payload = {
      entity: "portfolios",
      id: portfolioID,
      query: { year: year },
    };
    try {
      const portfolio = await MFinanceHttpClient("GET_ONE", payload);
      setPortfolio(portfolio);
    } catch (error) {
      if (error.response.status === 404) {
        setError({
          hasError: true,
          message: `Portfolio '${portfolioID}' not found. Try to add it!`,
        });
      } else {
        setError({ hasError: true, message: error.response.data });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio(year);
  }, [year]);

  if (error.hasError) {
    return (
      <React.Fragment>
        <Alert message={error.message} severity="error" />
        <EmptyEntity name="portfolios" />
      </React.Fragment>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  const total =
    Object.entries(portfolio.items)
      .map(([_, value]) => value)
      .flat()
      .filter((asset) => asset.shares >= 1)
      .reduce((prev, curr) => prev + curr.costBasis, 0) || 0;

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
          {[...Array(new Date().getFullYear() - 2014)].map((e, i) => {
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
