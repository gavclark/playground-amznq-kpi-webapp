import { Typography } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to KPI Management System
      </Typography>
      <Typography variant="body1">
        Use the navigation menu on the left to access different sections of the application.
      </Typography>
    </div>
  );
}