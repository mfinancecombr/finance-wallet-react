/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import PieChart from "../components/PieChart";
import Title from "./Title";
import { convertIdToTitle } from "../convertTypeIdToTitle";

const StocksSector = ({ data, itemType }) => {
  const sector = {};
  Object.entries(data.items).forEach(([key, value]) => {
    if (value.itemType !== itemType) {
      return;
    }
    if (value.sector in sector) {
      sector[value.sector] += 1;
    } else {
      sector[value.sector] = 1;
    }
  });

  const items = [];
  Object.entries(sector).forEach(([key, value]) => {
    items.push({ name: key, value: value });
  });

  return (
    <React.Fragment>
      <Title>{convertIdToTitle(itemType)} Sector</Title>
      <div style={{ width: "100%", height: 280 }}>
        <PieChart data={items} outerRadius={100} />
      </div>
    </React.Fragment>
  );
};

export default StocksSector;
