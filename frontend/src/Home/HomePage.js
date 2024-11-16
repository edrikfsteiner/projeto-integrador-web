import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const HomePage = ({ items, clients, sales, purchases }) => {
  const totalItems = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});
  const lowStockItems = items.filter(item => item.quantity < 10);
  const totalClients = clients.length;
  const totalSales = sales ? sales.length : 0;
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.total || 0), 0);
  const totalPurchases = purchases ? purchases.length : 0;
  const totalExpenses = purchases ? purchases.reduce((sum, purchase) => sum + (purchase.total || 0), 0) : 0;
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
        {/* Resumo do Sistema de Produtos */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#f0f8ff' }}>
            <CardContent>
              <Typography variant="h6">Resumo dos Produtos</Typography>
              <Typography variant="body1">Total de Produtos: {totalItems}</Typography>
              <Typography variant="body1">Produtos com Estoque Baixo: {lowStockItems.length}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Quantidade por Categoria:</Typography>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <Typography variant="body1" key={category}>
                  {category}: {count}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#f0f8ff' }}>
            <CardContent>
              <Typography variant="h6">Resumo do Estoque</Typography>
              <Typography variant="body1">Total de Compras: {totalPurchases}</Typography>
              <Typography variant="body1">Despesa Total: R${totalExpenses.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo do Sistema de Vendas */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#e6ffe6' }}>
            <CardContent>
              <Typography variant="h6">Resumo de Vendas</Typography>
              <Typography variant="body1">Total de Vendas: {totalSales}</Typography>
              <Typography variant="body1">Receita Total: R${totalRevenue.toFixed(2)}</Typography>
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
