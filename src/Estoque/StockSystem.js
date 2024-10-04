import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, MenuItem } from '@mui/material';
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
    { name: 'Paracetamol', quantity: 20, value: 10.0, category: 'Medicamento' },
    { name: 'Ibuprofeno', quantity: 15, value: 12.5, category: 'Medicamento' },
  ]);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    value: '',
    category: '',
  });

  // Função para abrir/fechar o modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função para adicionar o item
  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: '', quantity: '', value: '', category: '' });
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
              <ListItemText
                primary={item.name}
                secondary={
                  <>
                    Quantidade: {item.quantity} <br />
                    Valor: R${item.value.toFixed(2)} <br />
                    Categoria: {item.category}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Botão para abrir o modal - Movido para baixo */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Adicionar Item
        </Button>
      </Box>

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

          <TextField
            fullWidth
            label="Valor (R$)"
            type="number"
            value={newItem.value}
            onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            select
            label="Categoria"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Medicamento">Medicamento</MenuItem>
            <MenuItem value="Cosmético">Cosmético</MenuItem>
            <MenuItem value="Suplemento">Suplemento</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </TextField>

          <Button variant="contained" fullWidth onClick={handleAddItem}>
            Adicionar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default StockSystem;
