import React from 'react';
import { Box, Typography } from '@mui/material';

function HomePage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bem-vindo à Farmácia
      </Typography>
      <Typography variant="body1">
        Aqui você pode gerenciar seu estoque de medicamentos e produtos. Use o menu lateral para navegar entre as opções.
      </Typography>
    </Box>
  );
}

export default HomePage;
