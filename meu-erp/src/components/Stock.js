// src/components/Stock.js
import React, { useState, useEffect } from 'react';

const Stock = () => {
  // Função utilitária para recuperar dados do localStorage
  const getStoredData = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  };

  // Função utilitária para salvar dados no localStorage
  const setStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Estado inicial carregado do localStorage
  const initialItems = getStoredData('stockItems', [
    { id: 1, name: 'Malte', quantity: 10 },
    { id: 2, name: 'Lúpulo', quantity: 5 },
    // Adicione mais itens conforme necessário
  ]);

  const [items, setItems] = useState(initialItems);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    // Salva os itens no localStorage sempre que houver uma mudança
    setStoredData('stockItems', items);
  }, [items]);

  const handleAddItem = () => {
    const newItem = { id: items.length + 1, name: 'Novo Item', quantity: 0 };
    setItems([...items, newItem]);
    setEditingItemId(newItem.id);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    setEditingItemId(null);
  };

  const handleEditItem = (itemId, fieldName, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, [fieldName]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div className="stock-container">
      <h2>Estoque de Matéria-Prima</h2>
      <button onClick={handleAddItem}>Adicionar Item</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleEditItem(item.id, 'name', e.target.value)
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingItemId === item.id ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleEditItem(item.id, 'quantity', e.target.value)
                    }
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {editingItemId === item.id ? (
                  <button onClick={() => setEditingItemId(null)}>Salvar</button>
                ) : (
                  <button onClick={() => setEditingItemId(item.id)}>
                    Editar
                  </button>
                )}
                <button onClick={() => handleRemoveItem(item.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
