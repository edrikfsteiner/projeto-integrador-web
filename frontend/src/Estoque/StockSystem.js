import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function StockSystem({ items, setItems, purchases, setPurchases }) {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const calculatedTotalValue = purchaseItems.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0
    );
    setTotalValue(calculatedTotalValue);
  }, [purchaseItems]);

  const handleAddToPurchase = () => {
    if (!selectedProduct || !/^\d+$/.test(quantity) || !/^\d+(\.\d{1,2})?$/.test(cost)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const existingItem = purchaseItems.find(
      (pItem) => pItem.name === selectedProduct.name
    );

    const updatedPurchaseItems = existingItem
      ? purchaseItems.map((pItem) =>
          pItem.name === selectedProduct.name
            ? {
                ...pItem,
                quantity: pItem.quantity + parseInt(quantity, 10),
                cost: (parseFloat(pItem.cost) + parseFloat(cost)) / 2
              }
            : pItem
        )
      : [
          ...purchaseItems,
          {
            name: selectedProduct.name,
            quantity: parseInt(quantity, 10),
            cost: parseFloat(cost),
          },
        ];

    setPurchaseItems(updatedPurchaseItems);
    setQuantity("");
    setCost("");
    setSelectedProduct(null);
  };

  const handleRemoveFromPurchase = (itemToRemove) => {
    setPurchaseItems(purchaseItems.filter((item) => item.name !== itemToRemove.name));
  };

  const handleConfirmPurchase = () => {
    const newPurchase = {
      items: purchaseItems,
      total: totalValue,
      date: new Date().toISOString(),
    };

    const updatedItems = items.map((item) => {
      const purchaseItem = purchaseItems.find((pItem) => pItem.name === item.name);
      if (purchaseItem) {
        return {
          ...item,
          quantity: item.quantity + purchaseItem.quantity,
        };
      }
      return item;
    });

    setItems(updatedItems);
    setPurchases([...purchases, newPurchase]);
    setPurchaseItems([]);
    setPurchaseModalOpen(false);
    setSelectedProduct(null);
    setQuantity("");
    setCost("");
  };

  const handleDecimalInput = (value) => {
    let formattedValue = value.replace(',', '.');
    const [integerPart, decimalPart] = formattedValue.split('.');
    
    if (decimalPart && decimalPart.length > 2) {
      formattedValue = `${integerPart}.${decimalPart.substring(0, 2)}`;
    }
    
    return formattedValue;
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toString().includes(searchTerm)
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sistema de Estoque
      </Typography>

      <TextField
        label="Pesquisar Produto"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {searchTerm && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Produtos Disponíveis
          </Typography>
          <List>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => setSelectedProduct(item)}
                selected={selectedProduct?.name === item.name}
              >
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
                    </>
                  }
                />
              </ListItem>
            ))) : (
              <Typography variant="body1">Nenhum produto encontrado.</Typography>
            )}
          </List>
        </Paper>
      )}

      {selectedProduct && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">
            Produto Selecionado: {selectedProduct.name}
          </Typography>
          <TextField
            label="Quantidade"
            type="text"
            fullWidth
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setQuantity(e.target.value);
              }
            }}
            inputProps={{ maxLength: 9 }}
            sx={{ mt: 2 }}
            required
          />
          <TextField
            label="Custo (R$)"
            type="text"
            fullWidth
            value={cost}
            onChange={(e) => {
              const value = handleDecimalInput(e.target.value);
              if (!value || !isNaN(parseFloat(value))) {
                setCost(e.target.value);
              }
            }}
            inputProps={{ maxLength: 11 }}
            sx={{ mt: 2 }}
            required
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddToPurchase}
            disabled={
              quantity <= 0 ||
              cost <= 0
            }
          >
            Adicionar à Compra
          </Button>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Carrinho de Compra
        </Typography>
        <List>
          {purchaseItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.name} (x${item.quantity})`}
                secondary={`Custo: R$${item.cost.toFixed(2)}`}
              />
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => handleRemoveFromPurchase(item)}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Total: R${totalValue.toFixed(2)}</Typography>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setPurchaseModalOpen(true)}
        disabled={purchaseItems.length === 0}
      >
        Finalizar Compra
      </Button>

      {/* Modal de Confirmação */}
      <Dialog open={purchaseModalOpen} onClose={() => setPurchaseModalOpen(false)}>
        <DialogTitle>Confirmar Compra</DialogTitle>
        <DialogContent>
          <Typography>
            Total da Compra: R${totalValue.toFixed(2)}
          </Typography>
          <Typography>
            Data da Compra: {new Date().toLocaleString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPurchaseModalOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmPurchase} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default StockSystem;