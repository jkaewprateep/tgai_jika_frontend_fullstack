"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

import axios from "axios";
import * as dayjs from "dayjs";

interface RobotDetailPageProps {
  robotId: string;
}

import {
  stocks,
  stockscheduleData,
  OrderItemsData,
  PositionItemsData,
  stockrankingshighData,
  stockrankingsmediumData,
  stockrankingslowData,
  accountbalanceData,
} from "../../dashboard/mockData";
import { Center } from "@react-three/drei";

const RobotDetailPage: React.FC<RobotDetailPageProps> = ({ robotId }) => {
  // Sample data for the account balance chart
  const balanceData = Array.from({ length: 24 }, (_, i) => ({
    time: i,
    value: 7400 + Math.random() * 500,
  }));

  // alert(Object.keys(balanceData));

  // Sample stock data for real-time trends
  // const stocks = [
  //   { symbol: "TQQQ", trend: "up", price: "57,985.44" },
  //   { symbol: "TSLA", trend: "up", price: "270.51" },
  //   { symbol: "COIN", trend: "up", price: "7,770.51" },
  //   { symbol: "NVDA", trend: "up", price: "991.00" },
  //   { symbol: "GOOGL", trend: "down", price: "270.51" },
  //   { symbol: "AMD", trend: "down", price: "750.00" },
  //   { symbol: "NFLX", trend: "down", price: "445.30" },
  //   { symbol: "AAPL", trend: "down", price: "180.25" },
  //   { symbol: "ABNB", trend: "down", price: "135.40" },
  //   { symbol: "MSFT", trend: "down", price: "390.60" },
  //   { symbol: "CRWD", trend: "down", price: "290.15" },
  //   { symbol: "SQQQ", trend: "down", price: "14.25" },
  // ];

  const [stockdata1, setStockdata1] = useState({ data: stocks });
  const [balancedata1, setbalancedata1] = useState({ data: balanceData });

  const [profittarget, setProfittarget] = useState({ data: 0 });
  const [overall_profittarget, setOverall_profittarget] = useState({ data: 0 });
  const [daily_losslv, setDaily_losslv] = useState({ data: 0 });
  const [profit, setProfit] = useState({ data: 0 });

  const [buysymbol, setBuysymbol] = useState({ data: "AMD" });
  const [buyamount, setBuyamount] = useState({ data: 0 });
  const [buyprice, setBuyprice] = useState({ data: 0 });
  const [buyStockreturn, setBuyStockreturn] = useState({ data: null });

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [stockschedule, setstockschedule] = useState({
    data: stockscheduleData,
  });

  const [orderitems, setOrderitems] = useState({
    data: OrderItemsData,
  });

  const [positionitems, setPositionitems] = useState({
    data: PositionItemsData,
  });

  const [stockrankingshigh, setStockrankingshigh] = useState({
    data: stockrankingshighData,
  });

  const [stockrankingmedium, setStockrankingmedium] = useState({
    data: stockrankingsmediumData,
  });

  const [stockrankingmelow, setStockrankinglow] = useState({
    data: stockrankingslowData,
  });

  const [accountbalance, setAccountbalance] = useState({
    data: accountbalanceData,
  });

  // Added handleExportToExcel function
  const handleStart_btn = () => {
    alert("handleStart_btn send command to url: http://golf.com/params");
  };

  const handleStop_btn = () => {
    alert("handleStop_btn send command to url: http://golf.com/params");
  };

  const handleAutoScheduling_btn = () => {
    alert(
      "handleAutoScheduling_btn send command to url: http://golf.com/params"
    );
  };

  // const handleBuynow_btn = () => {
  //   alert("handleBuynow_btn");
  // };

  const handleClosedall_btn = () => {
    alert("handleBuynow_btn send command to url: http://golf.com/params");
  };

  const handleTrailingStopSystem_btn = () => {
    alert(
      "handleTrailingStopSystem_btn send command to url: http://golf.com/params"
    );
  };

  const handleHumanScheduling_btn = () => {
    alert("handleHumanScheduling_btn");
  };

  const handleAIScheduling_btn = () => {
    alert("handleAIScheduling_btn");
  };

  async function loaddata_profits() {
    let url = "http://localhost:8080/profit";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setProfittarget({
        data: resp[0]["profittarget"],
      });
      setOverall_profittarget({
        data: resp[0]["overall_profittarget"],
      });
      setDaily_losslv({
        data: resp[0]["daily_losslv"],
      });
      setProfit({
        data: resp[0]["profit"],
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_accountbalance() {
    let url = "http://localhost:8080/accountbalance";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setAccountbalance({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_orderitems() {
    // const tz = "Asia/bangkok";
    let currentDate = dayjs.default();
    const today = currentDate.format("DD-MM-YYYY");

    let target = dayjs.default().subtract(1, "day");
    const yesterdaydate = target.format("DD-MM-YYYY");

    let url = "http://localhost:8080/orderitmes/{start}/{end}/{robotname}";
    url = url
      .replace("{start}", yesterdaydate)
      .replace("{end}", today)
      .replace("{robotname}", robotId);

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setOrderitems({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_positionitems() {
    let url = "http://localhost:8080/positionitems/{robotname}";
    url = url.replace("robotname", robotId);

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setPositionitems({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }
  //

  async function loaddata_stockschedule() {
    let url = "http://localhost:8080/stockschedule";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setstockschedule({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_stocks() {
    let url = "http://localhost:8083/";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setStockdata1({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_balancedata() {
    let currentDate = dayjs.default();
    const today = currentDate.format("DD-MM-YYYY");

    let target = dayjs.default().subtract(30, "day");
    const yesterdaydate = target.format("DD-MM-YYYY");

    let url = "http://localhost:8080/balance/{start}/{end}/{robotname}";
    url = url
      .replace("{start}", yesterdaydate)
      .replace("{end}", today)
      .replace("{robotname}", robotId);

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setbalancedata1({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_stockrankingshighdata() {
    let url = "http://localhost:8080/rankingshigh";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setStockrankingshigh({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_stockrankingsmediumdata() {
    let url = "http://localhost:8080/rankingsmedium";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setStockrankingmedium({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_stockrankingslowdata() {
    let url = "http://localhost:8080/rankingslow";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setStockrankinglow({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function loaddata_accountbalancedata() {
    let url = "http://localhost:8080/accountbalance";

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setAccountbalance({
        data: resp,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleStocknamechange = (event: { target: { value: any } }) => {
    const _temp = event.target.value.toUpperCase();
    setBuysymbol({ data: _temp });
  };

  const handleStockamountchange = (event: { target: { value: any } }) => {
    setBuyamount({ data: event.target.value });
  };

  const handleStockpricechange = (event: { target: { value: any } }) => {
    setBuyprice({ data: event.target.value });
  };

  async function buy_stocks() {
    // http://172.17.100.56:8082/createOrder/NVDA/buy/1/100/market/tgai_arch_00x/demo
    let url =
      "http://172.17.100.56:8082/createOrder/{SYMBOL}/{SIDE}/{AMOUNT}/{PRICE}/{TYPE}/{ROBOTNAME}/demo";
    url = url
      .replace("{SYMBOL}", buysymbol.data)
      .replace("{SIDE}", "buy")
      .replace("{AMOUNT}", buyamount.data.toString());
    url = url
      .replace("{PRICE}", buyprice.data.toString())
      .replace("{TYPE}", "market")
      .replace("{ROBOTNAME}", robotId);

    alert(url);

    try {
      const res = await axios.get(url, {});
      const resp = res.data;
      setBuyStockreturn({
        data: resp,
      });

      alert(resp);
    } catch (ex) {
      console.log(ex);
    }
  }

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current = setInterval(async () => {
      loaddata_stocks();
      loaddata_profits();
      loaddata_balancedata();
      loaddata_accountbalance();
      loaddata_stockschedule();
      loaddata_orderitems();
      loaddata_positionitems();
      loaddata_stockrankingshighdata();
      loaddata_stockrankingsmediumdata();
      loaddata_stockrankingslowdata();
      loaddata_accountbalancedata();
    }, 5 * 1000);

    //run once
    loaddata_stocks();
    loaddata_profits();
    loaddata_balancedata();
    loaddata_accountbalance();
    loaddata_stockschedule();
    loaddata_orderitems();
    loaddata_positionitems();
    loaddata_stockrankingshighdata();
    loaddata_stockrankingsmediumdata();
    loaddata_stockrankingslowdata();
    loaddata_accountbalancedata();

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="bg-blue-600 text-white p-4">
          <div className="text-xl font-bold">{robotId}</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-sm">Financial Performance</div>
            <div className="text-sm">Model Performance</div>
          </div>
        </Card>

        <Card className="bg-yellow-400 p-4">
          <div className="text-sm">Profit Target</div>
          <div className="text-2xl font-bold">{profittarget.data}</div>
          <div className="text-xs">/{overall_profittarget.data}</div>
        </Card>

        <Card className="bg-teal-400 p-4">
          <div className="text-sm">Daily Loss Level</div>
          <div className="text-2xl font-bold">${daily_losslv.data} left</div>
        </Card>

        <Card className="bg-yellow-800 text-white p-4">
          <div className="text-sm">Profit</div>
          <div className="text-2xl font-bold">${profit.data}</div>
        </Card>
      </div>

      {/* Control Panel and Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Panel */}
        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-bold mb-4">ROBOT Control Panel</div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  className="bg-teal-500 text-white p-2 rounded"
                  onClick={handleStart_btn}
                >
                  START
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={handleStop_btn}
                >
                  STOP
                </button>
              </div>
              <button
                className="w-full bg-teal-500 text-white p-2 rounded mb-2"
                onClick={handleAutoScheduling_btn}
              >
                AUTO Scheduling
              </button>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  className="bg-teal-500 text-white p-2 rounded"
                  onClick={() => dialogRef.current?.showModal()}
                >
                  Buy Now
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={handleClosedall_btn}
                >
                  Closed All
                </button>
              </div>
              <button
                className="w-full bg-teal-500 text-white p-2 rounded"
                onClick={handleTrailingStopSystem_btn}
              >
                Trailing Stop System
              </button>
            </CardContent>
          </Card>

          {/* Stock Rankings */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="font-bold mb-2">
                    Stock Ranking // High Risk
                  </div>
                  <div className="space-y-2">
                    {stockrankingshigh.data.map((stock) => (
                      <div
                        key={stock.stockname}
                        className="flex items-center gap-2"
                      >
                        <span className="w-8 h-8 rounded-full bg-blue-600" />
                        <span>{stock.stockname}</span>
                        <div className="flex-grow bg-blue-600 h-2 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-bold mb-2">
                    Stock Ranking // Medium Risk
                  </div>
                  <div className="space-y-2">
                    {stockrankingmedium.data.map((stock) => (
                      <div
                        key={stock.stockname}
                        className="flex items-center gap-2"
                      >
                        <span className="w-8 h-8 rounded-full bg-blue-600" />
                        <span>{stock.stockname}</span>
                        <div className="flex-grow bg-blue-600 h-2 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-bold mb-2">
                    Stock Ranking // Low Risk
                  </div>
                  <div className="space-y-2">
                    {stockrankingmelow.data.map((stock) => (
                      <div
                        key={stock.stockname}
                        className="flex items-center gap-2"
                      >
                        <span className="w-8 h-8 rounded-full bg-blue-600" />
                        <span>{stock.stockname}</span>
                        <div className="flex-grow bg-blue-600 h-2 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-6">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4">
                <div className="text-lg font-bold">Account Balance</div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">P&L</div>
                    <div className="text-lg text-green-500">
                      {accountbalance.data[0]["P_L"]}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Equity</div>
                    <div className="text-lg text-green-500">
                      {accountbalance.data[0]["Equity"]}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Balance</div>
                    <div className="text-lg text-green-500">
                      {accountbalance.data[0]["Balance"]}
                    </div>
                  </div>
                </div>

                <div className="h-64">
                  {balancedata1.data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={balancedata1.data}>
                        <XAxis dataKey="time" />
                        <YAxis domain={["auto", "auto"]} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <span>Loading ...</span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-lg font-bold mb-2">ROBOT Scheduling</div>
                <div className="flex gap-2 mb-2">
                  <button
                    className="bg-teal-500 text-white px-4 py-1 rounded text-sm"
                    onClick={handleHumanScheduling_btn}
                  >
                    by Human
                  </button>
                  <button
                    className="bg-teal-500 text-white px-4 py-1 rounded text-sm"
                    onClick={handleAIScheduling_btn}
                  >
                    by Ai
                  </button>
                </div>
                <div className="h-16 bg-blue-600 rounded flex items-center justify-between px-4 text-white">
                  {/* stockschedule */}

                  {stockschedule.data ? (
                    stockschedule.data.map((stock) => (
                      <div key={stock.stockname}>
                        <span>{stock.stockname}</span>
                      </div>
                    ))
                  ) : (
                    <span>Loading ...</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-lg font-bold">Orders</div>
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Stock</th>
                      <th className="p-2 text-left">Side</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Quantity</th>
                      <th className="p-2 text-left">Price</th>
                    </tr>

                    {orderitems.data.length > 0 ? (
                      orderitems.data.map((stock) => (
                        <tr key={stock.stock}>
                          <td>{stock.stock}</td>
                          <td>{stock.side}</td>
                          <td>{stock.type}</td>
                          <td>{stock.quantity}</td>
                          <td>{stock.price}</td>
                        </tr>
                      ))
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            // colspan={1}
                            style={{ textAlign: "center" }}
                            className="p-4 text-center text-gray-500"
                          >
                            Not found data on display
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </thead>
                </table>

                <div className="text-lg font-bold">Positions</div>
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Stock</th>
                      <th className="p-2 text-left">Side</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Quantity</th>
                      <th className="p-2 text-left">Price</th>
                    </tr>

                    {positionitems.data.length > 0 ? (
                      positionitems.data.map((stock) => (
                        <tr key={stock.stock}>
                          <td>{stock.stock}</td>
                          <td>{stock.side}</td>
                          <td>{stock.type}</td>
                          <td>{stock.quantity}</td>
                          <td>{stock.price}</td>
                        </tr>
                      ))
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            colSpan={5}
                            className="p-4 text-center text-gray-500"
                          >
                            Not found data on display
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </thead>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Real-time Trends */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-bold mb-4">Real-Time Trend</div>
              <div className="space-y-2">
                {stockdata1.data ? (
                  stockdata1.data.map((stock) => (
                    <div
                      key={stock.symbol}
                      className={`p-2 rounded flex items-center justify-between
                      ${stock.trend === "up" ? "bg-green-50" : "bg-red-50"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600" />
                        <span>{stock.symbol}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {stock.trend === "up" ? (
                          <ArrowUp className="text-green-500 w-4 h-4" />
                        ) : (
                          <ArrowDown className="text-red-500 w-4 h-4" />
                        )}
                        <span>${stock.price}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Loading ...</div>
                )}

                {/* {stockdata1.data.map((stock) => (
                  <div
                    key={stock.symbol}
                    className={`p-2 rounded flex items-center justify-between
                      ${stock.trend === "up" ? "bg-green-50" : "bg-red-50"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600" />
                      <span>{stock.symbol}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {stock.trend === "up" ? (
                        <ArrowUp className="text-green-500 w-4 h-4" />
                      ) : (
                        <ArrowDown className="text-red-500 w-4 h-4" />
                      )}
                      <span>${stock.price}</span>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <dialog ref={dialogRef}>
        <div
          className="flex justify-center items-center z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full">
            <table>
              <tbody>
                <tr>
                  <td>Stockname</td>
                  <td>
                    {/* <th width="150">< input id="input_symbol" value={amount.value} name="input_symbol" type="text" onInput={e => setAmount({value:e.target.value})}></input></th> */}
                    <input
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      type="text"
                      id="fname"
                      name="fname"
                      value={buysymbol.data}
                      onChange={handleStocknamechange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>
                    <input
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      type="text"
                      id="fname"
                      name="fname"
                      value={buyamount.data}
                      onChange={handleStockamountchange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>
                    <input
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      type="text"
                      id="fname"
                      name="fname"
                      value={buyprice.data}
                      onChange={handleStockpricechange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-200"
                      style={{ float: "left" }}
                      type="button"
                      onClick={() => buy_stocks()}
                    >
                      Buy
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-200"
                      style={{ float: "right" }}
                      type="button"
                      onClick={() => dialogRef.current?.close()}
                    >
                      Close
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RobotDetailPage;
