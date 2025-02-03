const mockData = [
  {
    id: 1,
    repairNo: '30/05/2023_0001',
    dateRequested: '30/05/2023',
    dateResolved: '31/05/2023',
    qrCode: 'Air-Com-001',
    device: 'Air Compressor (เครื่องปั๊มลม)',
    cause: 'ปั๊มลมแตก',
    solution: 'เปลี่ยนลูกปั๊มใหม่',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 2,
    repairNo: '01/06/2023_0002',
    dateRequested: '01/06/2023',
    dateResolved: '02/06/2023',
    qrCode: 'Gen-002',
    device: 'Generator (เครื่องกำเนิดไฟฟ้า)',
    cause: 'เครื่องไม่ติด',
    solution: 'เปลี่ยนแบตเตอรี่',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 3,
    repairNo: '02/06/2023_0003',
    dateRequested: '02/06/2023',
    dateResolved: '03/06/2023',
    qrCode: 'Pump-003',
    device: 'Water Pump (ปั๊มน้ำ)',
    cause: 'ปั๊มน้ำรั่ว',
    solution: 'เปลี่ยนซีลปั๊ม',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 4,
    repairNo: '03/06/2023_0004',
    dateRequested: '03/06/2023',
    dateResolved: '04/06/2023',
    qrCode: 'Fan-004',
    device: 'Industrial Fan (พัดลมอุตสาหกรรม)',
    cause: 'พัดลมไม่หมุน',
    solution: 'เปลี่ยนมอเตอร์',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 5,
    repairNo: '04/06/2023_0005',
    dateRequested: '04/06/2023',
    dateResolved: '05/06/2023',
    qrCode: 'AC-005',
    device: 'Air Conditioner (เครื่องปรับอากาศ)',
    cause: 'เครื่องไม่เย็น',
    solution: 'เติมน้ำยาแอร์',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 6,
    repairNo: '05/06/2023_0006',
    dateRequested: '05/06/2023',
    dateResolved: '06/06/2023',
    qrCode: 'Boiler-006',
    device: 'Boiler (หม้อไอน้ำ)',
    cause: 'หม้อไอน้ำรั่ว',
    solution: 'เชื่อมรอยรั่ว',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 7,
    repairNo: '06/06/2023_0007',
    dateRequested: '06/06/2023',
    dateResolved: '07/06/2023',
    qrCode: 'Chiller-007',
    device: 'Chiller (เครื่องทำความเย็น)',
    cause: 'เครื่องไม่เย็น',
    solution: 'เปลี่ยนคอมเพรสเซอร์',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 8,
    repairNo: '07/06/2023_0008',
    dateRequested: '07/06/2023',
    dateResolved: '08/06/2023',
    qrCode: 'Conveyor-008',
    device: 'Conveyor Belt (สายพานลำเลียง)',
    cause: 'สายพานขาด',
    solution: 'เปลี่ยนสายพานใหม่',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 9,
    repairNo: '08/06/2023_0009',
    dateRequested: '08/06/2023',
    dateResolved: '09/06/2023',
    qrCode: 'Forklift-009',
    device: 'Forklift (รถยก)',
    cause: 'เครื่องไม่ติด',
    solution: 'เปลี่ยนแบตเตอรี่',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
  {
    id: 10,
    repairNo: '09/06/2023_0010',
    dateRequested: '09/06/2023',
    dateResolved: '10/06/2023',
    qrCode: 'Mixer-010',
    device: 'Mixer (เครื่องผสม)',
    cause: 'เครื่องไม่หมุน',
    solution: 'เปลี่ยนมอเตอร์',
    repairedBy: 'Factorium Training',
    status: 'ซ่อมเสร็จแล้ว',
  },
];

export default mockData;
