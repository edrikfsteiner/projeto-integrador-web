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
    if (index >= 0 && index < clients.length) {
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

  const isValidText = (value) => /^[A-Za-záéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ\s]+$/.test(value);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const formatPhone = (value) => {
    const onlyNumbers = value.replace(/\D/g, '');
    if (onlyNumbers.length === 10) {
      return `(${onlyNumbers.substring(0, 2)}) ${onlyNumbers.substring(2, 7)}-${onlyNumbers.substring(7, 11)}`;
    }
    return onlyNumbers;
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
                secondary={`Email: ${client.email} | Celular: ${client.phone}`}
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
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setNewClient({ ...newClient, name: e.target.value })
              }
            }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Celular"
            value={formatPhone(newClient.phone)}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/\D/g, '').slice(0, 10); 
              setNewClient({ ...newClient, phone: numericValue });
            }}
            sx={{ mb: 2 }}
            required
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddClient}
            disabled={
              !newClient.name || 
              !newClient.email || 
              !newClient.phone || 
              !isValidEmail(newClient.email) ||
              newClient.phone.length !== 10
            }
          >
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
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setEditClient({ ...editClient, name: e.target.value })
              }
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={editClient.email || ''}
            onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Celular"
            value={formatPhone(editClient.phone || '')}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/\D/g, '').slice(0, 10); 
              setEditClient({ ...editClient, phone: numericValue });
            }}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSaveEdit}
            disabled={
              !editClient.name || 
              !editClient.email || 
              !editClient.phone || 
              !isValidEmail(editClient.email) ||
              editClient.phone.length !== 10
            }
          >
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
                label="Celular"
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
