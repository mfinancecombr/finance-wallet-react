/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const Loading = () => (
  <List>
    <ListItem>
      <CircularProgress disableShrink />
      <ListItemText inset primary="Loading..." />
    </ListItem>
  </List>
);

export default Loading;
