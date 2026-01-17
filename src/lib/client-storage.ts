// Cliente-side storage usando localStorage
export interface Meal {
  id: number;
  dayOfWeek: number;
  mealType: string;
  ingredients: Array<{
    foodId: string;
    foodName: string;
    quantity: number;
    unit: string;
    category: string;
  }>;
}

export interface ShoppingItem {
  id: number;
  foodId: string;
  foodName: string;
  quantity: number;
  unit: string;
  category: string;
  hasAtHome: boolean;
}

const MEALS_KEY = 'dietplan_meals';
const SHOPPING_KEY = 'dietplan_shopping';

// Meals
export function getMeals(): Meal[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addMeal(dayOfWeek: number, mealType: string, ingredients: any[]): number {
  const meals = getMeals();
  const newId = meals.length > 0 ? Math.max(...meals.map(m => m.id)) + 1 : 1;
  const newMeal: Meal = {
    id: newId,
    dayOfWeek,
    mealType,
    ingredients,
  };
  meals.push(newMeal);
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
  return newId;
}

export function deleteMeal(id: number): void {
  const meals = getMeals();
  const filtered = meals.filter(m => m.id !== id);
  localStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
}

// Shopping List
export function getShoppingList(): ShoppingItem[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SHOPPING_KEY);
  return data ? JSON.parse(data) : [];
}

export function generateShoppingListFromMeals(): void {
  const meals = getMeals();
  const aggregated = new Map<string, ShoppingItem>();

  meals.forEach(meal => {
    meal.ingredients.forEach(ing => {
      const key = `${ing.foodId}-${ing.unit}`;
      if (aggregated.has(key)) {
        const existing = aggregated.get(key)!;
        existing.quantity += ing.quantity;
      } else {
        aggregated.set(key, {
          id: 0, // Will be set later
          foodId: ing.foodId,
          foodName: ing.foodName,
          quantity: ing.quantity,
          unit: ing.unit,
          category: ing.category,
          hasAtHome: false,
        });
      }
    });
  });

  const items = Array.from(aggregated.values()).map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  localStorage.setItem(SHOPPING_KEY, JSON.stringify(items));
}

export function updateShoppingItemHasAtHome(id: number, hasAtHome: boolean): void {
  const items = getShoppingList();
  const updated = items.map(item => 
    item.id === id ? { ...item, hasAtHome } : item
  );
  localStorage.setItem(SHOPPING_KEY, JSON.stringify(updated));
}

export function clearShoppingList(): void {
  localStorage.setItem(SHOPPING_KEY, JSON.stringify([]));
}

export function deleteShoppingItem(id: number): void {
  const items = getShoppingList();
  const filtered = items.filter(item => item.id !== id);
  localStorage.setItem(SHOPPING_KEY, JSON.stringify(filtered));
}
