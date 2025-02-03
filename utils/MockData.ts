const generateMockData = () => {
  const data = [];
  for (let i = 1; i <= 90; i++) {
    data.push({
      day: `Day ${i}`,
      carbon: Math.floor(Math.random() * 200) + 50, // Random value between 50 and 250
      reduce: Math.floor(Math.random() * 100) + 20, // Random value between 20 and 120
    });
  }
  return data;
};

export default generateMockData;
