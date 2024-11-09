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
  maxHeight: '80vh',
  overflowY: 'auto',
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
  const [searchTerm, setSearchTerm] = useState("");
  const [newClient, setNewClient] = useState({name: '',
                                              email: '',
                                              phone: '',
                                              cpf: '',
                                              birthdate: '',
                                              number: '',
                                              cep: '',
                                              street: '',
                                              district: '',
                                              city: '',
                                              uf: '' });
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
    if (newClient.name && newClient.email && newClient.phone && isValidCpf(newClient.cpf) && isValidBirthdate(newClient.birthdate)) {
      const formattedCpf = formatCpf(newClient.cpf);
      setClients([...clients, { ...newClient, cpf: formattedCpf }]);
      setNewClient({name: '',
                    email: '',
                    phone: '',
                    cpf: '',
                    birthdate: '',
                    number: '',
                    cep: '',
                    street: '',
                    district: '',
                    city: '',
                    uf: '' });
      handleClose();
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
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

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isValidText = (value) => /^[A-Za-záéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ\s]+$/.test(value);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const isValidBirthdate = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    return birthDate < today;
  };  

  const isValidCpf = (cpf) => /^\d{11}$/.test(cpf);

  const formatCpf = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  const formatPhone = (value) => {
    const onlyNumbers = value.replace(/\D/g, '');
    if (onlyNumbers.length === 11) {
      return `(${onlyNumbers.substring(0, 2)}) ${onlyNumbers.substring(2, 7)}-${onlyNumbers.substring(7, 12)}`;
    }
    return onlyNumbers;
};

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Clientes
      </Typography>

      <TextField
        label="Pesquisar Cliente"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Clientes
        </Typography>
        <List>
          {filteredClients.map((client, index) => (
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
                secondary={`Email: ${client.email} | 
                            Celular: ${formatPhone(client.phone)} | 
                            CPF: ${client.cpf} | 
                            Data de nascimento: ${client.birthdate} | 
                            Número: ${client.number} | 
                            CEP: ${client.cep} | 
                            Rua: ${client.street} | 
                            Bairro: ${client.district} | 
                            Cidade: ${client.city} | 
                            UF: ${client.uf}`}
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
            inputProps={{ maxLength: 100 }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            inputProps={{ maxLength: 100 }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Celular"
            value={formatPhone(newClient.phone)}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/\D/g, '').slice(0, 11); 
              setNewClient({ ...newClient, phone: numericValue });
            }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="CPF"
            value={formatCpf(newClient.cpf)}
            onChange={(e) => {
              const cpfValue = e.target.value.replace(/\D/g, '').slice(0, 11);
              setNewClient({ ...newClient, cpf: cpfValue });
            }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Data de Nascimento"
            type="date"
            value={newClient.birthdate}
            onChange={(e) => setNewClient({ ...newClient, birthdate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Número"
            value={newClient.number}
            onChange={(e) => setNewClient({ ...newClient, number: e.target.value })}
            inputProps={{ maxLength: 10 }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="CEP"
            value={newClient.cep}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '').slice(0, 8);
              const formattedValue = numericValue.replace(/(\d{5})(\d{3})/, '$1-$2');
              setNewClient({ ...newClient, cep: formattedValue });
            }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Rua"
            value={newClient.street}
            onChange={(e) => setNewClient({ ...newClient, street: e.target.value })}
            inputProps={{ maxLength: 200 }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Bairro"
            value={newClient.district}
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setNewClient({ ...newClient, district: e.target.value })
              }
            }}
            inputProps={{ maxLength: 80 }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Cidade"
            value={newClient.city}
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setNewClient({ ...newClient, city: e.target.value })
              }
            }}
            inputProps={{ maxLength: 80 }}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="UF"
            value={newClient.uf}
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setNewClient({ ...newClient, uf: e.target.value })
              }
            }}
            inputProps={{ maxLength: 2 }}
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
              !isValidEmail(newClient.email) ||
              !newClient.phone || 
              newClient.phone.length !== 11 ||
              !newClient.cpf || 
              !isValidCpf(newClient.cpf) ||
              !newClient.birthdate ||
              !newClient.number ||
              !newClient.cep ||
              !newClient.street ||
              !newClient.district ||
              !newClient.city ||
              !newClient.uf
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
            label="Email"
            type="email"
            value={editClient.email || ''}
            onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
            inputProps={{ maxLength: 100 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Celular"
            value={formatPhone(editClient.phone || '')}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/\D/g, '').slice(0, 11); 
              setEditClient({ ...editClient, phone: numericValue });
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Número"
            value={editClient.number}
            onChange={(e) => setEditClient({ ...editClient, number: e.target.value })}
            inputProps={{ maxLength: 10 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="CEP"
            value={editClient.cep}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '').slice(0, 8);
              const formattedValue = numericValue.replace(/(\d{5})(\d{3})/, '$1-$2');
              setEditClient({ ...editClient, cep: formattedValue });
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Rua"
            value={editClient.street}
            onChange={(e) => setEditClient({ ...editClient, street: e.target.value })}
            inputProps={{ maxLength: 200 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Bairro"
            value={editClient.district}
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setEditClient({ ...editClient, district: e.target.value })
              }
            }}
            inputProps={{ maxLength: 80 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Cidade"
            value={editClient.city}
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setEditClient({ ...editClient, city: e.target.value })
              }
            }}
            inputProps={{ maxLength: 80 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="UF"
            value={editClient.uf}
            onChange={(e) => {
              const value = e.target.value
              if (isValidText(value) || value === "") {
                setEditClient({ ...editClient, uf: e.target.value })
              }
            }}
            inputProps={{ maxLength: 2 }}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSaveEdit}
            disabled={
              !editClient.email ||
              !isValidEmail(editClient.email) ||
              !editClient.phone || 
              editClient.phone.length !== 11 ||
              !editClient.number ||
              !editClient.cep ||
              !editClient.street ||
              !editClient.district ||
              !editClient.city ||
              !editClient.uf
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
              <TextField
                fullWidth
                label="CPF"
                value={clientDetails.cpf}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Data de nascimento"
                value={clientDetails.birthdate}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Número"
                value={clientDetails.number}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="CEP"
                value={clientDetails.cep}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Rua"
                value={clientDetails.street}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Bairro"
                value={clientDetails.district}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Cidade"
                value={clientDetails.cidade}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="UF"
                value={clientDetails.uf}
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
