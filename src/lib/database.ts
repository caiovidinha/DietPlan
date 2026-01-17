import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'dietplan.db');
const db = new Database(dbPath);

// Inicializa as tabelas
export function initDatabase() {
  // Tabela de refeições com ingredientes (simplificada)
  db.exec(`
    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_of_week INTEGER NOT NULL,
      meal_type TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de lista de compras
  db.exec(`
    CREATE TABLE IF NOT EXISTS shopping_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_id TEXT NOT NULL,
      food_name TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL,
      category TEXT NOT NULL,
      has_at_home INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database initialized successfully');
}

// Funções de refeições
export function getMeals() {
  const meals = db.prepare('SELECT * FROM meals ORDER BY day_of_week, meal_type').all();
  return meals.map((meal: any) => ({
    ...meal,
    ingredients: JSON.parse(meal.ingredients),
  }));
}

export function addMeal(dayOfWeek: number, mealType: string, ingredients: any[]) {
  const stmt = db.prepare(`
    INSERT INTO meals (day_of_week, meal_type, ingredients)
    VALUES (?, ?, ?)
  `);
  return stmt.run(dayOfWeek, mealType, JSON.stringify(ingredients));
}

export function deleteMeal(id: number) {
  const stmt = db.prepare('DELETE FROM meals WHERE id = ?');
  return stmt.run(id);
}

export function updateMeal(id: number, ingredients: any[]) {
  const stmt = db.prepare('UPDATE meals SET ingredients = ? WHERE id = ?');
  return stmt.run(JSON.stringify(ingredients), id);
}

// Funções de lista de compras
export function getShoppingList() {
  return db.prepare('SELECT * FROM shopping_list ORDER BY category, food_name').all();
}

export function addShoppingItem(foodId: string, foodName: string, quantity: number, unit: string, category: string) {
  // Verifica se já existe
  const existing = db.prepare('SELECT * FROM shopping_list WHERE food_id = ?').get(foodId) as any;
  
  if (existing) {
    // Atualiza a quantidade
    const stmt = db.prepare('UPDATE shopping_list SET quantity = quantity + ? WHERE food_id = ?');
    return stmt.run(quantity, foodId);
  } else {
    // Insere novo
    const stmt = db.prepare(`
      INSERT INTO shopping_list (food_id, food_name, quantity, unit, category)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(foodId, foodName, quantity, unit, category);
  }
}

export function updateShoppingItemHasAtHome(id: number, hasAtHome: boolean) {
  const stmt = db.prepare('UPDATE shopping_list SET has_at_home = ? WHERE id = ?');
  return stmt.run(hasAtHome ? 1 : 0, id);
}

export function deleteShoppingItem(id: number) {
  const stmt = db.prepare('DELETE FROM shopping_list WHERE id = ?');
  return stmt.run(id);
}

export function clearShoppingList() {
  const stmt = db.prepare('DELETE FROM shopping_list');
  return stmt.run();
}

export function generateShoppingListFromMeals() {
  // Limpa a lista atual
  clearShoppingList();

  // Pega todas as refeições
  const meals = getMeals();
  
  // Agrupa todos os ingredientes
  const ingredientsMap = new Map<string, { foodId: string; foodName: string; quantity: number; unit: string; category: string }>();
  
  for (const meal of meals) {
    for (const ingredient of meal.ingredients) {
      const key = ingredient.foodId;
      if (ingredientsMap.has(key)) {
        const existing = ingredientsMap.get(key)!;
        existing.quantity += ingredient.quantity;
      } else {
        ingredientsMap.set(key, { ...ingredient });
      }
    }
  }
  
  // Adiciona todos na lista de compras
  for (const ingredient of ingredientsMap.values()) {
    addShoppingItem(
      ingredient.foodId,
      ingredient.foodName,
      ingredient.quantity,
      ingredient.unit,
      ingredient.category
    );
  }
}

// Inicializa o banco ao importar
initDatabase();

export default db;
