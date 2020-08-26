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

const BrokersAddButton = () => <AddButton href="/brokers/add" />;

const BrokersTable = ({ rows, handleDeleteItem }) => {
  const setModalOptions = useContext(ModalUpdaterContext);

  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Slug</TableCell>
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
              title: "Delete broker",
              onConfirm: (_, context) => {
                handleDeleteItem(context);
                setModalOptions({ isOpen: false });
              },
              onBackdropClick: () => setModalOptions({ isOpen: false }),
              onCancel: () => setModalOptions({ isOpen: false }),
            };

            const editLink = `/brokers/${row.slug}/edit`;

            return (
              <TableRow key={row.name} hover>
                <TableCellWithLink link={editLink}>
                  {row.slug}
                </TableCellWithLink>
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
    return <EmptyEntity name="brokers" />;
  }
  return (
    <WithConfirmationDialog>
      <BrokersTable rows={rows} handleDeleteItem={handleDeleteItem} />
    </WithConfirmationDialog>
  );
};

const Brokers = () => {
  const classes = useStyles();
  const [rows, setData] = useState({});
  const fetchData = () => {
    MFinanceHttpClient("GET_ALL", { entity: "brokers" }).then((data) => {
      setData(data);
    });
  };
  const handleDeleteItem = (id) => {
    MFinanceHttpClient("DELETE", { entity: "brokers", id: id }).then((data) => {
      fetchData();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FIXME
  if (Object.keys(rows).length === 0 && rows.constructor === Object) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6" paragraph>
          Brokers
        </Typography>
        <Data rows={rows} handleDeleteItem={handleDeleteItem} />
      </Paper>
      <BrokersAddButton />
    </React.Fragment>
  );
};

export default Brokers;
