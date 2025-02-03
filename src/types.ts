export interface CheckSheet {
  id: number;
  name: string;
  qty: number;
  documentNo: string;
  revisionNo: string;
  department: string;
  type: string;
  isUsedSparePart: boolean;
  dateCreated: string;
  createdBy: string;
  dateUpdated: string;
  updatedBy: string;
}

export interface PMAMPlan {
  id: number;
  machineType: string;
  machineName: string;
  machineLocation: string;
  checkSheetName: string;
  frequency: number;
  startDate: string;
  createdBy: string;
  dateCreated: string;
}

export interface LinkItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export interface NavbarLinkProps {
  href: string;
  label: string;
  Icon: React.ElementType;
  pathname: string;
  onClick?: () => void;
}

export interface Task {
  id: number;
  repairNo: string;
  dateRequested: string;
  dateResolved: string;
  qrCode: string;
  device: string;
  cause: string;
  solution: string;
  repairedBy: string;
  status: string;
  evaluation?: {
    rating: string;
    comment: string;
  };
}

export interface Schedule {
  id: number;
  checkSheet: string;
  checkSheetType: string;
  frequency: number;
  selectedDates?: string[];
  selectedMonths?: number[];
}

export interface PMHistory {
  id: number;
  finishDate: string;
  device: string;
  jobId: string;
  department: string;
  checklistType: string;
  user: string;
}

export interface SparePart {
  id: number;
  receivingDate: string;
  poNo: string;
  invoiceNo: string;
  expireDate: string;
  referenceName: string;
  detail: string;
  brand: string;
  productionLine: string;
  warehouse: string;
  min: number;
  max: number;
  unitPrice: number;
  total: number;
  balance: number;
  spareUnit: string;
  sparePartSpec: string;
  sparePartName: string;
}

export interface BrokenSparePart {
  no: number;
  repairJob: string;
  sparePartCode: string;
  sparePartName: string;
  returnMessage: string;
  date: string;
  createdBy: string;
}

export interface SparePartReceived {
  id: number;
  receiveDate: string;
  poNumber: string;
  sparePartCode: string;
  sparePartName: string;
  warehouse: string;
  brand: string;
  supplier: string;
  receiveAmount: number;
  price: number;
  total: number;
  spareUnit: string;
  receivedByUser: string;
}

export interface SparePartHistory {
  id: number;
  action: string;
  openedDate: string;
  closedDate: string;
  department: string;
  machineCode: string;
  qrCode: string;
  machineType: string;
  sparePartCode: string;
  sparePartName: string;
  customerName: string;
  min: number;
  max: number;
  price: number;
  total: number;
  brand: string;
  reason: string;
  details: string;
}

export interface Tool {
  id: number;
  status: 'Available' | 'Borrowed';
  qrCode: string;
  machineType: string;
  machineName: string;
  brand: string;
  model: string;
  reasonBorrow: string;
  groupId?: number;
}
