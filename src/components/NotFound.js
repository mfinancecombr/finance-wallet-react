/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <React.Fragment>
    <h1>Oops! That page can’t be found.</h1>
    <p>
      It looks like nothing was found at this location. Maybe try one of the
      links in the menu or press back to go to the previous page.
    </p>
    <Link to="/">Go to Home </Link>
  </React.Fragment>
);

export default NotFound;
