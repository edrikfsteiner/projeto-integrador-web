import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';

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

const confirmDeleteStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

function StockSystem({ items, setItems }) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [lowStockModalOpen, setLowStockModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    value: '',
    category: '',
    lab: '',
    pharmacyTop: false,
    prescription: false,
  });
  const [editItem, setEditItem] = useState({});
  const [lowStockItem, setLowStockItem] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenConfirmDelete = (index) => {
    setItemToDelete(index);
    setConfirmDelete(true);
  };
  const handleCloseConfirmDelete = () => setConfirmDelete(false);
  const handleOpenEditModal = (index) => {
    setItemToEdit(index);
    setEditItem(items[index]);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenDetailsModal = (item) => {
    setItemDetails(item);
    setDetailsModalOpen(true);
  };
  const handleCloseDetailsModal = () => setDetailsModalOpen(false);
  
  const handleAddItem = () => {
    const updatedItems = [...items, newItem];
    if(newItem.name && newItem.quantity && newItem.value && newItem.category && newItem.lab){
      setItems(updatedItems);
      setNewItem({
        name: '',
        quantity: '',
        value: '',
        category: '',
        lab: '',
        pharmacyTop: false,
        prescription: false,
      });
      handleClose();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleDeleteItem = () => {
    const updatedItems = items.filter((_, i) => i !== itemToDelete);
    setItems(updatedItems);
    handleCloseConfirmDelete();
  };

  const handleSaveEdit = () => {
    const updatedItems = [...items];
    updatedItems[itemToEdit] = editItem;
    setItems(updatedItems);
    handleCloseEditModal();
  };

  // Detecta apenas o primeiro item com quantidade abaixo de 5
  useEffect(() => {
    const lowStockItems = items.filter(item => item.quantity < 5);
    if (lowStockItems.length > 0 && (!lowStockItem || lowStockItems[0].name !== lowStockItem.name)) {
      setLowStockItem(lowStockItems[0]); // Exibe apenas o primeiro item com estoque baixo
      setLowStockModalOpen(true);
    }
  }, [items]); // Executa sempre que a lista de itens muda

  const handleCloseLowStockModal = () => {
    setLowStockModalOpen(false);
    setLowStockItem(null); // Reseta o item de estoque baixo ao fechar
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Estoque
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Itens no Estoque
        </Typography>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditModal(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleOpenConfirmDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar onClick={() => handleOpenDetailsModal(item)} style={{ cursor: 'pointer' }}>
                  <InventoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <>
                    Quantidade: {item.quantity} <br />
                    Valor: R${Number(item.value) ? Number(item.value).toFixed(2) : '0.00'} <br />
                    Categoria: {item.category} <br />
                    {item.quantity < 5 && (
                      <Typography variant="body2" color="error">
                        <WarningIcon fontSize="small" /> Estoque Baixo
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
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
          <TextField
            fullWidth
            label="Laboratório"
            value={newItem.lab}
            onChange={(e) => setNewItem({ ...newItem, lab: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newItem.pharmacyTop}
                onChange={(e) => setNewItem({ ...newItem, pharmacyTop: e.target.checked })}
              />
            }
            label="Farmácia Top"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newItem.prescription}
                onChange={(e) => setNewItem({ ...newItem, prescription: e.target.checked })}
              />
            }
            label="Requer Receita"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddItem}
          >
            Adicionar
          </Button>
        </Box>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal open={confirmDelete} onClose={handleCloseConfirmDelete}>
        <Box sx={confirmDeleteStyle}>
          <Typography variant="h6" gutterBottom>
            Tem certeza que deseja excluir este item?
          </Typography>
          <Button variant="contained" color="error" onClick={handleDeleteItem}>
            Excluir
          </Button>
        </Box>
      </Modal>

      {/* Modal de edição */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Editar Item
          </Typography>
          <TextField
            fullWidth
            label="Nome do Item"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Quantidade"
            type="number"
            value={editItem.quantity}
            onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Valor (R$)"
            type="number"
            value={editItem.value}
            onChange={(e) => setEditItem({ ...editItem, value: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Categoria"
            value={editItem.category}
            onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Medicamento">Medicamento</MenuItem>
            <MenuItem value="Cosmético">Cosmético</MenuItem>
            <MenuItem value="Suplemento">Suplemento</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Laboratório"
            value={editItem.lab}
            onChange={(e) => setEditItem({ ...editItem, lab: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editItem.pharmacyTop}
                onChange={(e) => setEditItem({ ...editItem, pharmacyTop: e.target.checked })}
              />
            }
            label="Farmácia Top"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editItem.prescription}
                onChange={(e) => setEditItem({ ...editItem, prescription: e.target.checked })}
              />
            }
            label="Requer Receita"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSaveEdit}
          >
            Salvar
          </Button>
        </Box>
      </Modal>

      {/* Modal de detalhes */}
      <Modal open={detailsModalOpen} onClose={handleCloseDetailsModal}>
        <Box sx={style}>
          {itemDetails && (
            <>
              <Typography variant="h6" gutterBottom>
                Detalhes do Item
              </Typography>
              <Typography variant="body1">Nome: {itemDetails.name}</Typography>
              <Typography variant="body1">Quantidade: {itemDetails.quantity}</Typography>
              <Typography variant="body1">Valor: R${Number(itemDetails.value).toFixed(2)}</Typography>
              <Typography variant="body1">Categoria: {itemDetails.category}</Typography>
              <Typography variant="body1">Laboratório: {itemDetails.lab}</Typography>
              <Typography variant="body1">
                Farmácia Top: {itemDetails.pharmacyTop ? 'Sim' : 'Não'}
              </Typography>
              <Typography variant="body1">
                Requer Receita: {itemDetails.prescription ? 'Sim' : 'Não'}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal de aviso de estoque baixo */}
      <Modal open={lowStockModalOpen} onClose={handleCloseLowStockModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Aviso de Estoque Baixo
          </Typography>
          {lowStockItem && (
            <>
              <Typography variant="body1">
                O estoque do item "{lowStockItem.name}" está abaixo de 5 unidades.
              </Typography>
              <Typography variant="body1">
                Quantidade: {lowStockItem.quantity}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            onClick={handleCloseLowStockModal}
            sx={{ mt: 2 }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default StockSystem;
