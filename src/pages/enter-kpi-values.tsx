import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { KPI, KPIValue } from '@/types/kpi';

export default function EnterKPIValues() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [kpiValues, setKpiValues] = useState<KPIValue[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<KPIValue | null>(null);
  const [newValue, setNewValue] = useState<string>('');

  const handleSearch = () => {
    // TODO: Implement search functionality with AWS Amplify
    console.log('Searching for:', searchQuery);
  };

  const handleKPISelect = (kpi: KPI) => {
    setSelectedKPI(kpi);
    // TODO: Fetch KPI values from DynamoDB
    console.log('Selected KPI:', kpi);
  };

  const handleCreateValue = () => {
    setSelectedValue(null);
    setNewValue('');
    setOpenDialog(true);
  };

  const handleEditValue = (value: KPIValue) => {
    setSelectedValue(value);
    setNewValue(value.value.toString());
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedValue(null);
    setNewValue('');
  };

  const validateValue = (value: string): boolean => {
    if (!selectedKPI) return false;

    switch (selectedKPI.dataType) {
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

  const handleSaveValue = () => {
    if (!selectedKPI) return;

    if (!validateValue(newValue)) {
      // TODO: Show error message
      console.error('Invalid value for selected data type');
      return;
    }

    if (selectedValue) {
      // TODO: Implement update functionality with AWS Amplify
      console.log('Updating KPI value:', {
        ...selectedValue,
        value: newValue,
        updatedAt: new Date().toISOString(),
        updatedBy: 'current-user', // Will be replaced with Cognito user
      });
    } else {
      // TODO: Implement create functionality with AWS Amplify
      const kpiValue: KPIValue = {
        id: crypto.randomUUID(),
        kpiId: selectedKPI.id,
        kpiCode: selectedKPI.code,
        kpiDescription: selectedKPI.description,
        value: newValue,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'current-user', // Will be replaced with Cognito user
        updatedBy: 'current-user', // Will be replaced with Cognito user
      };
      console.log('Creating new KPI value:', kpiValue);
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ height: '100vh', width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Enter KPI Values
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Search KPIs by code or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {selectedKPI && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Selected KPI Details
            </Typography>
            <Typography><strong>Code:</strong> {selectedKPI.code}</Typography>
            <Typography><strong>Description:</strong> {selectedKPI.description}</Typography>
            <Typography><strong>Data Type:</strong> {selectedKPI.dataType}</Typography>
            
            <Box sx={{ mt: 2, mb: 2 }}>
              <Button variant="contained" color="primary" onClick={handleCreateValue}>
                Add New Value
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
              Historical Values
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Value</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated By</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kpiValues.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell>{value.value}</TableCell>
                      <TableCell>{value.createdBy}</TableCell>
                      <TableCell>{new Date(value.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{value.updatedBy}</TableCell>
                      <TableCell>{new Date(value.updatedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEditValue(value)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedValue ? 'Edit KPI Value' : 'Create New KPI Value'}
        </DialogTitle>
        <DialogContent>
          {selectedKPI && (
            <TextField
              autoFocus
              margin="dense"
              label={`Value (${selectedKPI.dataType})`}
              fullWidth
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              error={!validateValue(newValue)}
              helperText={!validateValue(newValue) ? `Invalid ${selectedKPI.dataType} value` : ''}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveValue} 
            variant="contained" 
            color="primary"
            disabled={!validateValue(newValue)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}