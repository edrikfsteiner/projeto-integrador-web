import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function StockSystem() {
  const [items, setItems] = useState([
    { name: 'Paracetamol', quantity: 20 },
    { name: 'Ibuprofeno', quantity: 15 },
  ]);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });

  // Função para abrir/fechar o modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função para adicionar o item
  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: '', quantity: '' });
    handleClose();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Estoque
      </Typography>

      {/* Lista de Itens no Estoque */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Itens no Estoque
        </Typography>
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <InventoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={`Quantidade: ${item.quantity}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Botão para abrir o modal - Movido para baixo */}
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} sx={{ mt: 3 }}>
        Adicionar Item
      </Button>

      {/* Modal para adicionar novo item */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Adicionar Novo Item
          </Typography>
          <TextField
            fullWidth
            label="Nome do Item"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Quantidade"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleAddItem}>
            Adicionar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default StockSystem;
