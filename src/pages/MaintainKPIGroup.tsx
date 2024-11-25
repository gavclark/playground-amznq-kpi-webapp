import React, { useState, useEffect } from 'react';
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
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { KPI, KPIGroup } from '../types';
import { v4 as uuidv4 } from 'uuid';

const MaintainKPIGroup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<KPIGroup | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<KPIGroup>>({
    kpiCode: '',
    kpiDescription: '',
    kpiIds: [],
  });
  const [groups, setGroups] = useState<KPIGroup[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [isKPISelectionOpen, setIsKPISelectionOpen] = useState(false);

  useEffect(() => {
    // Fetch KPIs from an API or other source
    const fetchKPIs = async () => {
      const fetchedKPIs: KPI[] = [
        { kpiId: uuidv4(), kpiCode: 'KPI 1', kpidataType: 'number' , kpiDescription: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          createdBy: 'string',
          updatedBy: 'string'
        },
        { kpiId: uuidv4(), kpiCode: 'KPI 2', kpidataType: 'percentage', kpiDescription: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          createdBy: 'string',
          updatedBy: 'string' },
        { kpiId: uuidv4(), kpiCode: 'KPI 3', kpidataType: 'string',  kpiDescription: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          createdBy: 'string',
          updatedBy: 'string'},
      ];
      setKpis(fetchedKPIs);
    };

    fetchKPIs();
  }, []);

  const handleSearch = () => {
    const found = groups.find(
      (group) =>
        group.kpiCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.kpiDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedGroup(found || null);
  };

  const handleCreateNew = () => {
    setSelectedGroup(null);
    setFormData({
      kpiCode: '',
      kpiDescription: '',
      kpiIds: [],
    });
    setIsDialogOpen(true);
  };

  const handleEdit = () => {
    if (selectedGroup) {
      setFormData(selectedGroup);
      setIsDialogOpen(true);
    }
  };

  const handleSave = () => {
    const timestamp = new Date().toISOString();
    const userId = 'current-user'; // In a real app, this would come from authentication

    const newGroup: KPIGroup = {
      kpiId: selectedGroup?.kpiId || uuidv4(),
      kpiCode: formData.kpiCode || '',
      kpiDescription: formData.kpiDescription || '',
      kpiIds: formData.kpiIds || [],
      createdAt: selectedGroup?.createdAt || timestamp,
      updatedAt: timestamp,
      createdBy: selectedGroup?.createdBy || userId,
      updatedBy: userId,
    };

    if (selectedGroup) {
      setGroups(groups.map((group) => (group.kpiId === selectedGroup.kpiId ? newGroup : group)));
    } else {
      setGroups([...groups, newGroup]);
    }

    setIsDialogOpen(false);
    setFormData({
      kpiCode: '',
      kpiDescription: '',
      kpiIds: [],
    });
    setSelectedGroup(newGroup);
  };

  const handleOpenKPISelection = () => {
    setIsKPISelectionOpen(true);
  };

  const handleToggleKPI = (kpiId: string) => {
    const currentKPIs = formData.kpiIds || [];
    const newKPIs = currentKPIs.includes(kpiId)
      ? currentKPIs.filter(id => id !== kpiId)
      : [...currentKPIs, kpiId];
    setFormData({ ...formData, kpiIds: newKPIs });
  };

  const getAssignedKPIs = () => {
    const assignedIds = selectedGroup?.kpiIds || [];
    return kpis.filter(kpi => assignedIds.includes(kpi.kpiId));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Maintain KPI Group
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search by Group Code or Description"
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
              Create New Group
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {selectedGroup && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Selected Group
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Code:</strong> {selectedGroup.kpiCode}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Description:</strong> {selectedGroup.kpiDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assigned KPIs
            </Typography>
            <List>
              {getAssignedKPIs().map((kpi) => (
                <ListItem
                  key={kpi.kpiId}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => {
                        const newKPIs = selectedGroup.kpiIds.filter(id => id !== kpi.kpiId);
                        const updatedGroup = { ...selectedGroup, kpiIds: newKPIs };
                        setGroups(groups.map(g => g.kpiId === selectedGroup.kpiId ? updatedGroup : g));
                        setSelectedGroup(updatedGroup);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={kpi.kpiCode}
                    secondary={kpi.kpiDescription}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedGroup ? 'Edit Group' : 'Create New Group'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Group Code"
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
            <Button
              variant="outlined"
              onClick={handleOpenKPISelection}
              fullWidth
            >
              Assign KPIs
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isKPISelectionOpen} 
        onClose={() => setIsKPISelectionOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select KPIs</DialogTitle>
        <DialogContent>
          <List>
            {kpis.map((kpi) => (
              <React.Fragment key={kpi.kpiId}>
                <ListItem>
                  <Checkbox
                    edge="start"
                    checked={(formData.kpiIds || []).includes(kpi.kpiId)}
                    onChange={() => handleToggleKPI(kpi.kpiId)}
                  />
                  <ListItemText
                    primary={kpi.kpiId}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsKPISelectionOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaintainKPIGroup;