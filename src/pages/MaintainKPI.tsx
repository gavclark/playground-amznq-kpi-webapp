import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { KPI } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { addKPI, getKPIs } from '../utils/indexedDB';

const MaintainKPI: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<KPI>>({
    kpiCode: '',
    kpiDescription: '',
    kpidataType: 'string',
  });
  const [kpis, setKpis] = useState<KPI[]>([]);

  const handleSearch = () => {
    const found = kpis.find(
      (kpi) =>
        kpi.kpiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.kpiDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedKPI(found || null);
  };

  const handleCreateNew = () => {
    setSelectedKPI(null);
    setFormData({
      kpiCode: '',
      kpiDescription: '',
      kpidataType: 'string',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = () => {
    if (selectedKPI) {
      setFormData(selectedKPI);
      setIsDialogOpen(true);
    }
  };

  const handleSave = async () => {
    const timestamp = new Date().toISOString();
    const userId = 'current-user'; // In a real app, this would come from authentication
  
    const newKPI: KPI = {
      kpiId: selectedKPI?.kpiId || uuidv4(),
      kpiCode: formData.kpiCode || '',
      kpiDescription: formData.kpiDescription || '',
      kpidataType: formData.kpidataType as 'string' | 'percentage' | 'number',
      createdAt: selectedKPI?.createdAt || timestamp,
      updatedAt: timestamp,
      createdBy: selectedKPI?.createdBy || userId,
      updatedBy: userId,
    };
  
    await addKPI(newKPI);
  
    if (selectedKPI) {
      setKpis(kpis.map((kpi) => (kpi.kpiId === selectedKPI.kpiId ? newKPI : kpi)));
    } else {
      setKpis([...kpis, newKPI]);
    }
  
    setIsDialogOpen(false);
    setFormData({
      kpiCode: '',
      kpiDescription: '',
      kpidataType: 'string',
    });
  };

  useEffect(() => {
    const fetchKPIs = async () => {
      const fetchedKPIs = await getKPIs();
      setKpis(fetchedKPIs);
    };
  
    fetchKPIs();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Maintain KPI
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateNew}
            >
              Create New KPI
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {selectedKPI && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Selected KPI
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Code:</strong> {selectedKPI.kpiCode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Data Type:</strong> {selectedKPI.kpidataType}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Description:</strong> {selectedKPI.kpiDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          {selectedKPI ? 'Edit KPI' : 'Create New KPI'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="KPI Code"
              value={formData.kpiCode}
              onChange={(e) => setFormData({ ...formData, kpiCode: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.kpiDescription}
              onChange={(e) => setFormData({ ...formData, kpiDescription: e.target.value })}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Data Type"
              value={formData.kpidataType}
              onChange={(e) => setFormData({ ...formData, kpidataType: e.target.value as 'string' | 'percentage' | 'number' })}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="number">Number</MenuItem>
            </TextField>
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

export default MaintainKPI;

