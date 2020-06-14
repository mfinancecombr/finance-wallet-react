/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";

import { FloatRow, IntegerRow, MoneyRow } from "../components/Rows";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

// FIXME
const headCells = [
  { id: "symbol", numeric: false, label: "Symbol" },
  { id: "shares", numeric: true, label: "Shares" },
  { id: "costBasics", numeric: true, label: "Cost Basics" },
  { id: "commission", numeric: true, label: "Commission" },
  { id: "averagePrice", numeric: true, label: "Avg Price" },
  { id: "gain", numeric: true, label: "Gain" },
  { id: "overallReturn", numeric: true, label: "Overall Return %" },
  { id: "change", numeric: true, label: "Change %" },
  { id: "lastPrice", numeric: true, label: "Last Price" },
  { id: "closingPrice", numeric: true, label: "Closing Price" },
  { id: "lastYearLow", numeric: true, label: "52w low" },
  { id: "lastYearHigh", numeric: true, label: "52w high" },
];

const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  container: {},
}));

const EnhancedTable = ({ data, itemType, perPage }) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("change");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(perPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var rows = [];
  for (var item in data.items) {
    data.items[item].symbol = item;
    if (data.items[item].itemType === itemType) {
      rows.push(data.items[item]);
    }
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const items = stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow
          hover
          role="checkbox"
          tabIndex={-1}
          key={row.symbol}
          style={
            index % 2
              ? { backgroundColor: "rgba(242,242,242,0.5)" }
              : { backgroundColor: "" }
          }
        >
          <TableCell>
            <Tooltip title={row.name}>
              <span style={{ fontWeight: 700 }}>{row.symbol}</span>
            </Tooltip>
          </TableCell>
          <IntegerRow color="gray">{row.shares}</IntegerRow>
          <MoneyRow color="gray">{row.costBasics}</MoneyRow>
          <MoneyRow color="gray">{row.commission}</MoneyRow>
          <MoneyRow color="gray">{row.averagePrice}</MoneyRow>
          <MoneyRow>{row.gain}</MoneyRow>
          <FloatRow>{row.overallReturn}</FloatRow>
          <FloatRow>{row.change}</FloatRow>
          <MoneyRow color="orange">{row.lastPrice}</MoneyRow>
          <MoneyRow color="blue">{row.closingPrice}</MoneyRow>
          <MoneyRow color="gray">{row.lastYearLow}</MoneyRow>
          <MoneyRow color="gray">{row.lastYearHigh}</MoneyRow>
        </TableRow>
      );
    });

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky table"
          className={classes.table}
          padding="none"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {items}
            {emptyRows > 0 && (
              <TableRow style={{ height: 16 * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default EnhancedTable;
