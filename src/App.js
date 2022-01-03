/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";

import Brokers from "./brokers/Brokers";
import BrokersAdd from "./brokers/BrokersAdd";
import BrokersEdit from "./brokers/BrokersEdit";
import Dashboard from "./dashboard/Dashboard";
import IncomeTax from "./IncomeTax";
import NotFound from "./components/NotFound";
import Portfolios from "./portfolios/Portfolios";
import PortfoliosAdd from "./portfolios/PortfoliosAdd";
import PortfoliosEdit from "./portfolios/PortfoliosEdit";
import Purchases from "./purchases/Purchases";
import PurchasesAdd from "./purchases/PurchasesAdd";
import PurchasesEdit from "./purchases/PurchasesEdit";
import Sales from "./sales/Sales";
import SalesAdd from "./sales/SalesAdd";
import SalesEdit from "./sales/SalesEdit";
import { mainListItems, secondaryListItems } from "./menuItems";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              MFinance
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Routes>
              <Route exact path="/portfolios/add" element={<PortfoliosAdd />} />
              <Route
                exact
                path="/portfolios/:slug/edit"
                element={<PortfoliosEdit />}
              />
              <Route exact path="/portfolios" element={<Portfolios />} />
              <Route
                exact
                path="/:itemType/sales/:id/edit"
                element={<SalesEdit />}
              />
              <Route exact path="/sales/add" element={<SalesAdd />} />
              <Route exact path="/sales" element={<Sales />} />
              <Route exact path="/purchases/add" element={<PurchasesAdd />} />
              <Route
                exact
                path="/:itemType/purchases/:id/edit"
                element={<PurchasesEdit />}
              />
              <Route exact path="/purchases" element={<Purchases />} />
              <Route exact path="/brokers/add" element={<BrokersAdd />} />
              <Route
                exact
                path="/brokers/:slug/edit"
                element={<BrokersEdit />}
              />
              <Route exact path="/brokers" element={<Brokers />} />
              <Route exact path="/income-tax" element={<IncomeTax />} />
              <Route exact path="/" element={<Dashboard />} />
              <Route path={"*"} element={NotFound} />
            </Routes>
          </Container>
        </main>
      </div>
    </Router>
  );
};

export default App;
