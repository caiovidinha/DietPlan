'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ShoppingItem {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
  category?: string;
  checked: number;
}

export default function ShoppingPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    item_name: '',
    quantity: 0,
    unit: 'unidade',
    category: '',
  });

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const res = await fetch('/api/shopping');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error loading shopping list:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/shopping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      setNewItem({ item_name: '', quantity: 0, unit: 'unidade', category: '' });
      setShowForm(false);
      loadItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  async function handleToggleCheck(id: number, currentChecked: number) {
    try {
      await fetch('/api/shopping', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, checked: !currentChecked }),
      });
      loadItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  async function handleDeleteItem(id: number) {
    if (confirm('Deseja remover este item?')) {
      try {
        await fetch(`/api/shopping?id=${id}`, { method: 'DELETE' });
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  }

  async function handleGenerateList() {
    if (confirm('Isso irá gerar uma nova lista baseada nas refeições planejadas. Continuar?')) {
      try {
        await fetch('/api/shopping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generate' }),
        });
        loadItems();
      } catch (error) {
        console.error('Error generating list:', error);
      }
    }
  }

  async function handleClearList() {
    if (confirm('Deseja limpar toda a lista?')) {
      try {
        await fetch('/api/shopping', { method: 'DELETE' });
        loadItems();
      } catch (error) {
        console.error('Error clearing list:', error);
      }
    }
  }

  const uncheckedItems = items.filter(item => !item.checked);
  const checkedItems = items.filter(item => item.checked);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              ← Voltar
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              🛒 Lista de Compras
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleGenerateList}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              🤖 Gerar da Semana
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              {showForm ? 'Cancelar' : '+ Adicionar'}
            </button>
            {items.length > 0 && (
              <button
                onClick={handleClearList}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Novo Item</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome do item"
                  value={newItem.item_name}
                  onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Categoria (opcional)"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Quantidade"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <select
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="unidade">unidade</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>
                  <option value="pacote">pacote</option>
                  <option value="caixa">caixa</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Adicionar à Lista
              </button>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Lista de compras vazia
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Adicione itens manualmente ou gere automaticamente a partir das refeições planejadas
              </p>
            </div>
          ) : (
            <>
              {uncheckedItems.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    A Comprar ({uncheckedItems.length})
                  </h2>
                  <div className="space-y-2">
                    {uncheckedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleToggleCheck(item.id, item.checked)}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-white">
                              {item.item_name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.quantity} {item.unit}
                              {item.category && ` • ${item.category}`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {checkedItems.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Comprados ({checkedItems.length})
                  </h2>
                  <div className="space-y-2">
                    {checkedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-60"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => handleToggleCheck(item.id, item.checked)}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-white line-through">
                              {item.item_name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.quantity} {item.unit}
                              {item.category && ` • ${item.category}`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
