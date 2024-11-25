import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import {
  Home as HomeIcon,
  Assessment as AssessmentIcon,
  Addchart as AddChartIcon,
  Group as GroupIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const Navigation: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Maintain KPI', path: '/maintain-kpi', icon: <AssessmentIcon /> },
    { text: 'Enter KPI Values', path: '/enter-kpi-values', icon: <AddChartIcon /> },
    { text: 'Maintain KPI Group', path: '/maintain-kpi-group', icon: <GroupIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <Typography variant="h6" sx={{ px: 2, pb: 2 }}>
          KPI Management
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Navigation;