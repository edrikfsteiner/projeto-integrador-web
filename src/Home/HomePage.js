import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const HomePage = ({ items, contacts, clients }) => {
  const totalItems = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const lowStockItems = items.filter(item => item.quantity < 10);
  const totalContacts = contacts.length;
  const totalClients = clients.length;

  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.username === loggedInUser);
    if (foundUser) {
      setUser(foundUser);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo(a), {user.username}!
      </Typography>

      <Grid container spacing={3}>
        {/* Resumo do Sistema de Estoque */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#f0f8ff' }}>
            <CardContent>
              <Typography variant="h6">Resumo do Estoque</Typography>
              <Typography variant="body1">Total de Produtos: {totalItems}</Typography>
              <Typography variant="body1">Produtos com Estoque Baixo: {lowStockItems.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo do Sistema de Agenda */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#e6ffe6' }}>
            <CardContent>
              <Typography variant="h6">Resumo da Agenda</Typography>
              <Typography variant="body1">Total de Contatos: {totalContacts}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo do Sistema de Clientes */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#ffe4e1' }}>
            <CardContent>
              <Typography variant="h6">Resumo dos Clientes</Typography>
              <Typography variant="body1">Total de Clientes: {totalClients}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
