import React, { useEffect, useState } from 'react';
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
  Radio,
  MenuItem,
  Select
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function SalesSystem() {
  const [items, setItems] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [installments, setInstallments] = useState(1);
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [
      { name: 'Paracetamol', quantity: 10, value: 5.0 },
      { name: 'Ibuprofeno', quantity: 15, value: 8.0 },
      { name: 'Dipirona', quantity: 20, value: 4.0 },
    ];
    setItems(storedItems);

    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.username === loggedInUser);
    if (foundUser) {
      setUser(foundUser);
    }

    const storedSalesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];
    setSalesHistory(storedSalesHistory);
  }, []);

  const handleAddToSale = (item) => {
    if (item && item.quantity > 0) {
      const existingItem = saleItems.find((sItem) => sItem.name === item.name);
      const updatedSaleItems = existingItem
        ? saleItems.map((sItem) =>
            sItem.name === item.name
              ? { ...sItem, quantity: sItem.quantity + 1 }
              : sItem
          )
        : [...saleItems, { ...item, quantity: 1 }];

      setSaleItems(updatedSaleItems);

      if (Array.isArray(updatedSaleItems) && updatedSaleItems.length > 0) {
        const updatedTotalValue = updatedSaleItems.reduce(
          (sum, currentItem) =>
            sum + parseFloat(currentItem.value || 0) * currentItem.quantity,
          0
        );
        setTotalValue(updatedTotalValue);
      }
    }
  };

  const handlePaymentChange = (event) => {
    const paymentAmount = parseFloat(event.target.value) || 0;
    setPayment(paymentAmount);
    setChange(paymentAmount - totalValue);
  };

  const handleSell = () => {
    const updatedItems = items.map((item) => {
      const saleItem = saleItems.find((sItem) => sItem.name === item.name);
      if (saleItem) {
        return { ...item, quantity: item.quantity - saleItem.quantity };
      }
      return item;
    }).filter(item => item.quantity >= 0);

    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    const saleRecord = {
      user: user.username,
      items: saleItems,
      totalValue,
      paymentMethod,
      installments: paymentMethod === 'cartao' ? installments : 1,
      date: new Date().toLocaleString(),
    };

    const updatedSalesHistory = [...salesHistory, saleRecord];
    setSalesHistory(updatedSalesHistory);
    localStorage.setItem('salesHistory', JSON.stringify(updatedSalesHistory));

    setSaleItems([]);
    setTotalValue(0);
    setPayment(0);
    setChange(0);
    setSaleModalOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Vendas
      </Typography>

      {/* Lista de Itens Disponíveis */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Itens Disponíveis no Estoque
        </Typography>
        <List>
          {items.length > 0 ? (
            items.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => handleAddToSale(item)}
                    disabled={item.quantity <= 0}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ShoppingCartIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantidade: ${item.quantity}, Preço: R$${parseFloat(
                    item.value || 0
                  ).toFixed(2)}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">
              Nenhum item disponível no estoque.
            </Typography>
          )}
        </List>
      </Paper>

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
            <FormControlLabel value="cartao" control={<Radio />} label="Cartão" />
            <FormControlLabel value="pix" control={<Radio />} label="Pix" />
          </RadioGroup>

          {paymentMethod === 'cartao' && (
            <TextField
              label="Parcelas"
              type="number"
              fullWidth
              variant="outlined"
              value={installments}
              onChange={(e) => setInstallments(parseInt(e.target.value) || 1)}
              inputProps={{ min: 1 }}
              sx={{ mt: 2 }}
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
            disabled={payment < totalValue}
          >
            Vender
          </Button>
        </DialogActions>
      </Dialog>

      {/* Registro de Vendas */}
      <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Histórico de Vendas
        </Typography>
        <List>
          {salesHistory.map((sale, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Venda realizada em ${sale.date} por ${sale.user}`}
                secondary={`Total: R$${sale.totalValue.toFixed(2)} - Método de pagamento: ${sale.paymentMethod}${
                  sale.paymentMethod === 'cartao' ? ` em ${sale.installments}x` : ''
                }`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default SalesSystem;
