import React, { useState } from 'react';
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
import axios from 'axios';

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
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [newItem, setNewItem] = useState({
    nome: '',
    quantidade: '',
    valor: '',
    categoria: '',
    laboratorio: '',
    farmacia_pop: false,
    receita: false,
  });

  async function PostData() {
	try {
		const response = await axios.post('http://localhost:3000/estoque', {
			nome: newItem.nome,
			quantidade: newItem.quantidade,
			valor: newItem.valor,
			categoria: newItem.categoria,
			laboratorio: newItem.laboratorio,
			farmacia_pop: newItem.farmacia_pop,
			receita: newItem.receita,
		});

		console.log('Usuário criado:', response.data);
	  } catch (error) {
		console.error('Erro ao criar usuário:', error);
	  }
  }

  async function DelData(itemId) {
	try {
		const response = await axios.delete(`http://localhost:3000/estoque/${itemId}`);

		console.log('Usuário criado:', response.data);
	  } catch (error) {
		console.error('Erro ao criar usuário:', error);
	  }
  }

  async function PutData(item) {
	try {
		const response = await axios.put(`http://localhost:3000/estoque/${item.id}`, {
			nome: item.nome,
			quantidade: item.quantidade,
			valor: item.valor,
			categoria: item.categoria,
			laboratorio: item.laboratorio,
			farmacia_pop: item.farmacia_pop,
			receita: item.receita,
		});

		console.log('Usuário criado:', response.data);
	  } catch (error) {
		console.error('Erro ao criar usuário:', error);
	  }
  }
  

  const [editItem, setEditItem] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false) ;

  const handleOpenConfirmDelete = (item) => {
    setItemToDelete(item);
    setConfirmDelete(true);
  };
  const handleCloseConfirmDelete = () => setConfirmDelete(false);

  const handleOpenEditModal = (item) => {
    setItemToEdit(item);
    setEditItem(item);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenDetailsModal = (item) => {
    setItemDetails(item);
    setDetailsModalOpen(true);
  };
  const handleCloseDetailsModal = () => setDetailsModalOpen(false);

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
		nome: '',
		quantidade: '',
		valor: '',
		categoria: '',
		laboratorio: '',
		farmacia_pop: false,
		receita: false,
    });
	PostData()
    handleClose();
  };

  const handleDeleteItem = () => {
    const updatedItems = items.filter((_, i) => i !== itemToDelete);
    setItems(updatedItems);
	DelData(itemToDelete.id)
    handleCloseConfirmDelete();
  };

  const handleSaveEdit = () => {
    const updatedItems = [...items];
    updatedItems[itemToEdit] = editItem;
	PutData(editItem)
    setItems(updatedItems);
    handleCloseEditModal();
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
						<IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditModal(item)}>
							<EditIcon />
						</IconButton>
						<IconButton edge="end" aria-label="delete" onClick={() => handleOpenConfirmDelete(item)}>
							<DeleteIcon />
						</IconButton>
						</>
					}
				>
					<ListItemAvatar>
						<Avatar onClick={() => handleOpenDetailsModal(item)}  style={{ cursor: 'pointer' }}>
							<InventoryIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={item.nome}
						secondary={
						<>
							Quantidade: {item.quantidade} <br />
							Valor: R${Number(item.valor) ? Number(item.valor).toFixed(2) : '0.00'} <br />
							Categoria: {item.categoria}
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

    	<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Typography variant="h6" gutterBottom>
					Adicionar Novo Item
				</Typography>
				<TextField
					fullWidth
					label="Nome do Item"
					value={newItem.nome}
					onChange={(e) => setNewItem({ ...newItem, nome: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label="Quantidade"
					type="number"
					value={newItem.quantidade}
					onChange={(e) => setNewItem({ ...newItem, quantidade: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label="Valor (R$)"
					type="number"
					value={newItem.valor}
					onChange={(e) => setNewItem({ ...newItem, valor: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					select
					label="Categoria"
					value={newItem.categoria}
					onChange={(e) => setNewItem({ ...newItem, categoria: e.target.value })}
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
					value={newItem.laboratorio}
					onChange={(e) => setNewItem({ ...newItem, laboratorio: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<FormControlLabel
					control={
					<Checkbox
						checked={newItem.farmacia_pop}
						onChange={(e) => setNewItem({ ...newItem, farmacia_pop: e.target.checked })}
					/>
					}
					label="Farmácia Top"
					sx={{ mb: 2 }}
				/>
				<FormControlLabel
					control={
					<Checkbox
						checked={newItem.receita}
						onChange={(e) => setNewItem({ ...newItem, receita: e.target.checked })}
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

		<Modal open={confirmDelete} onClose={handleCloseConfirmDelete}>
			<Box sx={confirmDeleteStyle}>
				<Typography variant="h6" gutterBottom>
					Tem certeza que deseja excluir?
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
					<Button
					variant="outlined"
					color="primary"
					onClick={handleCloseConfirmDelete}
					>
					Cancelar
					</Button>
					<Button
					variant="contained"
					color="error"
					onClick={handleDeleteItem}
					>
					Excluir
					</Button>
				</Box>
			</Box>
      	</Modal>

    	<Modal open={editModalOpen} onClose={handleCloseEditModal}>
			<Box sx={style}>
				<Typography variant="h6" gutterBottom> Editar Item </Typography>
				<TextField
					fullWidth
					label="Nome do Item"
					value={editItem.nome || ''}
					onChange={(e) => setEditItem({ ...editItem, nome: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label="Quantidade"
					type="number"
					value={editItem.quantidade || ''}
					onChange={(e) => setEditItem({ ...editItem, quantidade: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label="Valor (R$)"
					type="number"
					value={editItem.valor || ''}
					onChange={(e) => setEditItem({ ...editItem, valor: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					select
					label="Categoria"
					value={editItem.categoria || ''}
					onChange={(e) => setEditItem({ ...editItem, categoria: e.target.value })}
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
					value={editItem.laboratorio || ''}
					onChange={(e) => setEditItem({ ...editItem, laboratorio: e.target.value })}
					sx={{ mb: 2 }}
				/>
				<FormControlLabel
					control={
					<Checkbox
						checked={editItem.farmacia_pop || false}
						onChange={(e) => setEditItem({ ...editItem, farmacia_pop: e.target.checked })}
					/>
					}
					label="Farmácia Top"
					sx={{ mb: 2 }}
				/>
				<FormControlLabel
					control={
					<Checkbox
						checked={editItem.receita || false}
						onChange={(e) => setEditItem({ ...editItem, receita: e.target.checked })}
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

    	<Modal open={detailsModalOpen} onClose={handleCloseDetailsModal}>
			<Box sx={style}>
				<Typography variant="h6" gutterBottom>
				Detalhes do Item
				</Typography>
				{itemDetails && (
				<>
					<TextField
					fullWidth
					label="Nome do Item"
					value={itemDetails.nome}
					InputProps={{
						readOnly: true, 
					}}
					sx={{ mb: 2 }}
					/>
					<TextField
					fullWidth
					label="Quantidade"
					type="number"
					value={itemDetails.quantidade}
					InputProps={{
						readOnly: true, 
					}}
					sx={{ mb: 2 }}
					/>
					<TextField
					fullWidth
					label="Valor (R$)"
					type="number"
					value={Number(itemDetails.valor) ? Number(itemDetails.valor).toFixed(2) : '0.00'}
					InputProps={{
						readOnly: true, 
					}}
					sx={{ mb: 2 }}
					/>
					<TextField
					fullWidth
					select
					label="Categoria"
					value={itemDetails.categoria}
					InputProps={{
						readOnly: true, 
					}}
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
					value={itemDetails.laboratorio}
					InputProps={{
						readOnly: true, 
					}}
					sx={{ mb: 2 }}
					/>
					<FormControlLabel
					control={
						<Checkbox
						checked={itemDetails.farmacia_pop}
						readOnly 
						/>
					}
					label="Farmácia Top"
					sx={{ mb: 2 }}
					/>
					<FormControlLabel
					control={
						<Checkbox
						checked={itemDetails.receita}
						readOnly 
						/>
					}
					label="Requer Receita"
					sx={{ mb: 2 }}
					/>
				</>
				)}
				<Box sx={{ mt: 2 }}> {}
					<Button
						variant="outlined"
						fullWidth
						onClick={handleCloseDetailsModal}
						sx={{ height: '100%', width: '100%' }} 
					>Fechar
					</Button>
				</Box>
			</Box>
		</Modal>
    </Box>
  );
}

export default StockSystem;
