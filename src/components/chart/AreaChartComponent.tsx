import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import axios from "axios";

import { productionData } from "../../app/[locale]/(general)/dashboard/mockData";

const AreaChartComponent = () => {
  const [graphdata1, setGraphdata1] = useState({ data: productionData });

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = setInterval(async () => {
      loaddata_production();
    }, 5 * 1000);

    //run once
    loaddata_production();

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  async function loaddata_production() {
    let url = "http://localhost:8080/prd";

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

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg text-gray-700 dark:text-gray-200">
          Production and Defective Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <AreaChart data={graphdata1.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="produced"
              stroke="#2563eb"
              fillOpacity={0.6}
              fill="#2563eb"
              name="Produced"
            />
            <Area
              type="monotone"
              dataKey="defective"
              stroke="#f87171"
              fillOpacity={0.6}
              fill="#f87171"
              name="Defective"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AreaChartComponent;
