export enum KPIDataType {
  STRING = 'string',
  PERCENTAGE = 'percentage',
  NUMBER = 'number'
}

export interface KPI {
  id: string;
  code: string;
  description: string;
  dataType: KPIDataType;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface KPIValue {
  id: string;
  kpiId: string;
  kpiCode: string;
  kpiDescription: string;
  value: string | number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface KPIGroup {
  id: string;
  code: string;
  description: string;
  kpiIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}