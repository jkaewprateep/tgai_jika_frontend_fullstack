"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Plus,
  FileDown,
  Timer,
  Activity,
  BarChart2,
  Percent,
} from "lucide-react";
import FilterForm from "@/components/FilterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChartComponent from "@/components/chart/LineChartComponent";
import BarChartComponent from "@/components/chart/BarChartComponent";
import AreaChartComponent from "@/components/chart/AreaChartComponent";
import RadarChartComponent from "@/components/chart/RadarChart";
import GanttChart from "@/components/chart/GanttChart";
import {
  maintenanceKPIs,
  oeeData,
  pmScheduleData,
  sixBigLossesData,
} from "./mockData";

import axios from "axios";

const CMMSDashboard = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  // Data
  async function loaddata_oee() {
    let url = "http://localhost:8080/";

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

  async function loaddata_sixBLD() {
    let url = "http://localhost:8080/sixBLD";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setGraphdata2({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  // Data
  const [graphdata1, setGraphdata1] = useState({ data: oeeData });
  const [graphdata2, setGraphdata2] = useState({ data: sixBigLossesData });

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = setInterval(async () => {
      loaddata_oee();
      loaddata_sixBLD();
    }, 5 * 1000);

    //run once
    loaddata_oee();
    loaddata_sixBLD();

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);
  //

  // Added handleExportToExcel function
  const handleExportToExcel = () => {
    const data = {
      oeeData,
      sixBigLossesData,
      maintenanceKPIs,
      pmScheduleData,
    };

    // Convert data to CSV format
    const csvContent = generateCSV(data);

    // Create a Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "cmms_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to generate CSV
  const generateCSV = (data: {
    oeeData: {
      month: string;
      availability: number;
      performance: number;
      quality: number;
      oee: number;
    }[];
    sixBigLossesData: { name: string; value: number }[];
    maintenanceKPIs: { month: string; mtbf: number; mttr: number }[];
    pmScheduleData: {
      id: number;
      equipment: string;
      task: string;
      dueDate: string;
      frequency: string;
      status: string;
      assignedTo: string;
      details: string;
      lastMaintenance: string;
      estimatedDuration: string;
      parts: string[];
    }[];
  }) => {
    let csv = "OEE Data\n";
    csv += "Month,Availability,Performance,Quality,OEE\n";
    //
    // const result: {
    //   month: string;
    //   availability: number;
    //   performance: number;
    //   quality: number;
    //   oee: number;
    // }[] = [];

    // fetch("/http://localhost:8080/")
    //   .catch((error: Error) => {
    //     throw new Error(error.message);
    //   })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then(
    //     (
    //       oee: {
    //         month: string;
    //         availability: number;
    //         performance: number;
    //         quality: number;
    //         oee: number;
    //       }[]
    //     ) => {
    //       result.length = 0;
    //       return oee.forEach((item, i) => {
    //         result[i] = item;
    //       });
    //     }
    //   );

    //
    // result.forEach((row) => {
    //   csv += `${row.month},${row.availability},${row.performance},${row.quality},${row.oee}\n`;
    // });

    graphdata1.data.forEach((row) => {
      csv += `${row.month},${row.availability},${row.performance},${row.quality},${row.oee}\n`;
    });

    // data.oeeData.forEach((row) => {
    //   csv += `${row.month},${row.availability},${row.performance},${row.quality},${row.oee}\n`;
    // });

    csv += "\n6 Big Losses\n";
    csv += "Category,Value\n";
    graphdata2.data.forEach((row) => {
      csv += `${row.name},${row.value}\n`;
    });

    // data.sixBigLossesData.forEach((row) => {
    //   csv += `${row.name},${row.value}\n`;
    // });

    return csv;
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 h-screen overflow-auto text-gray-800 dark:text-gray-100">
      <FilterForm />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CMMS & OEE Dashboard</h1>
        <div className="flex gap-2 p-4">
          <Button
            onClick={() => setShowAddTask(true)}
            className="bg-blue-600 dark:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Task
          </Button>
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            className="dark:border-gray-600"
          >
            <FileDown className="h-4 w-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* OEE Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Overall OEE
                </p>
                <h3 className="text-2xl font-bold">85.6%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Timer className="h-8 w-8 text-green-500 dark:text-green-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Availability
                </p>
                <h3 className="text-2xl font-bold">95%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart2 className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Performance
                </p>
                <h3 className="text-2xl font-bold">92%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Percent className="h-8 w-8 text-purple-500 dark:text-purple-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Quality
                </p>
                <h3 className="text-2xl font-bold">98%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>OEE Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphdata1.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <XAxis dataKey="month" stroke="gray" />
                <YAxis stroke="gray" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                />
                <Legend />
                <Line type="monotone" dataKey="availability" stroke="#2563eb" />
                <Line type="monotone" dataKey="performance" stroke="#eab308" />
                <Line type="monotone" dataKey="quality" stroke="#22c55e" />
                <Line
                  type="monotone"
                  dataKey="oee"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6 Big Losses Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={graphdata2.data}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {graphdata2.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    color: "white",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <LineChartComponent />
        <BarChartComponent />
        <AreaChartComponent />
        <RadarChartComponent />

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Gantt Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <GanttChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CMMSDashboard;
