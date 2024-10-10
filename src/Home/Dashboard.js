import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import StockSystem from '../Estoque/StockSystem';
import HomePage from './HomePage';

const drawerWidth = 240;

const Dashboard = () => {
  const [items, setItems] = useState([
    { name: 'Paracetamol', quantity: 20 },
    { name: 'Ibuprofeno', quantity: 15 },
  ]);
  const [currentPage, setCurrentPage] = useState('Home');
  const [openModal, setOpenModal] = useState(false); 
  const [tempUserInfo, setTempUserInfo] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  
  // Obtendo o usuário logado e suas informações do localStorage
  const user = JSON.parse(localStorage.getItem('users')).find(u => u.username === localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (user) {
      setTempUserInfo(user); // Definindo as informações reais no estado
    }
  }, [user]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Remover o usuário logado
    navigate('/'); // Redirecionar para a página de login
  };

  const handleAvatarClick = () => {
    setOpenModal(true); // Abrir o modal de edição
  };

  const handleSave = () => {
    // Atualizar o usuário no localStorage
    const updatedUsers = JSON.parse(localStorage.getItem('users')).map(u =>
      u.username === user.username ? { ...tempUserInfo } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', tempUserInfo.username); // Atualizar o nome de usuário logado

    setOpenModal(false); // Fechar o modal
  };

  const handleCancel = () => {
    setOpenModal(false); // Fechar o modal sem salvar
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
          onClick={handleAvatarClick} // Abrir modal ao clicar no avatar
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
          <ListItem button onClick={() => handleNavigation('Estoque')}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Sistema de Estoque" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
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

      <Dialog open={openModal} onClose={handleCancel}>
        <DialogTitle>Editar Informações do Usuário</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome de Usuário"
            fullWidth
            value={tempUserInfo.username}
            onChange={(e) => setTempUserInfo({ ...tempUserInfo, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="E-mail"
            type="email"
            fullWidth
            value={tempUserInfo.email}
            onChange={(e) => setTempUserInfo({ ...tempUserInfo, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Senha"
            type="password"
            fullWidth
            value={tempUserInfo.password}
            onChange={(e) => setTempUserInfo({ ...tempUserInfo, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">Cancelar</Button>
          <Button onClick={handleSave} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
