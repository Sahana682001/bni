import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { label: "Total Members", value: 31 },
  { label: "Total Referrals", value: 2 },
  { label: "Active Members", value: 28 },
  { label: "Inactive Members", value: 3 },
];

const MembersLineGraph = () => {
  return (
    <div style={{ width: "100%", height: 500, marginTop: "70px" }}>
      <h3 style={{ color: "#64676B" }}>
        <span style={{ color: "#cc0000" }}>
          Business<sup>®</sup>
        </span>{" "}
        Members of our Network
      </h3>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4c4c" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ff4c4c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 35]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#cc0000"
            strokeWidth={2}
            fill="url(#colorRed)"
            dot={{ fill: "#cc0000", r: 5 }}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MembersLineGraph;
