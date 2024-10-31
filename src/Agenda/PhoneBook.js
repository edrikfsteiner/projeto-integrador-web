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
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
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

function PhoneBook({ contacts, setContacts }) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [editContact, setEditContact] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenConfirmDelete = (index) => {
    setContactToDelete(index);
    setConfirmDelete(true);
  };
  const handleCloseConfirmDelete = () => setConfirmDelete(false);
  const handleOpenEditModal = (index) => {
    setContactToEdit(index);
    setEditContact(contacts[index]);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenDetailsModal = (contact) => {
    setContactDetails(contact);
    setDetailsModalOpen(true);
  };
  const handleCloseDetailsModal = () => setDetailsModalOpen(false);

  const handleAddContact = () => {
    if(newContact.name && newContact.phone && newContact.email){
      setContacts([...contacts, newContact]);
      setNewContact({
        name: '',
        phone: '',
        email: '',
      });
      handleClose();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleDeleteContact = () => {
    const updatedContacts = contacts.filter((_, i) => i !== contactToDelete);
    setContacts(updatedContacts);
    handleCloseConfirmDelete();
  };

  const handleSaveEdit = () => {
    const updatedContacts = [...contacts];
    updatedContacts[contactToEdit] = editContact;
    setContacts(updatedContacts);
    handleCloseEditModal();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agenda Telefônica
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Contatos
        </Typography>
        <List>
          {contacts.map((contact, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpenEditModal(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleOpenConfirmDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar
                  onClick={() => handleOpenDetailsModal(contact)}
                  style={{ cursor: 'pointer' }}
                >
                  <ContactPhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={
                  <>
                    Telefone: {contact.phone} <br />
                    E-mail: {contact.email}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Adicionar Contato
        </Button>
      </Box>

      {/* Modal para adicionar novo contato */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Adicionar Novo Contato
          </Typography>
          <TextField
            fullWidth
            label="Nome"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Telefone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="E-mail"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleAddContact}>
            Adicionar
          </Button>
        </Box>
      </Modal>

      {/* Modal para confirmar exclusão */}
      <Modal open={confirmDelete} onClose={handleCloseConfirmDelete}>
        <Box sx={confirmDeleteStyle}>
          <Typography variant="h6" gutterBottom>
            Tem certeza que deseja excluir o contato?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={handleCloseConfirmDelete}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteContact}>
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para editar contato */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Editar Contato
          </Typography>
          <TextField
            fullWidth
            label="Nome"
            value={editContact.name || ''}
            onChange={(e) => setEditContact({ ...editContact, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Telefone"
            value={editContact.phone || ''}
            onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="E-mail"
            value={editContact.email || ''}
            onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSaveEdit}>
            Salvar
          </Button>
        </Box>
      </Modal>

      {/* Modal para ver detalhes */}
      <Modal open={detailsModalOpen} onClose={handleCloseDetailsModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Detalhes do Contato
          </Typography>
          {contactDetails && (
            <>
              <TextField
                fullWidth
                label="Nome"
                value={contactDetails.name}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Telefone"
                value={contactDetails.phone}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="E-mail"
                value={contactDetails.email}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
            </>
          )}
          <Button variant="outlined" fullWidth onClick={handleCloseDetailsModal}>
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default function App() {
  const [contacts, setContacts] = useState([
    { name: 'João Pedro', phone: '(99) 99999-9999', email: 'joao@example.com' },
    { name: 'Maria Silva', phone: '(11) 88888-8888', email: 'maria@example.com' },
  ]);

  return (
    <div>
      <PhoneBook contacts={contacts} setContacts={setContacts} />
    </div>
  );
}
