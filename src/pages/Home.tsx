import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Assessment, Addchart, Group } from '@mui/icons-material';

const Home: React.FC = () => {
  const features = [
    {
      title: 'KPI Management',
      description: 'Create and manage your Key Performance Indicators',
      icon: <Assessment sx={{ fontSize: 40 }} />,
    },
    {
      title: 'KPI Values',
      description: 'Record and track KPI values over time',
      icon: <Addchart sx={{ fontSize: 40 }} />,
    },
    {
      title: 'KPI Groups',
      description: 'Organize KPIs into logical groups',
      icon: <Group sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to the Arriva KPI Management System
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Manage your Key Performance Indicators efficiently
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
              elevation={2}
            >
              <Box sx={{ mb: 2, color: 'primary.main' }}>{feature.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;