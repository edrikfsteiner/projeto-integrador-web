import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';

function SalesSystem({ clients, items, setItems, sales, setSales }) {
  const [saleItems, setSaleItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [installments, setInstallments] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleAddToSale = (item) => {
    if (item && selectedQuantity <= item.quantity && selectedQuantity > 0) {
      const existingItem = saleItems.find((sItem) => sItem.name === item.name);
      const updatedSaleItems = existingItem
        ? saleItems.map((sItem) =>
            sItem.name === item.name
              ? { ...sItem, quantity: sItem.quantity + selectedQuantity }
              : sItem
          )
        : [...saleItems, { ...item, quantity: selectedQuantity }];

      setSaleItems(updatedSaleItems);
      const updatedTotalValue = updatedSaleItems.reduce(
        (sum, currentItem) =>
          sum + parseFloat(currentItem.value || 0) * currentItem.quantity,
        0
      );
      setTotalValue(updatedTotalValue);
    } else {
      alert("Quantidade inválida ou maior que a disponível no estoque.");
    }
  };

  const handleRemoveFromSale = (itemToRemove) => {
    const updatedSaleItems = saleItems.filter(item => item.name !== itemToRemove.name);
    setSaleItems(updatedSaleItems);

    const updatedTotalValue = updatedSaleItems.reduce(
      (sum, currentItem) => sum + parseFloat(currentItem.value || 0) * currentItem.quantity,
      0
    );
    setTotalValue(updatedTotalValue);
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity >= 1) {
      setSelectedQuantity(quantity);
    }
  };

  const handlePaymentChange = (event) => {
    const paymentAmount = parseFloat(event.target.value) || 0;
    setPayment(paymentAmount);
    setChange(paymentAmount - totalValue);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setClientSearchTerm("");
  };

  const handleSell = () => {
    if (!selectedClient) {
      alert("Selecione um cliente à venda");
      return;
    }

    const newSale = {
      client: selectedClient,
      items: saleItems,
      total: totalValue,
      paymentMethod: paymentMethod,
      installments: paymentMethod === 'credito' ? installments : 1,
      date: new Date().toISOString(),
    };

    const updatedItems = items.map((item) => {
      const saleItem = saleItems.find((sItem) => sItem.name === item.name);
      if (saleItem) {
        const newQuantity = item.quantity - saleItem.quantity;
        if (newQuantity < 0) {
          alert(`Quantidade insuficiente para o item: ${item.name}`);
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setItems(updatedItems);
    setSales([...sales, newSale]);
    setSaleItems([]);
    setTotalValue(0);
    setPayment(0);
    setChange(0);
    setSaleModalOpen(false);
    setSelectedClient(null);
  };

  const filteredItems = items.filter(item =>
    item.barcode.toString().includes(searchTerm) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClients = clients.filter(client =>
    client.cpf.toString().includes(clientSearchTerm) ||
    client.name.toLowerCase().includes(clientSearchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Vendas
      </Typography>

      <TextField
        label="Pesquisar Cliente"
        variant="outlined"
        fullWidth
        value={clientSearchTerm}
        onChange={(e) => setClientSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Pesquisar Produto"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {clientSearchTerm && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Clientes Cadastrados
          </Typography>
          <List>
            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <ListItem key={index} button onClick={() => handleClientSelect(client)}>
                  <ListItemText
                    primary={client.name}
                    secondary={
                      <>
                        Email: {client.email} <br />
                        Celular: {client.phone} <br />
                        CPF: {client.cpf} <br />
                        Data de nascimento: {client.birthdate} <br />
                        Número: {client.number} <br />
                        CEP: {client.cep} <br />
                        Rua: {client.street} <br />
                        Bairro: {client.district} <br />
                        Cidade: {client.city} <br />
                        UF: {client.uf}
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">Nenhum cliente encontrado.</Typography>
            )}
          </List>
        </Paper>
      )}
      {searchTerm && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Itens Disponíveis no Estoque
          </Typography>
          <List>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <ShoppingCartIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        Código de Barras: {item.barcode} <br />
                        Quantidade: {item.quantity} <br />
                        Valor: R${Number(item.value) ? Number(item.value).toFixed(2) : '0.00'} <br />
                        Categoria: {item.category} <br />
                        Laboratório: {item.lab} <br />
                        Farmácia Popular: {item.pharmacyPop ? 'Sim' : 'Não'} <br />
                        Requer Receita?: {item.prescription ? 'Sim' : 'Não'} <br />
                        {item.prescription === true && (
                          <Typography variant="body2" color="error">
                            <WarningIcon fontSize="small" /> EXIGIR RECEITA
                          </Typography>
                        )}
                      </>
                    }
                  />
                  <TextField
                    label="Quantidade"
                    type="number"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1, max: item.quantity }}
                    sx={{ width: '100px', ml: 2 }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => handleAddToSale(item)}
                    disabled={selectedQuantity <= 0 || selectedQuantity > item.quantity}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">
                Nenhum item encontrado.
              </Typography>
            )}
          </List>
        </Paper>
      )}
      {selectedClient && (
        <Typography variant="h6" sx={{ mb: 3 }}>
          Cliente Selecionado: {selectedClient.name}
        </Typography>
      )}
      {/* Carrinho de Venda */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Carrinho de Venda
        </Typography>
        <List>
          {saleItems.length > 0 ? (
            saleItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.name} (x${item.quantity})`}
                  secondary={`Preço: R$${(
                    parseFloat(item.value || 0) * item.quantity
                  ).toFixed(2)}`}
                />
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => handleRemoveFromSale(item)}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">
              Nenhum item no carrinho.
            </Typography>
          )}
        </List>
        <Typography variant="h6">Total: R${totalValue.toFixed(2)}</Typography>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setSaleModalOpen(true)}
        disabled={saleItems.length === 0}
      >
        Realizar Pagamento
      </Button>

      {/* Modal de Pagamento */}
      <Dialog open={saleModalOpen} onClose={() => setSaleModalOpen(false)}>
        <DialogTitle>Pagamento</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="dinheiro" control={<Radio />} label="Dinheiro" />
            <FormControlLabel value="credito" control={<Radio />} label="Cartão de Crédito" />
            <FormControlLabel value="debito" control={<Radio />} label="Cartão de Débito" />
            <FormControlLabel value="pix" control={<Radio />} label="Pix" />
          </RadioGroup>

          {paymentMethod === 'credito' && (
            <TextField
              label="Parcelas"
              type="number"
              fullWidth
              variant="outlined"
              value={installments}
              onChange={(e) => {
                const newInstallments = parseInt(e.target.value) || 1;
                const minPerInstallment = totalValue / newInstallments >= 50;
                if (minPerInstallment) {
                  setInstallments(newInstallments);
                }
              }}
              inputProps={{ min: 1 }}
              sx={{ mt: 2 }}
              helperText={
                totalValue / installments < 50
                  ? "Cada parcela deve ser no mínimo R$50."
                  : null
              }
            />
          )}

          <TextField
            label="Valor Pago"
            type="number"
            fullWidth
            variant="outlined"
            value={payment}
            onChange={handlePaymentChange}
            sx={{ mt: 2 }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Troco: R${change.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaleModalOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSell}
            color="primary"
            disabled={
              payment < totalValue ||
              (paymentMethod === 'credito' && totalValue / installments < 50)
            }
          >
            Vender
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SalesSystem;
