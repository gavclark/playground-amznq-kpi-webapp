import { openDB } from 'idb';

const DB_NAME = 'KPIDatabase';
const DB_VERSION = 1;
const KPI_STORE = 'kpis';
const KPI_VALUE_STORE = 'kpiValues';
const KPI_GROUP_STORE = 'kpiGroups';

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(KPI_STORE)) {
        db.createObjectStore(KPI_STORE, { keyPath: 'kpiId' });
      }
      if (!db.objectStoreNames.contains(KPI_VALUE_STORE)) {
        db.createObjectStore(KPI_VALUE_STORE, { keyPath: 'kpiId' });
      }
      if (!db.objectStoreNames.contains(KPI_GROUP_STORE)) {
        db.createObjectStore(KPI_GROUP_STORE, { keyPath: 'kpiId' });
      }
    },
  });
  return db;
};

export const addKPI = async (kpi) => {
  const db = await initDB();
  await db.put(KPI_STORE, kpi);
};

export const getKPIs = async () => {
  const db = await initDB();
  return await db.getAll(KPI_STORE);
};

export const addKPIValue = async (kpiValue) => {
  const db = await initDB();
  await db.put(KPI_VALUE_STORE, kpiValue);
};

export const getKPIValues = async () => {
  const db = await initDB();
  return await db.getAll(KPI_VALUE_STORE);
};

export const addKPIGroup = async (kpiGroup) => {
  const db = await initDB();
  await db.put(KPI_GROUP_STORE, kpiGroup);
};

export const getKPIGroups = async () => {
  const db = await initDB();
  return await db.getAll(KPI_GROUP_STORE);
};