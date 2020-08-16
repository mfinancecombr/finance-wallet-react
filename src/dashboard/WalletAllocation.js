/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import PieChart from "../components/PieChart";
import Title from "./Title";
import { convertIdToTitle } from "../convertTypeIdToTitle";

const WalletAllocation = ({ data }) => {
  const sector = {};
  Object.entries(data.items).forEach(([key, value]) => {
    if (value.itemType in sector) {
      sector[value.itemType] += value.costBasis;
    } else {
      sector[value.itemType] = value.costBasis;
    }
  });

  const items = [];
  Object.entries(sector).forEach(([key, value]) => {
    items.push({ name: convertIdToTitle(key), value: value });
  });

  return (
    <React.Fragment>
      <Title>Wallet Allocation</Title>
      <div style={{ width: "100%", height: 170 }}>
        <PieChart data={items} outerRadius={50} isMoney />
      </div>
    </React.Fragment>
  );
};

export default WalletAllocation;
