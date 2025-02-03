import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import axios from "axios";

import { maintenanceKPIs } from "../../app/[locale]/(general)/dashboard/mockData";

const LineChartComponent = () => {
  const [graphdata1, setGraphdata1] = useState({ data: maintenanceKPIs });

  async function loaddata_mtnKPI() {
    let url = "http://localhost:8080/mtnKPI";

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-gray-700 dark:text-gray-200">
          Maintenance Performance Indicators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <LineChart data={graphdata1.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="mtbf"
              stroke="#2563eb"
              name="MTBF (Hours)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="mttr"
              stroke="#dc2626"
              name="MTTR (Hours)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;
