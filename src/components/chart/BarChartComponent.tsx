"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import axios from "axios";

import { downtimeData } from "../../app/[locale]/(general)/dashboard/mockData";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const BarChartComponent = () => {
  const [showPlanned, setShowPlanned] = useState(true);
  const [showUnplanned, setShowUnplanned] = useState(true);

  const [graphdata1, setGraphdata1] = useState({ data: downtimeData });

  async function loaddata_mtnKPI() {
    let url = "http://localhost:8080/down";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setGraphdata1({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = setInterval(async () => {
      loaddata_mtnKPI();
    }, 5 * 1000);

    //run once
    loaddata_mtnKPI();

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg text-gray-700 dark:text-gray-200">
          Planned vs Unplanned Downtime
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Controls */}
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPlanned}
              onChange={() => setShowPlanned(!showPlanned)}
              className="form-checkbox h-5 w-5 border-gray-300 rounded focus:ring-0"
              style={{ accentColor: COLORS[1] }}
            />
            <span style={{ color: COLORS[1], fontWeight: "bold" }}>
              Planned Downtime
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showUnplanned}
              onChange={() => setShowUnplanned(!showUnplanned)}
              className="form-checkbox h-5 w-5 border-gray-300 rounded focus:ring-0"
              style={{ accentColor: COLORS[2] }}
            />
            <span style={{ color: COLORS[2], fontWeight: "bold" }}>
              Unplanned Downtime
            </span>
          </label>
        </div>

        {/* BarChart */}
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <BarChart data={graphdata1.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {showPlanned && (
              <Bar dataKey="planned" fill={COLORS[1]} name="Planned Downtime" />
            )}
            {showUnplanned && (
              <Bar
                dataKey="unplanned"
                fill={COLORS[2]}
                name="Unplanned Downtime"
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
