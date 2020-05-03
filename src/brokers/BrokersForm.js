/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { Grid, TextField } from "@material-ui/core";

import Form from "../components/Form";

const BrokersForm = ({ handleSubmit, handleChange, values }) => {
  return (
    <Form id="brokers-add" handleSubmit={handleSubmit}>
      <Grid item xs={12} md={12} lg={12}>
        <TextField
          fullWidth
          id="name"
          InputLabelProps={{
            shrink: true,
          }}
          label="Name"
          onChange={handleChange("name")}
          placeholder="CLEAR"
          required
          variant="outlined"
          value={values && values.name}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <TextField
          fullWidth
          id="cnpj"
          InputLabelProps={{
            shrink: true,
          }}
          label="CNPJ"
          onChange={handleChange("cnpj")}
          placeholder="00.000.000/0001-00"
          variant="outlined"
          value={values && values.cnpj}
        />
      </Grid>
    </Form>
  );
};

export default BrokersForm;
