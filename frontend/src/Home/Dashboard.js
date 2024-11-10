import React, { useState, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Avatar, Typography, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ClientIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Assessment';
import SellIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import StockSystem from '../Estoque/StockSystem';
import ClientSystem from '../Clientes/ClientSystem';
import HomePage from './HomePage';
import ReportPage from '../ReportVendas/ReportPage';
import SalesSystem from '../Vendas/SalesSystem';

const drawerWidth = 240;

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [clients, setClients] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState('Home');
  const [openModal, setOpenModal] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const loggedInUser = localStorage.getItem('loggedInUser');
  const user = storedUsers.find(u => u.username === loggedInUser);

  useEffect(() => {
    if (user) {
      setTempUserInfo(user);
    }
  }, [user]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const handleAvatarClick = () => {
    setOpenModal(true);
  };

  const handleSave = () => {
    const updatedUsers = storedUsers.map(u =>
      u.username === user.username ? { ...tempUserInfo } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', tempUserInfo.username);
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
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
            cursor: 'pointer'
          }}
          onClick={handleAvatarClick}
        >
          <Avatar
            alt={tempUserInfo.username}
            src="https://cdn-icons-png.flaticon.com/512/61/61173.png"
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {tempUserInfo.username}
          </Typography>
        </Box>

        <List>
          <ListItem button onClick={() => handleNavigation('Home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('Vendas')}>
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary="Vendas" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('Estoque')}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Estoque" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('Clientes')}>
            <ListItemIcon>
              <ClientIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('Relatorio')}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Relatório" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {currentPage === 'Home' && <HomePage items={items} clients={clients} />}
        {currentPage === 'Vendas' && <SalesSystem items={items} clients={clients} setSalesHistory={setSalesHistory} />}
        {currentPage === 'Estoque' && <StockSystem items={items} setItems={setItems} />}
        {currentPage === 'Clientes' && <ClientSystem clients={clients} setClients={setClients} />}
        {currentPage === 'Relatorio' && <ReportPage items={items} clients={clients} salesHistory={salesHistory} user={user} />}
      </Box>

      <Dialog open={openModal} onClose={handleCancel}>
        <DialogTitle>Informações de Usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Usuário"
            fullWidth
            margin="normal"
            value={tempUserInfo.username}
            onChange={(e) => setTempUserInfo({ ...tempUserInfo, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={tempUserInfo.email}
            onChange={(e) => setTempUserInfo({ ...tempUserInfo, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Sair</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
