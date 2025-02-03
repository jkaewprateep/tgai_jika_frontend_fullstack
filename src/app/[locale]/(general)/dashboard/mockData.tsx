export const oeeData = [
  { month: "Jan", availability: 95, performance: 92, quality: 98, oee: 85.6 },
  { month: "Feb", availability: 94, performance: 90, quality: 97, oee: 82.1 },
  { month: "Mar", availability: 96, performance: 93, quality: 99, oee: 88.3 },
  { month: "Apr", availability: 93, performance: 91, quality: 98, oee: 83.2 },
  { month: "May", availability: 97, performance: 94, quality: 99, oee: 89.9 },
  { month: "Jun", availability: 95, performance: 92, quality: 98, oee: 85.6 },
];

export const sixBigLossesData = [
  { name: "Breakdown", value: 35 },
  { name: "Setup/Adjustment", value: 15 },
  { name: "Small Stops", value: 20 },
  { name: "Reduced Speed", value: 10 },
  { name: "Startup Rejects", value: 12 },
  { name: "Production Rejects", value: 8 },
];

export const maintenanceKPIs = [
  { month: "Jan", mtbf: 120, mttr: 4 },
  { month: "Feb", mtbf: 150, mttr: 3 },
  { month: "Mar", mtbf: 140, mttr: 3.5 },
  { month: "Apr", mtbf: 160, mttr: 2.5 },
  { month: "May", mtbf: 155, mttr: 2.8 },
  { month: "Jun", mtbf: 165, mttr: 2.2 },
];

export const downtimeData = [
  { month: "Jan", planned: 10, unplanned: 15 },
  { month: "Feb", planned: 12, unplanned: 10 },
  { month: "Mar", planned: 8, unplanned: 20 },
  { month: "Apr", planned: 14, unplanned: 12 },
  { month: "May", planned: 9, unplanned: 18 },
  { month: "Jun", planned: 11, unplanned: 17 },
];

export const productionData = [
  { day: "01", produced: 1200, defective: 50 },
  { day: "02", produced: 1500, defective: 30 },
  { day: "03", produced: 1400, defective: 40 },
  { day: "04", produced: 1300, defective: 20 },
  { day: "05", produced: 1600, defective: 70 },
  { day: "06", produced: 1700, defective: 60 },
];

export const radarChartData = [
  { category: "Safety", EquipmentA: 90, EquipmentB: 80, fullMark: 100 },
  { category: "Quality", EquipmentA: 85, EquipmentB: 95, fullMark: 100 },
  { category: "Delivery", EquipmentA: 80, EquipmentB: 85, fullMark: 100 },
  { category: "Cost", EquipmentA: 75, EquipmentB: 70, fullMark: 100 },
  { category: "Morale", EquipmentA: 70, EquipmentB: 75, fullMark: 100 },
  { category: "Environment", EquipmentA: 65, EquipmentB: 60, fullMark: 100 },
];

export const balanceData = Array.from({ length: 24 }, (_, i) => ({
  time: i,
  value: 7400 + Math.random() * 500,
}));

export const stocks = [
  { symbol: "TQQQ", trend: "up", price: "57,985.44" },
  { symbol: "TSLA", trend: "up", price: "270.51" },
  { symbol: "COIN", trend: "up", price: "7,770.51" },
  { symbol: "NVDA", trend: "up", price: "991.00" },
  { symbol: "GOOGL", trend: "down", price: "270.51" },
  { symbol: "AMD", trend: "down", price: "750.00" },
  { symbol: "NFLX", trend: "down", price: "445.30" },
  { symbol: "AAPL", trend: "down", price: "180.25" },
  { symbol: "ABNB", trend: "down", price: "135.40" },
  { symbol: "MSFT", trend: "down", price: "390.60" },
  { symbol: "CRWD", trend: "down", price: "290.15" },
  { symbol: "SQQQ", trend: "down", price: "14.25" },
];

export const stockscheduleData = [
  { stockname: "SQQQ" },
  { stockname: "NVDA" },
  { stockname: "TQQQ" },
  { stockname: "TSLA" },
];

export const stockrankingshighData = [
  { stockname: "TQQQ" },
  { stockname: "TSLA" },
  { stockname: "COIN" },
];

export const stockrankingsmediumData = [
  { stockname: "GOOGL" },
  { stockname: "AMD" },
  { stockname: "NFLX" },
];

export const stockrankingslowData = [
  { stockname: "TSLA" },
  { stockname: "COIN" },
  { stockname: "NVDA" },
];

export const accountbalanceData = [
  { P_L: "+$ 270.51", Equity: "+$ 7985.44", Balance: "+$ 7770.51" },
];

export const OrderItemsData = [
  {
    stock: "SQQQ",
    side: "buy",
    type: "market",
    quantity: "100",
    price: "150.00",
  },
  {
    stock: "AMD",
    side: "buy",
    type: "market",
    quantity: "200",
    price: "250.00",
  },
];

export const PositionItemsData = [
  {
    stock: "SQQQ",
    side: "buy",
    type: "market",
    quantity: "100",
    price: "150.00",
  },
  {
    stock: "AMD",
    side: "buy",
    type: "market",
    quantity: "200",
    price: "250.00",
  },
];

export const pmScheduleData = [
  {
    id: 1,
    equipment: "Air Handling Unit #1",
    task: "Full Maintenance Check",
    dueDate: "2024-11-02",
    frequency: "Monthly",
    status: "Pending",
    assignedTo: "John Smith",
    details: "Complete system check including filters, coils, and controls",
    lastMaintenance: "2024-10-02",
    estimatedDuration: "3 hours",
    parts: ["Air filters", "Belt", "Lubricant"],
  },
  // ... more tasks
];
