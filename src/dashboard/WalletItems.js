/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import Table from "./Table";
import Title from "./Title";
import { convertIdToTitle } from "../convertTypeIdToTitle";

const WalletItems = ({ data, itemType }) => {
  // FIXME
  const perPage = itemType === "stocks" ? 20 : 10;
  return (
    <React.Fragment>
      <Title>{convertIdToTitle(itemType)} items</Title>
      <Table data={data} itemType={itemType} perPage={perPage} />
    </React.Fragment>
  );
};

export default WalletItems;
