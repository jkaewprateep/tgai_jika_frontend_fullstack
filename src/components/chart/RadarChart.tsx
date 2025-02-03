"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  RadarChart,
} from "recharts";

import axios from "axios";

import { radarChartData } from "../../app/[locale]/(general)/dashboard/mockData";

// Radar Chart Data

const RadarChartComponent = () => {
  const [showEquipmentA, setShowEquipmentA] = useState(true);
  const [showEquipmentB, setShowEquipmentB] = useState(true);

  const [graphdata1, setGraphdata1] = useState({ data: radarChartData });

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = setInterval(async () => {
      loaddata_rardarchar();
    }, 5 * 1000);

    //run once
    loaddata_rardarchar();

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  async function loaddata_rardarchar() {
    let url = "http://localhost:8080/rdr";

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
          Equipment Performance Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Controls */}
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showEquipmentA}
              onChange={() => setShowEquipmentA(!showEquipmentA)}
              className="form-checkbox h-5 w-5 border-gray-300 rounded focus:ring-0"
              style={{ accentColor: "#8884d8" }}
            />
            <span style={{ color: "#8884d8", fontWeight: "bold" }}>
              Equipment A
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showEquipmentB}
              onChange={() => setShowEquipmentB(!showEquipmentB)}
              className="form-checkbox h-5 w-5 border-gray-300 rounded focus:ring-0"
              style={{ accentColor: "#82ca9d" }}
            />
            <span style={{ color: "#82ca9d", fontWeight: "bold" }}>
              Equipment B
            </span>
          </label>
        </div>

        {/* Radar Chart */}
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <RadarChart data={graphdata1.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            {showEquipmentA && (
              <Radar
                name="Equipment A"
                dataKey="EquipmentA"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            )}
            {showEquipmentB && (
              <Radar
                name="Equipment B"
                dataKey="EquipmentB"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
            )}
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RadarChartComponent;
