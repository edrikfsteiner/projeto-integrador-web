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
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

function ClientSystem({ clients, setClients }) {
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });
  const [editClient, setEditClient] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEditModal = (index) => {
    if (index >= 0 && index < clients.length) { // Verifica se o índice existe
      setClientToEdit(index);
      setEditClient(clients[index]);
      setEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenDetailsModal = (client) => {
    setClientDetails(client);
    setDetailsModalOpen(true);
  };
  const handleCloseDetailsModal = () => setDetailsModalOpen(false);

  const handleAddClient = () => {
    if (newClient.name && newClient.email && newClient.phone) {
      setClients([...clients, newClient]);
      setNewClient({ name: '', email: '', phone: '' });
      handleClose();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleDeleteClient = (index) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
  };

  const handleSaveEdit = () => {
    const updatedClients = [...clients];
    updatedClients[clientToEdit] = editClient;
    setClients(updatedClients);
    handleCloseEditModal();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Clientes
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Clientes
        </Typography>
        <List>
          {clients.map((client, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditModal(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClient(index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar onClick={() => handleOpenDetailsModal(client)} style={{ cursor: 'pointer' }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={client.name}
                secondary={`Email: ${client.email} | Telefone: ${client.phone}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Adicionar Cliente
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Adicionar Novo Cliente
          </Typography>
          <TextField
            fullWidth
            label="Nome"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Telefone"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleAddClient}>
            Adicionar
          </Button>
        </Box>
      </Modal>

      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Editar Cliente
          </Typography>
          <TextField
            fullWidth
            label="Nome"
            value={editClient.name || ''}
            onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={editClient.email || ''}
            onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Telefone"
            value={editClient.phone || ''}
            onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSaveEdit}>
            Salvar
          </Button>
        </Box>
      </Modal>

      <Modal open={detailsModalOpen} onClose={handleCloseDetailsModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Detalhes do Cliente
          </Typography>
          {clientDetails && (
            <>
              <TextField
                fullWidth
                label="Nome"
                value={clientDetails.name}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={clientDetails.email}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Telefone"
                value={clientDetails.phone}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" fullWidth onClick={handleCloseDetailsModal}>
                  Fechar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default ClientSystem;
