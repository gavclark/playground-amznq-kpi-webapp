import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MaintainKPI from './pages/MaintainKPI';
import EnterKPIValues from './pages/EnterKPIValues';
import MaintainKPIGroup from './pages/MaintainKPIGroup';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maintain-kpi" element={<MaintainKPI />} />
          <Route path="/enter-kpi-values" element={<EnterKPIValues />} />
          <Route path="/maintain-kpi-group" element={<MaintainKPIGroup />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;