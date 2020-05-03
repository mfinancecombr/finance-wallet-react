/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { Grid, TextField } from "@material-ui/core";

import Form from "../components/Form";

const PortfolioForm = ({ handleSubmit, handleChange, values }) => {
  return (
    <Form id="portfolio-add" handleSubmit={handleSubmit}>
      <Grid item xs={12} md={12} lg={12}>
        <TextField
          fullWidth
          id="name"
          InputLabelProps={{
            shrink: true,
          }}
          label="Name"
          onChange={handleChange("name")}
          placeholder="default"
          required
          variant="outlined"
          value={values && values.name}
        />
      </Grid>
    </Form>
  );
};

export default PortfolioForm;
