# DietPlan - PWA Simplificado

## ✅ Versão Atual: Simplificada e Prática

### Mudanças Implementadas (17/01/2026)
- ✅ Removida toda integração com IA
- ✅ Interface unificada em página única com módulos
- ✅ Banco de alimentos pré-definido com 150+ itens
- ✅ Fluxo simplificado: Planejar → Gerar Lista → Marcar o que tem
- ✅ Database otimizado (apenas 2 tabelas)

### Funcionalidades
1. **Planejamento de Refeições**
   - Selecione dia da semana e tipo de refeição
   - Escolha ingredientes por categoria
   - Busca rápida de alimentos
   - Ajuste de quantidades com +/-

2. **Lista de Compras**
   - Geração automática das refeições planejadas
   - Checkbox para marcar o que já tem
   - Organização por categoria

### Arquitetura
- **Frontend**: Página única (`/`) com 2 módulos (Refeições e Lista)
- **Backend**: 2 APIs (`/api/meals`, `/api/shopping`)
- **Database**: SQLite com 2 tabelas simples
- **Alimentos**: 150+ items em `/src/lib/food-database.ts`

### Status: ✅ Pronto para Uso
- Servidor: http://localhost:3000
- Banco: Auto-criado em `dietplan.db`
- PWA: Configurado e instalável
