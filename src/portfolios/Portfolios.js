/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useState, useEffect, useContext } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";

import AddButton from "../components/AddButton";
import EmptyEntity from "../components/EmptyEntity";
import Loading from "../components/Loading";
import MFinanceHttpClient from "../MFinanceHttpClient";
import ModalUpdaterContext from "../components/ModalUpdaterContext";
import TableCellWithLink from "../components/TableCellWithLink";
import WithConfirmationDialog from "../components/WithConfirmationDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const PortfoliosAddButton = () => <AddButton href="/portfolios/add" />;

const PortfoliosTable = ({ rows, handleDeleteItem }) => {
  const setModalOptions = useContext(ModalUpdaterContext);
  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            // FIXME
            const modalProps = {
              context: row.id,
              message: `Are you sure you want to delete "${row.name}"?`,
              title: "Delete portfolio",
              onConfirm: (_, context) => {
                handleDeleteItem(context);
                setModalOptions({ isOpen: false });
              },
              onClose: () => setModalOptions({ isOpen: false }),
              onCancel: () => setModalOptions({ isOpen: false }),
            };

            const editLink = `/portfolios/${row.id}/edit`;

            return (
              <TableRow key={row.id} hover>
                <TableCellWithLink link={editLink}>{row.id}</TableCellWithLink>
                <TableCellWithLink link={editLink}>
                  {row.name}
                </TableCellWithLink>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      setModalOptions({ isOpen: true, modalProps })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Data = ({ rows, handleDeleteItem }) => {
  if (rows.length === 0) {
    return <EmptyEntity name="portfolios" />;
  }
  return (
    <WithConfirmationDialog>
      <PortfoliosTable rows={rows} handleDeleteItem={handleDeleteItem} />
    </WithConfirmationDialog>
  );
};

const Portfolios = () => {
  const classes = useStyles();
  const [rows, setData] = useState({});
  const fetchData = () => {
    MFinanceHttpClient("GET_ALL", { entity: "portfolios" }).then((data) => {
      setData(data);
    });
  };
  const handleDeleteItem = (id) => {
    MFinanceHttpClient("DELETE", { entity: "portfolios", id: id }).then(
      (data) => {
        fetchData();
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FIXME
  if (rows.constructor === Object && Object.keys(rows).length === 0) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6" paragraph>
          Portfolios
        </Typography>
        <Data rows={rows} handleDeleteItem={handleDeleteItem} />
      </Paper>
      <PortfoliosAddButton />
    </React.Fragment>
  );
};

export default Portfolios;
