import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { KPI, KPIValue } from '../types';
import { v4 as uuidv4 } from 'uuid';

const validateKPIValue = (value: string, dataType: KPI['dataType']): boolean => {
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

const formatKPIValue = (value: string | number, dataType: KPI['dataType']): string => {
  switch (dataType) {
    case 'percentage':
      return `${value}%`;
    default:
      return String(value);
  }
};

const EnterKPIValues: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<KPIValue | null>(null);
  const [valueInput, setValueInput] = useState('');
  const [valueError, setValueError] = useState('');
  const [kpis] = useState<KPI[]>([]);  // This would be managed by a proper state management solution
  const [kpiValues, setKpiValues] = useState<KPIValue[]>([]);

  const handleSearch = () => {
    const found = kpis.find(
      (kpi) =>
        kpi.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedKPI(found || null);
  };

  const handleCreateNew = () => {
    setSelectedValue(null);
    setValueInput('');
    setValueError('');
    setIsDialogOpen(true);
  };

  const handleEdit = (value: KPIValue) => {
    setSelectedValue(value);
    setValueInput(String(value.value));
    setValueError('');
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedKPI) return;

    if (!validateKPIValue(valueInput, selectedKPI.dataType)) {
      setValueError(`Invalid ${selectedKPI.dataType} value`);
      return;
    }

    const timestamp = new Date().toISOString();
    const userId = 'current-user'; // In a real app, this would come from authentication

    const newValue: KPIValue = {
      id: selectedValue?.id || uuidv4(),
      kpiId: selectedKPI.id,
      kpiCode: selectedKPI.code,
      kpiDescription: selectedKPI.description,
      value: selectedKPI.dataType === 'string' ? valueInput : Number(valueInput),
      createdAt: selectedValue?.createdAt || timestamp,
      updatedAt: timestamp,
      createdBy: selectedValue?.createdBy || userId,
      updatedBy: userId,
    };

    if (selectedValue) {
      setKpiValues(kpiValues.map((v) => (v.id === selectedValue.id ? newValue : v)));
    } else {
      setKpiValues([...kpiValues, newValue]);
    }

    setIsDialogOpen(false);
    setSelectedValue(null);
    setValueInput('');
    setValueError('');
  };

  const filteredValues = selectedKPI
    ? kpiValues.filter((v) => v.kpiId === selectedKPI.id)
    : [];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Enter KPI Values
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search by KPI Code or Description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ mr: 1 }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {selectedKPI && (
        <>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Selected KPI
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Code:</strong> {selectedKPI.code}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Data Type:</strong> {selectedKPI.dataType}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Description:</strong> {selectedKPI.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateNew}
                >
                  Add New Value
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Value</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Updated By</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredValues.map((value) => (
                  <TableRow key={value.id}>
                    <TableCell>
                      {formatKPIValue(value.value, selectedKPI.dataType)}
                    </TableCell>
                    <TableCell>{new Date(value.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{value.createdBy}</TableCell>
                    <TableCell>{new Date(value.updatedAt).toLocaleString()}</TableCell>
                    <TableCell>{value.updatedBy}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleEdit(value)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          {selectedValue ? 'Edit KPI Value' : 'Add New KPI Value'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label={`Value (${selectedKPI?.dataType})`}
              value={valueInput}
              onChange={(e) => {
                setValueInput(e.target.value);
                setValueError('');
              }}
              error={!!valueError}
              helperText={valueError}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnterKPIValues;