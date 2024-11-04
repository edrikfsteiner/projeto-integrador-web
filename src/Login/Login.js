import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      setError('');
      setOpenModal(true);  
      localStorage.setItem('loggedInUser', username); 
    } else {
      setError('Nome de usuário ou senha inválidos.');
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate('/dashboard');  
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Usuário:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.switch}>Ainda não tem conta? <span onClick={() => navigate('/register')} style={styles.link}>Registrar</span></p>

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h5" align="center">Bem-vindo(a), <strong>{username}</strong>!</Typography>
        </DialogTitle>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button 
            onClick={handleClose} 
            color="primary" 
            variant="contained"
            style={{ padding: '10px 20px' }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  switch: {
    marginTop: '15px',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
  },
};

export default Login;
