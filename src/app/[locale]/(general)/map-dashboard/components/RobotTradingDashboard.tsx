"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RobotTradingDashboard = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const robots = [
    {
      id: "tgal_texu_002",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["SQQQ", "NVDA", "TQQQ", "TSLA", "TQQQ"],
    },
    {
      id: "tgal_tana_004",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["TSLA"],
    },
    {
      id: "tgal_tana_005",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["NVDA", "TSLA"],
    },
    {
      id: "tgal_texu_004",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["SQQQ", "NVDA", "TQQQ", "TSLA", "TQQQ"],
    },
    {
      id: "tgal_tana_008",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["TSLA"],
    },
    {
      id: "tgal_tana_010",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["NVDA", "GOOGL"],
    },
    {
      id: "tgal_texu_012",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["SQQQ", "NVDA", "TQQQ", "TSLA"],
    },
    {
      id: "tgal_tana_014",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["TSLA"],
    },
    {
      id: "tgal_tana_025",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["NVDA", "GOOGL"],
    },
    {
      id: "tgal_texu_022",
      risk: "Medium Risk",
      target: "$270.51",
      schedule: ["SQQQ", "NVDA", "TQQQ", "TSLA", "TQQQ"],
    },
  ];

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 20 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  return (
    <div className="h-screen overflow-auto bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Robot Trading Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto"></div>
          <div className="grid grid-cols-[200px_1fr] gap-4"></div>
          {/* Robot List */}
          <div className="space-y-2"></div>
          {/* Schedule Grid */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-1">
              {robots.map((robot) => (
                <div
                  key={robot.id}
                  className="col-span-12 h-[72px] flex items-center gap-1"
                >
                  <div className="relative overflow-x-auto">
                    <div className="grid grid-cols-[200px_1fr] gap-4">
                      {/* Robot List */}
                      <div className="space-y-2">
                        <Link
                          key={robot.id}
                          href={`/${locale}/map-dashboard/detail/${robot.id}`}
                          className="block hover:opacity-80 transition-opacity"
                        >
                          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg cursor-pointer">
                            <div className="text-sm font-medium">
                              {robot.id}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              {robot.risk}
                            </div>
                            <div className="text-xs font-bold text-yellow-600">
                              Target: {robot.target}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {robot.schedule.map((stock, index) => (
                    <div
                      key={`${robot.id}-${stock}-${index}`}
                      className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded flex-1 flex items-center justify-center"
                      style={{
                        flexGrow: stock === "TSLA" ? 2 : 1,
                      }}
                    >
                      {stock}
                    </div>
                  ))}
                  {/* Time indicators */}
                </div>
              ))}
              {/* <div className="relative overflow-x-auto">
                <div className="grid grid-cols-[200px_1fr] gap-4"> */}
              {/* <div className="space-y-2"> */}

              {/* <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2"> */}
              <div className="absolute bottom-0 left-60 right-0 flex justify-between text-xs text-gray-500 mt-2">
                {timeSlots.map((time) => (
                  <div key={time}>{time}</div>
                ))}
                {/* </div> */}
              </div>
            </div>
            {/* </div>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RobotTradingDashboard;
