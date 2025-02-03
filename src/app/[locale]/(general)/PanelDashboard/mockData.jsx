// src/app/[locale]/PanelDashboard/mockData.jsx
export const mockData = {
  co2: {
    history: [
      { time: '07', value: 5000 },
      { time: '08', value: 15000 },
      { time: '09', value: 10000 },
    ],
    total: 9539.51
  },
  power: {
    history: [
      { time: '07', value: 8000 },
      { time: '08', value: 16000 },
      { time: '09', value: 12000 },
    ],
    total: 16388.10
  },
  comparison: {
    onPeak: 60,
    offPeak: 40
  },
  billing: {
    current: 94436.69,
    monthly: [
      { label: 'เดือนก่อน', value: 3029744.56 },
      { label: 'เดือนนี้', value: 122748.23 },
      { label: 'สัปดาห์นี้', value: 535224.44 }
    ]
  },
  solar: {
    currentPower: '4.2 kW',
    efficiency: '96.8%'
  },
  electrical: {
    ln: 220,
    ll: 380,
    current: 45
  },
  performance: [
    { time: '00:00', value: 0 },
    { time: '06:00', value: 1000 },
    { time: '12:00', value: 4500 },
    { time: '18:00', value: 2000 },
    { time: '23:59', value: 0 }
  ],
  solarPanels: Array(144).fill(null).map((_, i) => ({
    id: `P${i+1}`,
    status: Math.random() > 0.1 ? 'active' : 'inactive',
    efficiency: 85 + Math.random() * 10,
    power: 200 + Math.random() * 100
  }))
};