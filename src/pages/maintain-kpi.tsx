import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { KPI, KPIDataType } from '@/types/kpi';

const columns: GridColDef[] = [
  { field: 'code', headerName: 'KPI Code', width: 150 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'dataType', headerName: 'Data Type', width: 150 },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
  { field: 'updatedAt', headerName: 'Updated At', width: 200 },
];

export default function MaintainKPI() {
  const [searchQuery, setSearchQuery] = useState('');
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [newKPI, setNewKPI] = useState<Partial<KPI>>({
    code: '',
    description: '',
    dataType: KPIDataType.STRING,
  });

  const handleSearch = () => {
    // TODO: Implement search functionality with AWS Amplify
    console.log('Searching for:', searchQuery);
  };

  const handleCreateKPI = () => {
    setSelectedKPI(null);
    setNewKPI({
      code: '',
      description: '',
      dataType: KPIDataType.STRING,
    });
    setOpenDialog(true);
  };

  const handleEditKPI = (kpi: KPI) => {
    setSelectedKPI(kpi);
    setNewKPI(kpi);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedKPI(null);
    setNewKPI({
      code: '',
      description: '',
      dataType: KPIDataType.STRING,
    });
  };

  const handleSaveKPI = () => {
    if (selectedKPI) {
      // TODO: Implement update functionality with AWS Amplify
      console.log('Updating KPI:', { ...newKPI, id: selectedKPI.id });
    } else {
      // TODO: Implement create functionality with AWS Amplify
      const kpi: KPI = {
        ...newKPI as KPI,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'current-user', // Will be replaced with Cognito user
        updatedBy: 'current-user', // Will be replaced with Cognito user
      };
      console.log('Creating new KPI:', kpi);
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ height: '100vh', width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Maintain KPIs
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
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
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={handleCreateKPI}>
              Create New KPI
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <DataGrid
        rows={kpis}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={(params) => handleEditKPI(params.row as KPI)}
        sx={{ height: 400 }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedKPI ? 'Edit KPI' : 'Create New KPI'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="KPI Code"
            fullWidth
            value={newKPI.code}
            onChange={(e) => setNewKPI({ ...newKPI, code: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newKPI.description}
            onChange={(e) => setNewKPI({ ...newKPI, description: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Data Type</InputLabel>
            <Select
              value={newKPI.dataType}
              label="Data Type"
              onChange={(e) => setNewKPI({ ...newKPI, dataType: e.target.value as KPIDataType })}
            >
              {Object.values(KPIDataType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveKPI} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}