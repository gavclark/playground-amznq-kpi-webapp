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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { KPI, KPIGroup } from '@/types/kpi';

export default function MaintainKPIGroup() {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<KPIGroup[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<KPIGroup | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGroup, setNewGroup] = useState<Partial<KPIGroup>>({
    code: '',
    description: '',
    kpiIds: []
  });

  const handleSearch = () => {
    // TODO: Implement search functionality with AWS Amplify
    console.log('Searching for:', searchQuery);
  };

  const handleCreateGroup = () => {
    setSelectedGroup(null);
    setNewGroup({
      code: '',
      description: '',
      kpiIds: []
    });
    setOpenDialog(true);
  };

  const handleEditGroup = (group: KPIGroup) => {
    setSelectedGroup(group);
    setNewGroup(group);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGroup(null);
    setNewGroup({
      code: '',
      description: '',
      kpiIds: []
    });
  };

  const handleToggleKPI = (kpiId: string) => {
    const currentKpiIds = newGroup.kpiIds || [];
    const updatedKpiIds = currentKpiIds.includes(kpiId)
      ? currentKpiIds.filter(id => id !== kpiId)
      : [...currentKpiIds, kpiId];
    setNewGroup({ ...newGroup, kpiIds: updatedKpiIds });
  };

  const handleSaveGroup = () => {
    if (selectedGroup) {
      // TODO: Implement update functionality with AWS Amplify
      console.log('Updating KPI Group:', { ...newGroup, id: selectedGroup.id });
    } else {
      // TODO: Implement create functionality with AWS Amplify
      const group: KPIGroup = {
        ...newGroup as KPIGroup,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'current-user', // Will be replaced with Cognito user
        updatedBy: 'current-user', // Will be replaced with Cognito user
      };
      console.log('Creating new KPI Group:', group);
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ height: '100vh', width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Maintain KPI Groups
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Search KPI Groups by code or description"
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
            <Button variant="contained" color="primary" onClick={handleCreateGroup}>
              Create New Group
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Number of KPIs</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated By</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.code}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>{group.kpiIds.length}</TableCell>
                <TableCell>{group.createdBy}</TableCell>
                <TableCell>{new Date(group.createdAt).toLocaleString()}</TableCell>
                <TableCell>{group.updatedBy}</TableCell>
                <TableCell>{new Date(group.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditGroup(group)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedGroup ? 'Edit KPI Group' : 'Create New KPI Group'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Code"
            fullWidth
            value={newGroup.code}
            onChange={(e) => setNewGroup({ ...newGroup, code: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          />
          
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Assign KPIs
          </Typography>
          <List>
            {kpis.map((kpi) => (
              <ListItem key={kpi.id} dense>
                <ListItemText
                  primary={kpi.code}
                  secondary={kpi.description}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    checked={newGroup.kpiIds?.includes(kpi.id) || false}
                    onChange={() => handleToggleKPI(kpi.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveGroup} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}