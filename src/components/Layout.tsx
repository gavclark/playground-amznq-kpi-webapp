import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddChartIcon from '@mui/icons-material/AddChart';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Maintain KPIs', path: '/maintain-kpi', icon: <BarChartIcon /> },
  { text: 'Enter KPI Values', path: '/enter-kpi-values', icon: <AddChartIcon /> },
  { text: 'KPI Groups', path: '/maintain-kpi-group', icon: <GroupWorkIcon /> },
];

interface LayoutProps {
  children: React.ReactNode;
  user?: { username: string; attributes: Record<string, any> };
  onSignOut?: () => void;
}

export default function Layout({ children, user, onSignOut }: LayoutProps) {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: drawerWidth,
          height: 64,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          zIndex: 1,
        }}
      >
        {user && (
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>
              {user.attributes.email || user.username}
            </Typography>
            {onSignOut && (
              <Button variant="outlined" onClick={onSignOut}>
                Sign Out
              </Button>
            )}
          </Box>
        )}
      </Box>

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
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => router.push(item.path)}
              selected={router.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: `calc(100% - ${drawerWidth}px)`,
          mt: '64px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}