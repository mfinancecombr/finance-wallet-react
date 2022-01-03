/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React, { useContext } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

import { convertToBRLMoney } from "../convertToBRLMoney";
import ModalUpdaterContext from "../components//ModalUpdaterContext";
import TableCellWithLink from "../components/TableCellWithLink";

const convertStringToDate = (date) => {
  return moment(date).utc().format("DD/MM/YYYY");
};

const LotTable = ({ rows, type, handleDeleteItem }) => {
  const setModalOptions = useContext(ModalUpdaterContext);
  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Commission</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell>Broker</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => {
              // FIXME
              const modalProps = {
                context: row._id,
                message: `Are you sure you want to delete "${row.symbol}"?`,
                title: `Delete ${row.itemType}`,
                onConfirm: (_, context) => {
                  handleDeleteItem(context);
                  setModalOptions({ isOpen: false });
                },
                onClose: () => setModalOptions({ isOpen: false }),
                onCancel: () => setModalOptions({ isOpen: false }),
              };

              const editLink = `/${row.itemType}/${type}/${row._id}/edit`;

              return (
                <TableRow key={row._id} hover>
                  <TableCellWithLink link={editLink}>
                    <strong>{row.symbol}</strong>
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {row.shares}
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {convertToBRLMoney(row.price)}
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {convertToBRLMoney(row.commission)}
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {convertStringToDate(row.date)}
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {row.itemType}
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {row.portfolioSlug}
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {row.brokerSlug}
                  </TableCellWithLink>
                  <TableCellWithLink link={editLink}>
                    {convertToBRLMoney(row.shares * row.price + row.commission)}
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

export default LotTable;
