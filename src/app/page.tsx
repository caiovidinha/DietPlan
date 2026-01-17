'use client';

import { useState, useEffect } from 'react';
import { FOOD_DATABASE, CATEGORIES, MEAL_TYPES, DAYS_OF_WEEK, FoodItem } from '@/lib/food-database';
import Modal from '@/components/Modal';

interface Meal {
  id: number;
  day_of_week: number;
  meal_type: string;
  ingredients: Array<{
    foodId: string;
    foodName: string;
    quantity: number;
    unit: string;
    category: string;
  }>;
}

interface ShoppingItem {
  id: number;
  food_id: string;
  food_name: string;
  quantity: number;
  unit: string;
  category: string;
  has_at_home: number;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'confirm';
  onConfirm?: () => void;
}

export default function Home() {
  const [activeModule, setActiveModule] = useState<'meals' | 'shopping'>('meals');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMealType, setSelectedMealType] = useState(MEAL_TYPES[0]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{
    foodId: string;
    foodName: string;
    quantity: number;
    unit: string;
    category: string;
  }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });

  useEffect(() => {
    loadMeals();
    loadShoppingList();
    
    // Suporte a URL parameters para atalhos PWA
    const params = new URLSearchParams(window.location.search);
    const module = params.get('module');
    if (module === 'shopping') {
      setActiveModule('shopping');
    }
  }, []);

  async function loadMeals() {
    try {
      const res = await fetch('/api/meals');
      const data = await res.json();
      setMeals(data);
    } catch (error) {
      console.error('Error loading meals:', error);
    }
  }

  async function loadShoppingList() {
    try {
      const res = await fetch('/api/shopping');
      const data = await res.json();
      setShoppingList(data);
    } catch (error) {
      console.error('Error loading shopping list:', error);
    }
  }

  function addIngredient(food: FoodItem) {
    const existing = selectedIngredients.find(i => i.foodId === food.id);
    if (existing) {
      setSelectedIngredients(
        selectedIngredients.map(i =>
          i.foodId === food.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedIngredients([
        ...selectedIngredients,
        {
          foodId: food.id,
          foodName: food.name,
          quantity: 1,
          unit: food.defaultUnit,
          category: food.category,
        },
      ]);
    }
  }

  function removeIngredient(foodId: string) {
    setSelectedIngredients(selectedIngredients.filter(i => i.foodId !== foodId));
  }

  function updateIngredientQuantity(foodId: string, quantity: number) {
    if (quantity <= 0) {
      removeIngredient(foodId);
    } else {
      setSelectedIngredients(
        selectedIngredients.map(i =>
          i.foodId === foodId ? { ...i, quantity } : i
        )
      );
    }
  }

  function handleQuantityInput(foodId: string, value: string) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateIngredientQuantity(foodId, numValue);
    } else if (value === '') {
      // Permite campo vazio temporariamente
      setSelectedIngredients(
        selectedIngredients.map(i =>
          i.foodId === foodId ? { ...i, quantity: 0 } : i
        )
      );
    }
  }

  async function saveMeal() {
    if (selectedIngredients.length === 0) {
      setModal({
        isOpen: true,
        title: 'Atenção',
        message: 'Selecione pelo menos um ingrediente para a refeição.',
        type: 'error',
      });
      return;
    }

    try {
      await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayOfWeek: selectedDay,
          mealType: selectedMealType,
          ingredients: selectedIngredients,
        }),
      });
      setSelectedIngredients([]);
      loadMeals();
      setModal({
        isOpen: true,
        title: 'Sucesso!',
        message: 'Refeição salva com sucesso.',
        type: 'success',
      });
    } catch (error) {
      console.error('Error saving meal:', error);
      setModal({
        isOpen: true,
        title: 'Erro',
        message: 'Não foi possível salvar a refeição. Tente novamente.',
        type: 'error',
      });
    }
  }

  async function deleteMeal(id: number) {
    setModal({
      isOpen: true,
      title: 'Confirmar',
      message: 'Deseja realmente remover esta refeição?',
      type: 'confirm',
      onConfirm: async () => {
        try {
          await fetch(`/api/meals?id=${id}`, { method: 'DELETE' });
          loadMeals();
        } catch (error) {
          console.error('Error deleting meal:', error);
        }
      },
    });
  }

  async function generateShoppingList() {
    setModal({
      isOpen: true,
      title: 'Confirmar',
      message: 'Gerar lista de compras a partir das refeições planejadas?',
      type: 'confirm',
      onConfirm: async () => {
        try {
          await fetch('/api/shopping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'generate' }),
          });
          loadShoppingList();
          setActiveModule('shopping');
          setModal({
            isOpen: true,
            title: 'Pronto!',
            message: 'Lista de compras gerada com sucesso.',
            type: 'success',
          });
        } catch (error) {
          console.error('Error generating shopping list:', error);
          setModal({
            isOpen: true,
            title: 'Erro',
            message: 'Não foi possível gerar a lista. Tente novamente.',
            type: 'error',
          });
        }
      },
    });
  }

  async function toggleHasAtHome(id: number, currentValue: number) {
    try {
      await fetch('/api/shopping', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, hasAtHome: !currentValue }),
      });
      loadShoppingList();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  async function clearShoppingList() {
    setModal({
      isOpen: true,
      title: 'Confirmar',
      message: 'Deseja limpar toda a lista de compras?',
      type: 'confirm',
      onConfirm: async () => {
        try {
          await fetch('/api/shopping', { method: 'DELETE' });
          loadShoppingList();
          setModal({
            isOpen: true,
            title: 'Pronto!',
            message: 'Lista de compras limpa com sucesso.',
            type: 'success',
          });
        } catch (error) {
          console.error('Error clearing shopping list:', error);
          setModal({
            isOpen: true,
            title: 'Erro',
            message: 'Não foi possível limpar a lista.',
            type: 'error',
          });
        }
      },
    });
  }

  function exportShoppingList() {
    if (shoppingList.length === 0) {
      setModal({
        isOpen: true,
        title: 'Atenção',
        message: 'A lista de compras está vazia.',
        type: 'error',
      });
      return;
    }

    const itemsToBy = shoppingList.filter(item => !item.has_at_home);
    
    if (itemsToBy.length === 0) {
      setModal({
        isOpen: true,
        title: 'Atenção',
        message: 'Todos os itens já estão marcados como "tenho em casa".',
        type: 'error',
      });
      return;
    }

    let text = '🛒 *Lista de Compras - DietPlan*\n\n';
    
    // Agrupa por categoria
    const byCategory: { [key: string]: ShoppingItem[] } = {};
    itemsToBy.forEach(item => {
      if (!byCategory[item.category]) {
        byCategory[item.category] = [];
      }
      byCategory[item.category].push(item);
    });

    // Formata a lista
    Object.keys(byCategory).sort().forEach(category => {
      text += `*${category}*\n`;
      byCategory[category].forEach(item => {
        text += `• ${item.food_name} - ${item.quantity} ${item.unit}\n`;
      });
      text += '\n';
    });

    text += `_Total: ${itemsToBy.length} ${itemsToBy.length === 1 ? 'item' : 'itens'}_`;

    // Copia para clipboard
    navigator.clipboard.writeText(text).then(() => {
      setModal({
        isOpen: true,
        title: 'Copiado!',
        message: 'Lista copiada para área de transferência. Cole no WhatsApp!',
        type: 'success',
      });
    }).catch(() => {
      // Fallback: abre em nova janela para copiar manualmente
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lista-compras.txt';
      a.click();
      URL.revokeObjectURL(url);
      
      setModal({
        isOpen: true,
        title: 'Download!',
        message: 'Lista baixada como arquivo de texto.',
        type: 'success',
      });
    });
  }

  const filteredFoods = FOOD_DATABASE.filter(
    food =>
      food.category === selectedCategory &&
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mealsByDay = DAYS_OF_WEEK.map((day, dayIndex) => {
    const dayMeals = meals.filter(m => m.day_of_week === dayIndex);
    return { day, dayIndex, meals: dayMeals };
  });

  const itemsToBy = shoppingList.filter(item => !item.has_at_home);
  const itemsAtHome = shoppingList.filter(item => item.has_at_home);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            🍽️ DietPlan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Planeje suas refeições e organize suas compras
          </p>
        </header>

        {/* Navegação dos módulos */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setActiveModule('meals')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeModule === 'meals'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            📅 Planejar Refeições
          </button>
          <button
            onClick={() => setActiveModule('shopping')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeModule === 'shopping'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            🛒 Lista de Compras ({itemsToBy.length})
          </button>
        </div>

        {/* Módulo de Refeições */}
        {activeModule === 'meals' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Painel de Seleção */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Adicionar Refeição
              </h2>

              {/* Seletores */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Dia da Semana
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {DAYS_OF_WEEK.map((day, idx) => (
                      <option key={idx} value={idx}>{day}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Tipo de Refeição
                  </label>
                  <select
                    value={selectedMealType}
                    onChange={(e) => setSelectedMealType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {MEAL_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ingredientes Selecionados */}
              {selectedIngredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">
                    Ingredientes Selecionados
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedIngredients.map((ing) => (
                      <div
                        key={ing.foodId}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded"
                      >
                        <span className="text-sm text-gray-800 dark:text-white flex-1">
                          {ing.foodName}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateIngredientQuantity(ing.foodId, ing.quantity - 1)}
                            className="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center font-bold"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={ing.quantity || ''}
                            onChange={(e) => handleQuantityInput(ing.foodId, e.target.value)}
                            onBlur={(e) => {
                              if (!e.target.value || parseFloat(e.target.value) <= 0) {
                                updateIngredientQuantity(ing.foodId, 1);
                              }
                            }}
                            className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium"
                          />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                            {ing.unit}
                          </span>
                          <button
                            onClick={() => updateIngredientQuantity(ing.foodId, ing.quantity + 1)}
                            className="w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={saveMeal}
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Salvar Refeição
                  </button>
                </div>
              )}

              {/* Seleção de Categoria */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Categoria
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        selectedCategory === cat
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Busca */}
              <input
                type="text"
                placeholder="Buscar alimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              {/* Lista de Alimentos */}
              <div className="max-h-96 overflow-y-auto space-y-1">
                {filteredFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => addIngredient(food)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-800 dark:text-white text-sm"
                  >
                    {food.name} <span className="text-gray-500 text-xs">({food.defaultUnit})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Painel de Visualização */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Planejamento Semanal
                </h2>
                {meals.length > 0 && (
                  <button
                    onClick={generateShoppingList}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    Gerar Lista de Compras
                  </button>
                )}
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {mealsByDay.map(({ day, dayIndex, meals: dayMeals }) => (
                  <div key={dayIndex} className="border-b pb-4 dark:border-gray-700">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{day}</h3>
                    {dayMeals.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma refeição planejada</p>
                    ) : (
                      <div className="space-y-2">
                        {dayMeals.map((meal) => (
                          <div
                            key={meal.id}
                            className="bg-gray-50 dark:bg-gray-700 p-3 rounded"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-sm text-green-600 dark:text-green-400">
                                {meal.meal_type}
                              </span>
                              <button
                                onClick={() => deleteMeal(meal.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              {meal.ingredients.map((ing: any) => (
                                <div key={ing.foodId}>
                                  • {ing.foodName} ({ing.quantity} {ing.unit})
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Módulo de Lista de Compras */}
        {activeModule === 'shopping' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Lista de Compras
                </h2>
                {shoppingList.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={exportShoppingList}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                    >
                      📋 Exportar
                    </button>
                    <button
                      onClick={clearShoppingList}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      🗑️ Limpar
                    </button>
                  </div>
                )}
              </div>

              {shoppingList.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Lista vazia
                  </p>
                  <button
                    onClick={() => setActiveModule('meals')}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Planejar Refeições
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Itens para comprar */}
                  {itemsToBy.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
                        📋 Para Comprar ({itemsToBy.length})
                      </h3>
                      <div className="space-y-2">
                        {itemsToBy.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleHasAtHome(item.id, item.has_at_home)}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <input
                                type="checkbox"
                                checked={false}
                                onChange={() => {}}
                                className="w-5 h-5 cursor-pointer pointer-events-none"
                              />
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {item.food_name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.quantity} {item.unit} • {item.category}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Itens que já tem */}
                  {itemsAtHome.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
                        ✅ Já Tenho em Casa ({itemsAtHome.length})
                      </h3>
                      <div className="space-y-2 opacity-60">
                        {itemsAtHome.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleHasAtHome(item.id, item.has_at_home)}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <input
                                type="checkbox"
                                checked={true}
                                onChange={() => {}}
                                className="w-5 h-5 cursor-pointer pointer-events-none"
                              />
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white line-through">
                                  {item.food_name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.quantity} {item.unit} • {item.category}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
}
