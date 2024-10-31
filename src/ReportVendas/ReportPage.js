// src/Relatorio/ReportPage.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import jsPDF from 'jspdf';

const ReportPage = ({ items, contacts, clients }) => {
  
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    
    // Adicionando título do relatório
    doc.setFontSize(16);
    doc.text('Relatório de Estoque, Clientes e Contatos', margin, margin);
    
    // Adicionando espaçamento
    doc.setFontSize(12);
    doc.text('Estoque:', margin, margin + 15); // Espaço reduzido entre o título e os itens
    
    // Adicionando itens do estoque
    items.forEach((item, index) => {
      doc.text(`${item.name}: ${item.quantity}`, margin, margin + 25 + index * 8); // Espaço entre itens reduzido
    });

    // Adicionando espaçamento entre seções
    const itemsHeight = 25 + items.length * 8;
    doc.text('Clientes:', margin, margin + itemsHeight + 20); // Espaço reduzido entre seções
    
    // Adicionando clientes
    clients.forEach((client, index) => {
      doc.text(`${client.name} - ${client.email} - ${client.phone}`, margin, margin + itemsHeight + 30 + index * 8); // Espaço entre clientes reduzido
    });

    // Adicionando espaçamento entre seções
    const clientsHeight = 30 + clients.length * 8;
    doc.text('Contatos:', margin, margin + itemsHeight + clientsHeight + 20); // Espaço reduzido entre seções
    
    // Adicionando contatos
    contacts.forEach((contact, index) => {
      doc.text(`${contact.name} - ${contact.phone} - ${contact.email}`, margin, margin + itemsHeight + clientsHeight + 30 + index * 8); // Espaço entre contatos reduzido
    });

    // Salvando o PDF
    doc.save('relatorio.pdf');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Relatório de Estoque, Clientes e Contatos
      </Typography>
      <Button variant="contained" color="primary" onClick={generatePDF} sx={{ margin: '20px 0' }}>
        Baixar PDF
      </Button>
      <Typography variant="h6">Estoque:</Typography>
      {items.map((item) => (
        <Typography key={item.name}>
          {item.name}: {item.quantity}
        </Typography>
      ))}
      <Typography variant="h6">Clientes:</Typography>
      {clients.map((client) => (
        <Typography key={client.name}>
          {client.name} - {client.email} - {client.phone}
        </Typography>
      ))}
      <Typography variant="h6">Contatos:</Typography>
      {contacts.map((contact) => (
        <Typography key={contact.name}>
          {contact.name} - {contact.phone} - {contact.email}
        </Typography>
      ))}
    </Box>
  );
};

export default ReportPage;
