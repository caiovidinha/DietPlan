# 🍽️ DietPlan - Planejador de Refeições PWA

Um Progressive Web App (PWA) simples e prático para planejamento de refeições semanais e geração automática de listas de compras.

## 🎯 Funcionalidades

### ✅ Fluxo Simplificado
1. **📅 Planejar Refeições**: Selecione ingredientes de uma lista completa para cada refeição da semana
2. **🛒 Gerar Lista**: Clique em um botão e todos os ingredientes vão para a lista de compras
3. **✓ Marcar**: Marque os itens que você já tem em casa
4. **📱 Use**: Simples e direto, sem complicações!

### 🥗 Banco de Alimentos
- **Mais de 150 alimentos** organizados por categoria
- Proteínas (carnes, peixes, ovos, laticínios)
- Vegetais e legumes
- Carboidratos e grãos
- Frutas
- Pães
- Temperos e condimentos
- Bebidas

### 💡 Características
- **Interface em Módulos**: Alterna entre planejamento e lista de compras
- **Seleção Rápida**: Busca e filtros por categoria
- **Quantidades Ajustáveis**: Incremente ou decremente facilmente
- **PWA**: Funciona offline e pode ser instalado no celular
- **Design Responsivo**: Desktop e mobile
- **Modo Escuro**: Automático baseado no sistema

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (better-sqlite3)
- **PWA**: Manifest + Service Worker ready

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- npm

### Passos

1. **Navegue até o diretório**
```bash
cd DietPlan
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:3000
```

## 📱 Usando como PWA

### Desktop (Chrome/Edge)
1. Acesse o app no navegador
2. Clique no ícone de instalação na barra de endereços (⊕)
3. Clique em "Instalar"

### Mobile (Android/iOS)
1. Abra o app no navegador
2. Toque no menu (⋮ ou ⋯)
3. Selecione "Adicionar à tela inicial"

## 🎮 Como Usar

### 1️⃣ Planejar Refeições

1. Selecione o **dia da semana**
2. Selecione o **tipo de refeição** (café, almoço, jantar, etc)
3. Navegue pelas **categorias** ou use a **busca**
4. Clique nos alimentos para adicionar
5. Ajuste as **quantidades** com os botões + e -
6. Clique em **"Salvar Refeição"**
7. Repita para todas as refeições da semana

### 2️⃣ Gerar Lista de Compras

1. Após planejar suas refeições, clique em **"Gerar Lista de Compras"**
2. Todos os ingredientes são automaticamente agregados e organizados
3. Acesse a aba **"🛒 Lista de Compras"**

### 3️⃣ Marcar o que Tem

1. Na lista de compras, **marque os checkboxes** dos itens que você já tem em casa
2. Os itens marcados vão para a seção "✅ Já Tenho em Casa"
3. Foque apenas no que precisa comprar!

## 🗂️ Estrutura do Banco de Dados

### Tabela: `meals`
Armazena as refeições planejadas por dia e tipo, com os ingredientes em formato JSON.

### Tabela: `shopping_list`
Lista de compras gerada automaticamente das refeições, com flag para marcar o que já tem.

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Lint
npm run lint
```

## � Estrutura do Projeto

```
DietPlan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── meals/         # Endpoints de refeições
│   │   │   └── shopping/      # Endpoints de lista de compras
│   │   ├── layout.tsx         # Layout principal com PWA meta
│   │   ├── page.tsx           # Página única com módulos
│   │   └── globals.css        # Estilos globais
│   └── lib/
│       ├── database.ts        # Lógica do SQLite
│       └── food-database.ts   # Banco de alimentos (150+ itens)
├── public/
│   └── manifest.json          # PWA manifest
├── dietplan.db               # Banco de dados SQLite (auto-criado)
└── package.json
```

## 🎨 Personalização

### Adicionar Alimentos
Edite `src/lib/food-database.ts` e adicione novos itens ao array `FOOD_DATABASE`.

### Modificar Categorias
Ajuste o array `CATEGORIES` no mesmo arquivo.

### Mudar Cores
Edite `tailwind.config.ts` para personalizar o tema.

## 🐛 Troubleshooting

### Banco de dados corrompido
Feche o app e delete `dietplan.db`, será recriado automaticamente.

### Erro ao instalar dependências
```bash
npm cache clean --force
npm install
```

### Porta 3000 ocupada
```bash
npm run dev -- -p 3001
```

## 💡 Dicas de Uso

- **Planeje com antecedência**: Reserve 15 minutos no domingo para planejar a semana
- **Reutilize ingredientes**: Use ingredientes similares em várias refeições para economizar
- **Agrupe categorias**: Na lista de compras, os itens já vêm organizados por categoria
- **Use a busca**: Digite parte do nome para encontrar rapidamente

## 📄 Licença

Projeto de código aberto para uso pessoal.

---

**Versão Simplificada** - Sem IA, sem complicações, direto ao ponto! 🎯
