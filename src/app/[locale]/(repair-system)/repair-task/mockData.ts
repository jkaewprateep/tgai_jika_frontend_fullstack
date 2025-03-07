import exp from 'constants';

const initialNewTasks = [
  {
    urgent: true,
    taskName: 'ROBOT.TGAI_TANA_001',
    repairNo: '30/05/2023_0001',
    equipment: 'Air Compressor',
    department: 'Per',
    problem: 'เสียงดัง',
    reportedBy: 'Factorium Training',
    reportDate: '30/05/2023 10:56',
    location: 'ห้องชั้น ชั้นดาดฟ้า',
    image: '/images/air_compressor.jpg',
    video: '/videos/air_compressor.mp4',
  },
  {
    urgent: false,
    taskName: 'Hydraulic Pump (เครื่องปั๊มน้ำมันไฮดรอลิก): ปั๊มไฮดรอลิก 2',
    repairNo: '31/05/2023_0002',
    equipment: 'Hydraulic Pump',
    department: 'แผนกไฮดรอลิก',
    problem: 'แรงดันตก',
    reportedBy: 'SYSON2',
    reportDate: '31/05/2023 09:30',
    location: 'ห้องปฏิบัติการ',
    image: '/images/hydraulic_pump.jpg',
    video: '/videos/hydraulic_pump.mp4',
  },
  {
    urgent: true,
    taskName: 'Cooling System (ระบบทำความเย็น): เครื่องทำความเย็น 3',
    repairNo: '01/06/2023_0003',
    equipment: 'Cooling System',
    department: 'แผนกทำความเย็น',
    problem: 'น้ำรั่ว',
    reportedBy: 'John Doe',
    reportDate: '01/06/2023 14:20',
    location: 'ห้องเครื่อง',
    image: '/images/cooling_system.jpg',
    video: '/videos/cooling_system.mp4',
  },
  {
    urgent: false,
    taskName: 'Conveyor Belt (สายพานลำเลียง): สายพาน 4',
    repairNo: '02/06/2023_0004',
    equipment: 'Conveyor Belt',
    department: 'แผนกขนส่ง',
    problem: 'สายพานขาด',
    reportedBy: 'Jane Smith',
    reportDate: '02/06/2023 11:45',
    location: 'โรงงาน A',
    image: '/images/conveyor_belt.jpg',
    video: '/videos/conveyor_belt.mp4',
  },
  {
    urgent: true,
    taskName: 'Generator (เครื่องกำเนิดไฟฟ้า): เครื่องกำเนิดไฟฟ้า 5',
    repairNo: '03/06/2023_0005',
    equipment: 'Generator',
    department: 'แผนกไฟฟ้า',
    problem: 'ไม่ทำงาน',
    reportedBy: 'Alice Johnson',
    reportDate: '03/06/2023 08:30',
    location: 'ห้องเครื่องกำเนิดไฟฟ้า',
    image: '/images/generator.jpg',
    video: '/videos/generator.mp4',
  },
];

export default initialNewTasks;
