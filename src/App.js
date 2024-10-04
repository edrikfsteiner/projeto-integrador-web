import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Avatar, Typography } from '@mui/material';
import StockSystem from './Estoque/StockSystem';
import HomePage from './Home/HomePage';

const drawerWidth = 240;

function App() {
  const [items, setItems] = useState([
    { name: 'Paracetamol', quantity: 20 },
    { name: 'Ibuprofeno', quantity: 15 },
  ]);
  const [currentPage, setCurrentPage] = useState('Home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f0f4f8',
            color: '#333',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px',
            backgroundColor: '#e3eaf3',
            borderBottom: '1px solid #ccc',
          }}
        >
          <Avatar
            alt="Usuário"
            src="https://cdn-icons-png.flaticon.com/512/61/61173.png"
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Nome do Usuário
          </Typography>
        </Box>

        <List>
          <ListItem button onClick={() => handleNavigation('Home')}>
            <ListItemText primary="Página Inicial" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('Estoque')}>
            <ListItemText primary="Sistema de Estoque" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#ffffff',
          minHeight: '100vh',
        }}
      >
        {currentPage === 'Home' && <HomePage items={items} />}
        {currentPage === 'Estoque' && <StockSystem items={items} setItems={setItems} />}
      </Box>
    </Box>
  );
}

export default App;
