import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface MealSuggestion {
  name: string;
  description: string;
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  recipe: string;
  servings: number;
}

export async function generateMealSuggestions(
  availableIngredients: Array<{ name: string; quantity: number; unit: string }>,
  preferences?: string
): Promise<MealSuggestion[]> {
  const ingredientsList = availableIngredients
    .map(item => `${item.name} (${item.quantity} ${item.unit})`)
    .join(', ');

  const prompt = `
Com base nos seguintes ingredientes disponíveis: ${ingredientsList}

${preferences ? `Preferências do usuário: ${preferences}` : ''}

Sugira 3 refeições balanceadas e nutritivas que podem ser preparadas. Para cada refeição, forneça:
1. Nome da refeição
2. Descrição breve
3. Lista de ingredientes com quantidades
4. Receita passo a passo
5. Número de porções

Retorne a resposta em formato JSON válido como um array de objetos com as seguintes chaves: name, description, ingredients (array com name, quantity, unit), recipe, servings.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um chef profissional e nutricionista que ajuda pessoas a planejar refeições saudáveis e balanceadas. Sempre responda em português brasileiro e forneça respostas em formato JSON válido.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(content);
    return parsed.meals || parsed.suggestions || [];
  } catch (error) {
    console.error('Error generating meal suggestions:', error);
    throw error;
  }
}

export async function optimizeMealPlan(
  currentMeals: Array<{ name: string; description: string; dayOfWeek: number; mealType: string }>,
  dietaryGoals?: string
): Promise<string> {
  const mealsList = currentMeals
    .map(meal => `${meal.name} (${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][meal.dayOfWeek]} - ${meal.mealType})`)
    .join('\n');

  const prompt = `
Analise o seguinte plano de refeições semanal:

${mealsList}

${dietaryGoals ? `Objetivos dietéticos: ${dietaryGoals}` : ''}

Forneça sugestões para otimizar este plano de refeições considerando:
1. Equilíbrio nutricional
2. Variedade de alimentos
3. Praticidade de preparo
4. Redução de desperdício
5. Custo-benefício

Seja específico e prático nas sugestões.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um nutricionista experiente que ajuda pessoas a otimizar seus planos de refeições. Sempre responda em português brasileiro.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content || 'Não foi possível gerar sugestões.';
  } catch (error) {
    console.error('Error optimizing meal plan:', error);
    throw error;
  }
}

export async function suggestShoppingOptimizations(
  shoppingList: Array<{ item_name: string; quantity: number; unit: string }>,
  budget?: number
): Promise<string> {
  const itemsList = shoppingList
    .map(item => `${item.item_name} (${item.quantity} ${item.unit})`)
    .join('\n');

  const prompt = `
Analise a seguinte lista de compras:

${itemsList}

${budget ? `Orçamento disponível: R$ ${budget}` : ''}

Forneça sugestões para otimizar esta lista de compras considerando:
1. Substituições mais econômicas
2. Compras em atacado quando vantajoso
3. Produtos sazonais
4. Marcas com melhor custo-benefício
5. Dicas para evitar desperdício

Seja específico e prático nas sugestões.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em compras e economia doméstica que ajuda pessoas a otimizar suas listas de compras. Sempre responda em português brasileiro.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content || 'Não foi possível gerar sugestões.';
  } catch (error) {
    console.error('Error suggesting shopping optimizations:', error);
    throw error;
  }
}
