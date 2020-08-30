/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import PieChart from "../components/PieChart";
import Title from "./Title";
import { convertIdToTitle } from "../convertTypeIdToTitle";

const Allocation = ({ data, itemType, height, isMoney }) => {
  const items = data.map((item) => {
    const total = item.costBasis + item.gain;
    return { name: item.symbol, value: total };
  });

  return (
    <React.Fragment>
      <Title>{convertIdToTitle(itemType)} Allocation</Title>
      <div style={{ width: "100%", height: height }}>
        <PieChart data={items} outerRadius={100} isMoney />
      </div>
    </React.Fragment>
  );
};

export default Allocation;
