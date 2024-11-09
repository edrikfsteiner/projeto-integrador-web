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
    pharmacyPop: false,
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
        pharmacyPop: false,
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

  useEffect(() => {
    const lowStockItems = items.filter(item => item.quantity < 5);
    if (lowStockItems.length > 0 && (!lowStockItem || lowStockItems[0].name !== lowStockItem.name)) {
      setLowStockItem(lowStockItems[0]);
      setLowStockModalOpen(true);
    }
  }, [items]);

  const handleCloseLowStockModal = () => {
    setLowStockModalOpen(false);
    setLowStockItem(null);
  };

  const isValidText = (value) => /^[A-Za-záéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ\s]+$/.test(value);

  const handleDecimalInput = (value) => {
    let formattedValue = value.replace(',', '.');
    const [integerPart, decimalPart] = formattedValue.split('.');
    
    if (decimalPart && decimalPart.length > 2) {
      formattedValue = `${integerPart}.${decimalPart.substring(0, 2)}`;
    }
    
    return formattedValue;
  };

  const handleChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
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
                    Laboratório: {item.lab} <br />
                    Farmácia Popular: {item.pharmacyPop ? 'Sim' : 'Não'} <br />
                    Requer Receita?: {item.prescription ? 'Sim' : 'Não'} <br />
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
            onChange={(e) => {
              const value = e.target.value;
              if (isValidText(value) || value === "") {
                handleChange("name", value);
              }
            }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Quantidade"
            type="text"
            value={newItem.quantity || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleChange("quantity", value === "" ? "" : parseInt(value, 10));
              }
            }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Valor (R$)"
            type="number"
            value={newItem.value || ''}
            onChange={(e) => {
              const value = handleDecimalInput(e.target.value);
              if (!value || !isNaN(parseFloat(value))) {
                handleChange("value", value === "" ? "" : parseFloat(value));
              }
            }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            select
            label="Categoria"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            sx={{ mb: 2 }}
            required
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
            onChange={(e) => {
              const value = e.target.value;
              if (isValidText(value) || value === "") {
                handleChange("lab", value);
              }
            }}
            sx={{ mb: 2 }}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newItem.pharmacyPop}
                onChange={(e) => setNewItem({ ...newItem, pharmacyPop: e.target.checked })}
              />
            }
            label="Farmácia Popular"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newItem.prescription}
                onChange={(e) => setNewItem({ ...newItem, prescription: e.target.checked })}
              />
            }
            label="Requer Receita?"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddItem}
            disabled={
              !newItem.name ||
              newItem.quantity <= 0 ||
              newItem.value <= 0 ||
              !newItem.lab ||
              !newItem.category
            }
          >
            Adicionar
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
            onChange={(e) => {
              const value = e.target.value;
              if (isValidText(value) || value === "") {
                setEditItem({ ...editItem, name: value });
              }
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Quantidade"
            type="text"
            value={editItem.quantity || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setEditItem({ ...editItem, quantity: value === "" ? "" : parseInt(value, 10) });
              }
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Valor (R$)"
            type="text"
            value={editItem.value|| ''}
            onChange={(e) => {
              const value = handleDecimalInput(e.target.value);
              if (!value || !isNaN(parseFloat(value))) {
                setEditItem({ ...editItem, value: value === "" ? "" : parseFloat(value) });
              }
            }}
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
            onChange={(e) => {
              const value = e.target.value;
              if (isValidText(value) || value === "") {
                setEditItem({ ...editItem, lab: value });
              }
            }}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editItem.pharmacyPop}
                onChange={(e) => setEditItem({ ...editItem, pharmacyPop: e.target.checked })}
              />
            }
            label="Farmácia Popular"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editItem.prescription}
                onChange={(e) => setEditItem({ ...editItem, prescription: e.target.checked })}
              />
            }
            label="Requer Receita?"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSaveEdit}
            disabled={
              !editItem.name ||
              editItem.quantity <= 0 ||
              editItem.value <= 0 ||
              !editItem.lab ||
              !editItem.category
            }
          >
            Salvar
          </Button>
        </Box>
      </Modal>

      {/* Modal de exclusão */}
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
                Farmácia Popular: {itemDetails.pharmacyPop ? 'Sim' : 'Não'}
              </Typography>
              <Typography variant="body1">
                Requer Receita?: {itemDetails.prescription ? 'Sim' : 'Não'}
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
