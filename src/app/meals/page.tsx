'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Meal {
  id: number;
  name: string;
  description: string;
  day_of_week: number;
  meal_type: string;
  recipe: string;
  servings: number;
}

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MEAL_TYPES = ['Café da manhã', 'Almoço', 'Jantar', 'Lanche'];

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiPreferences, setAiPreferences] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    day_of_week: 0,
    meal_type: 'Almoço',
    recipe: '',
    servings: 2,
  });

  useEffect(() => {
    loadMeals();
  }, []);

  async function loadMeals() {
    try {
      const res = await fetch('/api/meals');
      const data = await res.json();
      setMeals(data);
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddMeal(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeal),
      });
      setNewMeal({ name: '', description: '', day_of_week: 0, meal_type: 'Almoço', recipe: '', servings: 2 });
      setShowForm(false);
      loadMeals();
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  }

  async function handleDeleteMeal(id: number) {
    if (confirm('Deseja remover esta refeição?')) {
      try {
        await fetch(`/api/meals?id=${id}`, { method: 'DELETE' });
        loadMeals();
      } catch (error) {
        console.error('Error deleting meal:', error);
      }
    }
  }

  async function handleAISuggestions() {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: aiPreferences }),
      });
      const data = await res.json();
      
      if (data.suggestions && data.suggestions.length > 0) {
        alert(`Recebemos ${data.suggestions.length} sugestões de refeições! (Em desenvolvimento: adicionar automaticamente)`);
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      alert('Erro ao obter sugestões. Verifique se a chave da API OpenAI está configurada.');
    } finally {
      setAiLoading(false);
    }
  }

  const mealsByDay = DAYS.map((day, dayIndex) => {
    const dayMeals = meals.filter(m => m.day_of_week === dayIndex);
    return { day, dayIndex, meals: dayMeals };
  });

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
              📅 Plano Semanal
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAI(!showAI)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              ✨ IA
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {showForm ? 'Cancelar' : '+ Adicionar Refeição'}
            </button>
          </div>
        </div>

        {showAI && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">✨ Sugestões com IA</h2>
            <div className="space-y-4">
              <textarea
                placeholder="Descreva suas preferências alimentares, restrições, objetivos... (opcional)"
                value={aiPreferences}
                onChange={(e) => setAiPreferences(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
              />
              <button
                onClick={handleAISuggestions}
                disabled={aiLoading}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
              >
                {aiLoading ? 'Gerando sugestões...' : 'Gerar Sugestões de Refeições'}
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Nova Refeição</h2>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <input
                type="text"
                placeholder="Nome da refeição"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <textarea
                placeholder="Descrição"
                value={newMeal.description}
                onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={2}
              />
              <div className="grid md:grid-cols-3 gap-4">
                <select
                  value={newMeal.day_of_week}
                  onChange={(e) => setNewMeal({ ...newMeal, day_of_week: parseInt(e.target.value) })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {DAYS.map((day, idx) => (
                    <option key={idx} value={idx}>{day}</option>
                  ))}
                </select>
                <select
                  value={newMeal.meal_type}
                  onChange={(e) => setNewMeal({ ...newMeal, meal_type: e.target.value })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {MEAL_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Porções"
                  value={newMeal.servings}
                  onChange={(e) => setNewMeal({ ...newMeal, servings: parseInt(e.target.value) })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="1"
                />
              </div>
              <textarea
                placeholder="Receita (opcional)"
                value={newMeal.recipe}
                onChange={(e) => setNewMeal({ ...newMeal, recipe: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Adicionar Refeição
              </button>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {mealsByDay.map(({ day, dayIndex, meals: dayMeals }) => (
            <div key={dayIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{day}</h2>
              {dayMeals.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Nenhuma refeição planejada</p>
              ) : (
                <div className="space-y-4">
                  {dayMeals.map((meal) => (
                    <div key={meal.id} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                              {meal.meal_type}
                            </span>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                              {meal.name}
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            {meal.description}
                          </p>
                          {meal.recipe && (
                            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                              {meal.recipe.substring(0, 100)}...
                            </p>
                          )}
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            {meal.servings} {meal.servings === 1 ? 'porção' : 'porções'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteMeal(meal.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          ×
                        </button>
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
  );
}
