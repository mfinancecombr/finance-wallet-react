/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import { Alert, AlertTitle } from "@material-ui/lab";

const EmptyEntity = ({ name, button }) => (
  <React.Fragment>
    <Alert severity="warning">
      <AlertTitle>Warning</AlertTitle>
      There are no <strong>{name}</strong>! Please, add one...
    </Alert>
    {button}
  </React.Fragment>
);

export default EmptyEntity;
