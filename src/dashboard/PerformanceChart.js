/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartTooltip from "../components/ChartTooltip";
import Title from "./Title";
import { chartColors } from "../chartColors";
import { convertIdToTitle } from "../convertTypeIdToTitle";

const Performance = ({ data, itemType, height }) => {
  const items = data.map((item) => {
    return { name: item.symbol, [item.symbol]: item.gain };
  });

  return (
    <React.Fragment>
      <Title>{convertIdToTitle(itemType)} Performance</Title>
      <div style={{ width: "100%", height: height }}>
        <ResponsiveContainer>
          <BarChart width={500} height={300} data={items} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartTooltip />} isMoney />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            {items.map((entry, index) => (
              <Bar
                key={entry.name}
                dataKey={entry.name}
                stackId="stack"
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default Performance;
