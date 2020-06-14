/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core/";
import {
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Dashboard as DashboardIcon,
  Loyalty as LoyaltyIcon,
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  FolderSpecial as FolderSpecialIcon,
  AttachMoney as AttachMoneyIcon,
  Search as SearchIcon,
} from "@material-ui/icons";

import { Link } from "react-router-dom";

const ListItemLink = (props) => {
  const { icon, primary, to } = props;
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={CustomLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};

export const mainListItems = (
  <div>
    <ListItemLink icon={<DashboardIcon />} primary="Dashboard" to="/" />
    <ListItemLink
      icon={<ShoppingCartIcon />}
      primary="Purchases"
      to="/purchases"
    />
    <ListItemLink icon={<LoyaltyIcon />} primary="Sales" to="/sales" />
    <ListItemLink icon={<StoreIcon />} primary="Brokers" to="/brokers" />
    <ListItemLink
      icon={<FolderSpecialIcon />}
      primary="Portfolios"
      to="/portfolios"
    />
    <ListItemLink icon={<BarChartIcon />} primary="Reports" to="/reports" />
    <ListItemLink
      icon={<AttachMoneyIcon />}
      primary="Income tax"
      to="/income-tax"
    />
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Stocks Prospection" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
