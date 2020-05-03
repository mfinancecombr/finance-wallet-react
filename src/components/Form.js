/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Form = ({ id, handleSubmit, children }) => {
  const classes = useStyles();
  return (
    <form id={id} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {children}
        <Grid item xs={12} md={12} lg={12}>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
