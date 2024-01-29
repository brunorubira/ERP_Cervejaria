// src/components/Menu.js
import React from 'react';
import { FaHome, FaBox, FaCog, FaMoneyBillAlt } from 'react-icons/fa';

const Menu = ({ setActiveTab }) => {
  return (
    <div className="sidebar">
      <button onClick={() => setActiveTab('overview')}>
        <FaHome /> Visão Geral
      </button>
      <button onClick={() => setActiveTab('stock')}>
        <FaBox /> Estoque
      </button>
      <button onClick={() => setActiveTab('production')}>
        <FaCog /> Produção
      </button>
      <button onClick={() => setActiveTab('finance')}>
        <FaMoneyBillAlt /> Financeiro
      </button>
    </div>
  );
};

export default Menu;
