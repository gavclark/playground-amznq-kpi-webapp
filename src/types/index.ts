export interface KPI {
  kpiId: string;
  kpiCode: string;
  kpiDescription: string;
  kpidataType: 'string' | 'percentage' | 'number';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface KPIValue {
  kpiId: string;
  kpiCode: string;
  kpiDescription: string;
  kpivalue: string | number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface KPIGroup {
  kpiId: string;
  kpiCode: string;
  kpiDescription: string;
  kpiIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}