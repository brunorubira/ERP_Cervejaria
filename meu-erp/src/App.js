// src/App.js
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Menu from './components/Menu';
import Stock from './components/Stock';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Home />;
      case 'stock':
        return <Stock />;
      case 'production':
        return <div>Conteúdo da Produção</div>;
      case 'finance':
        return <div>Conteúdo Financeiro</div>;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Menu setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default App;
