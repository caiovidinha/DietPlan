// Lista completa de alimentos organizados por categoria
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  defaultUnit: string;
}

export const FOOD_DATABASE: FoodItem[] = [
  // PROTEÍNAS ANIMAIS
  { id: 'frango-peito', name: 'Peito de Frango', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'frango-coxa', name: 'Coxa de Frango', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'frango-asa', name: 'Asa de Frango', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'carne-bovina', name: 'Carne Bovina (Patinho)', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'carne-moida', name: 'Carne Moída', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'alcatra', name: 'Alcatra', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'picanha', name: 'Picanha', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'file-mignon', name: 'Filé Mignon', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'costela', name: 'Costela Bovina', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'peixe-tilapia', name: 'Tilápia', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'peixe-salmao', name: 'Salmão', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'peixe-bacalhau', name: 'Bacalhau', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'camarao', name: 'Camarão', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'carne-suina', name: 'Carne Suína (Lombo)', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'bacon', name: 'Bacon', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'linguica', name: 'Linguiça', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'salsicha', name: 'Salsicha', category: 'Proteínas', defaultUnit: 'pacote' },
  { id: 'presunto', name: 'Presunto', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'peito-peru', name: 'Peito de Peru', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'salame', name: 'Salame', category: 'Proteínas', defaultUnit: 'g' },
  { id: 'ovo', name: 'Ovos', category: 'Proteínas', defaultUnit: 'dúzia' },

  // LATICÍNIOS
  { id: 'leite', name: 'Leite', category: 'Laticínios', defaultUnit: 'L' },
  { id: 'iogurte-natural', name: 'Iogurte Natural', category: 'Laticínios', defaultUnit: 'unidade' },
  { id: 'iogurte-grego', name: 'Iogurte Grego', category: 'Laticínios', defaultUnit: 'unidade' },
  { id: 'queijo-mussarela', name: 'Queijo Mussarela', category: 'Laticínios', defaultUnit: 'g' },
  { id: 'queijo-prato', name: 'Queijo Prato', category: 'Laticínios', defaultUnit: 'g' },
  { id: 'queijo-parmesao', name: 'Queijo Parmesão', category: 'Laticínios', defaultUnit: 'g' },
  { id: 'queijo-minas', name: 'Queijo Minas', category: 'Laticínios', defaultUnit: 'g' },
  { id: 'requeijao', name: 'Requeijão', category: 'Laticínios', defaultUnit: 'unidade' },
  { id: 'manteiga', name: 'Manteiga', category: 'Laticínios', defaultUnit: 'g' },
  { id: 'creme-leite', name: 'Creme de Leite', category: 'Laticínios', defaultUnit: 'caixa' },
  { id: 'leite-condensado', name: 'Leite Condensado', category: 'Laticínios', defaultUnit: 'caixa' },

  // VEGETAIS E VERDURAS
  { id: 'alface', name: 'Alface', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'rucula', name: 'Rúcula', category: 'Vegetais', defaultUnit: 'maço' },
  { id: 'acelga', name: 'Acelga', category: 'Vegetais', defaultUnit: 'maço' },
  { id: 'espinafre', name: 'Espinafre', category: 'Vegetais', defaultUnit: 'maço' },
  { id: 'couve', name: 'Couve', category: 'Vegetais', defaultUnit: 'maço' },
  { id: 'brocolis', name: 'Brócolis', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'couve-flor', name: 'Couve-flor', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'repolho', name: 'Repolho', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'tomate', name: 'Tomate', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'cebola', name: 'Cebola', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'alho', name: 'Alho', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'pimentao-verde', name: 'Pimentão Verde', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'pimentao-vermelho', name: 'Pimentão Vermelho', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'pimentao-amarelo', name: 'Pimentão Amarelo', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'cenoura', name: 'Cenoura', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'beterraba', name: 'Beterraba', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'abobrinha', name: 'Abobrinha', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'berinjela', name: 'Berinjela', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'pepino', name: 'Pepino', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'chuchu', name: 'Chuchu', category: 'Vegetais', defaultUnit: 'unidade' },
  { id: 'vagem', name: 'Vagem', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'quiabo', name: 'Quiabo', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'jiló', name: 'Jiló', category: 'Vegetais', defaultUnit: 'g' },
  { id: 'abobora', name: 'Abóbora', category: 'Vegetais', defaultUnit: 'g' },

  // LEGUMES
  { id: 'batata', name: 'Batata', category: 'Legumes', defaultUnit: 'g' },
  { id: 'batata-doce', name: 'Batata Doce', category: 'Legumes', defaultUnit: 'g' },
  { id: 'mandioca', name: 'Mandioca', category: 'Legumes', defaultUnit: 'g' },
  { id: 'inhame', name: 'Inhame', category: 'Legumes', defaultUnit: 'g' },
  { id: 'mandioquinha', name: 'Mandioquinha', category: 'Legumes', defaultUnit: 'g' },

  // CARBOIDRATOS/GRÃOS
  { id: 'arroz-branco', name: 'Arroz Branco', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'arroz-integral', name: 'Arroz Integral', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'feijao-preto', name: 'Feijão Preto', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'feijao-carioca', name: 'Feijão Carioca', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'lentilha', name: 'Lentilha', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'grao-bico', name: 'Grão de Bico', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'ervilha', name: 'Ervilha', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'macarrao-espaguete', name: 'Macarrão Espaguete', category: 'Carboidratos', defaultUnit: 'pacote' },
  { id: 'macarrao-penne', name: 'Macarrão Penne', category: 'Carboidratos', defaultUnit: 'pacote' },
  { id: 'macarrao-parafuso', name: 'Macarrão Parafuso', category: 'Carboidratos', defaultUnit: 'pacote' },
  { id: 'farinha-trigo', name: 'Farinha de Trigo', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'farinha-milho', name: 'Farinha de Milho', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'fuba', name: 'Fubá', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'aveia', name: 'Aveia', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'granola', name: 'Granola', category: 'Carboidratos', defaultUnit: 'g' },
  { id: 'quinoa', name: 'Quinoa', category: 'Carboidratos', defaultUnit: 'g' },

  // PÃES E MASSAS
  { id: 'pao-frances', name: 'Pão Francês', category: 'Pães', defaultUnit: 'unidade' },
  { id: 'pao-forma', name: 'Pão de Forma', category: 'Pães', defaultUnit: 'pacote' },
  { id: 'pao-integral', name: 'Pão Integral', category: 'Pães', defaultUnit: 'pacote' },
  { id: 'pao-queijo', name: 'Pão de Queijo', category: 'Pães', defaultUnit: 'pacote' },
  { id: 'torrada', name: 'Torrada', category: 'Pães', defaultUnit: 'pacote' },
  { id: 'biscoito-agua-sal', name: 'Biscoito Água e Sal', category: 'Pães', defaultUnit: 'pacote' },

  // FRUTAS
  { id: 'banana', name: 'Banana', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'maca', name: 'Maçã', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'laranja', name: 'Laranja', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'limao', name: 'Limão', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'mamao', name: 'Mamão', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'melancia', name: 'Melancia', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'melao', name: 'Melão', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'abacaxi', name: 'Abacaxi', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'uva', name: 'Uva', category: 'Frutas', defaultUnit: 'g' },
  { id: 'morango', name: 'Morango', category: 'Frutas', defaultUnit: 'g' },
  { id: 'manga', name: 'Manga', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'pera', name: 'Pêra', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'pessego', name: 'Pêssego', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'kiwi', name: 'Kiwi', category: 'Frutas', defaultUnit: 'unidade' },
  { id: 'abacate', name: 'Abacate', category: 'Frutas', defaultUnit: 'unidade' },

  // TEMPEROS E CONDIMENTOS
  { id: 'sal', name: 'Sal', category: 'Temperos', defaultUnit: 'g' },
  { id: 'acucar', name: 'Açúcar', category: 'Temperos', defaultUnit: 'g' },
  { id: 'oleo-soja', name: 'Óleo de Soja', category: 'Temperos', defaultUnit: 'L' },
  { id: 'azeite', name: 'Azeite de Oliva', category: 'Temperos', defaultUnit: 'ml' },
  { id: 'vinagre', name: 'Vinagre', category: 'Temperos', defaultUnit: 'ml' },
  { id: 'molho-soja', name: 'Molho de Soja', category: 'Temperos', defaultUnit: 'ml' },
  { id: 'molho-tomate', name: 'Molho de Tomate', category: 'Temperos', defaultUnit: 'unidade' },
  { id: 'extrato-tomate', name: 'Extrato de Tomate', category: 'Temperos', defaultUnit: 'unidade' },
  { id: 'maionese', name: 'Maionese', category: 'Temperos', defaultUnit: 'unidade' },
  { id: 'mostarda', name: 'Mostarda', category: 'Temperos', defaultUnit: 'unidade' },
  { id: 'ketchup', name: 'Ketchup', category: 'Temperos', defaultUnit: 'unidade' },
  { id: 'pimenta-reino', name: 'Pimenta do Reino', category: 'Temperos', defaultUnit: 'g' },
  { id: 'cominho', name: 'Cominho', category: 'Temperos', defaultUnit: 'g' },
  { id: 'oregano', name: 'Orégano', category: 'Temperos', defaultUnit: 'g' },
  { id: 'colorau', name: 'Colorau', category: 'Temperos', defaultUnit: 'g' },
  { id: 'paprica', name: 'Páprica', category: 'Temperos', defaultUnit: 'g' },
  { id: 'curry', name: 'Curry', category: 'Temperos', defaultUnit: 'g' },
  { id: 'canela', name: 'Canela', category: 'Temperos', defaultUnit: 'g' },
  { id: 'noz-moscada', name: 'Noz Moscada', category: 'Temperos', defaultUnit: 'g' },

  // BEBIDAS
  { id: 'cafe', name: 'Café', category: 'Bebidas', defaultUnit: 'g' },
  { id: 'cha-preto', name: 'Chá Preto', category: 'Bebidas', defaultUnit: 'caixa' },
  { id: 'suco-laranja', name: 'Suco de Laranja', category: 'Bebidas', defaultUnit: 'L' },
  { id: 'suco-uva', name: 'Suco de Uva', category: 'Bebidas', defaultUnit: 'L' },
  { id: 'refrigerante', name: 'Refrigerante', category: 'Bebidas', defaultUnit: 'L' },
  { id: 'agua-mineral', name: 'Água Mineral', category: 'Bebidas', defaultUnit: 'L' },

  // OUTROS
  { id: 'chocolate-po', name: 'Chocolate em Pó', category: 'Outros', defaultUnit: 'g' },
  { id: 'geleia', name: 'Geleia', category: 'Outros', defaultUnit: 'unidade' },
  { id: 'mel', name: 'Mel', category: 'Outros', defaultUnit: 'g' },
  { id: 'amendoim', name: 'Amendoim', category: 'Outros', defaultUnit: 'g' },
  { id: 'castanha', name: 'Castanha', category: 'Outros', defaultUnit: 'g' },
  { id: 'nozes', name: 'Nozes', category: 'Outros', defaultUnit: 'g' },
];

export const CATEGORIES = [
  'Proteínas',
  'Laticínios',
  'Vegetais',
  'Legumes',
  'Carboidratos',
  'Pães',
  'Frutas',
  'Temperos',
  'Bebidas',
  'Outros',
];

export const MEAL_TYPES = [
  'Café da Manhã',
  'Lanche da Manhã',
  'Almoço',
  'Lanche da Tarde',
  'Jantar',
  'Ceia',
];

export const DAYS_OF_WEEK = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
];
