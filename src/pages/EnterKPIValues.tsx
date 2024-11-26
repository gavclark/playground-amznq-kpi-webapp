import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { KPI } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { addKPIValue, getKPIs } from '../utils/indexedDB';

const validateKPIValue = (value: string, dataType: KPI['kpidataType']): boolean => {
  switch (dataType) {
    case 'number':
      return !isNaN(Number(value));
    case 'percentage':
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 100;
    case 'string':
      return true;
    default:
      return false;
  }
};

const formatKPIValue = (value: string | number, dataType: KPI['kpidataType']): string => {
  switch (dataType) {
    case 'percentage':
      return `${value}%`;
    default:
      return String(value);
  }
};

const EnterKPIValues: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kpis, setKpis] = useState<KPI[]>([
    { kpiId: uuidv4(), kpiCode: 'KPI 1', kpidataType: 'number', kpiDescription: 'string',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
      updatedBy: 'current-user'
     },
    { kpiId: uuidv4(), kpiCode: 'KPI 2', kpidataType: 'percentage', kpiDescription: 'string',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
      updatedBy: 'current-user' },
    { kpiId: uuidv4(), kpiCode: 'KPI 3', kpidataType: 'string', kpiDescription: 'string',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
      updatedBy: 'current-user' },
  ]); // Example KPIs
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [kpiValue, setKpiValue] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKPISelect = (kpi: KPI) => {
    setSelectedKPI(kpi);
    setKpiValue(''); // Reset KPI value input when a new KPI is selected
  };

  const handleKPIValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKpiValue(event.target.value);
  };

  const handleSaveKPIValue = async () => {
    if (selectedKPI && validateKPIValue(kpiValue, selectedKPI.kpidataType)) {
      const timestamp = new Date().toISOString();
      const userId = 'current-user'; // In a real app, this would come from authentication
  
      const newKPIValue = {
        kpiId: selectedKPI.kpiId,
        kpiCode: selectedKPI.kpiCode,
        kpiDescription: selectedKPI.kpiDescription,
        kpivalue: kpiValue,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: userId,
        updatedBy: userId,
      };
  
      await addKPIValue(newKPIValue);
  
      console.log(`Saved KPI value: ${formatKPIValue(kpiValue, selectedKPI.kpidataType)}`);
      // Reset the form
      setSelectedKPI(null);
      setKpiValue('');
    } else {
      alert('Invalid KPI value');
    }
  };

  useEffect(() => {
    const fetchKPIs = async () => {
      const fetchedKPIs = await getKPIs();
      setKpis(fetchedKPIs);
    };
  
    fetchKPIs();
  }, []);

  const filteredKPIs = kpis.filter(kpi =>
    kpi.kpiCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <TextField
        label="Search KPI"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
      />
      <List>
        {filteredKPIs.map(kpi => (
          <ListItem button key={kpi.kpiId} onClick={() => handleKPISelect(kpi)}>
            <ListItemText primary={kpi.kpiCode} />
          </ListItem>
        ))}
      </List>
      {selectedKPI && (
        <Box>
          <Typography variant="h6">Selected KPI: {selectedKPI.kpiCode}</Typography>
          <TextField
            label="Enter KPI Value"
            value={kpiValue}
            onChange={handleKPIValueChange}
            fullWidth
          />
          <Button onClick={handleSaveKPIValue}>Save KPI Value</Button>
        </Box>
      )}
    </Box>
  );
};

export default EnterKPIValues;