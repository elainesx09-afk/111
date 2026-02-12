# 🐛 DEBUG - Como Identificar o Problema da Tela Preta

## VERSÃO ATUALIZADA COM LOGGING COMPLETO

Esta versão do projeto inclui logging extensivo em todo o código para ajudar a identificar exatamente onde o problema está ocorrendo.

## Como Debugar

### 1. **Abrir o Console do Navegador**
- Pressione F12 ou Ctrl+Shift+I (Windows/Linux)
- Cmd+Option+I (Mac)
- Vá para a aba "Console"

### 2. **Verificar os Logs**

Você verá uma sequência de logs coloridos com emojis. A sequência normal deve ser:

```
🚀 main.tsx carregado
✅ Elemento #root encontrado
📦 Criando ReactDOM root...
🎨 Renderizando App...
📦 supabaseClient: Carregando...
🔑 supabaseClient: URL configurada? true/false
🔑 supabaseClient: Key configurada? true/false
✅ supabaseClient: Cliente criado com sucesso
📦 WorkspaceContext: Carregando...
📦 AuthContext: Carregando...
📦 App.tsx: Iniciando...
✅ App.tsx: Definido
✅ App renderizado com sucesso!
🎨 App: Renderizando...
🔐 AuthProvider: Iniciando...
🏢 WorkspaceProvider: Iniciando...
🔐 AuthProvider: useEffect iniciado
🔐 AuthProvider: Buscando sessão...
🔐 AuthProvider: Sessão obtida: false
🔒 GuardedLayout: Renderizando...
🚫 GuardedLayout: Sem usuário, redirecionando para /login
```

### 3. **Identificar Onde Para**

**Se parar em "main.tsx carregado":**
- Problema no carregamento de módulos JavaScript
- Verificar se o build está correto
- Verificar se há erro de sintaxe

**Se parar em "supabaseClient: Carregando...":**
- Problema ao importar @supabase/supabase-js
- Verificar se o npm install rodou corretamente

**Se mostrar "URL configurada? false" ou "Key configurada? false":**
- **ESTE É O PROBLEMA MAIS COMUM**
- Variáveis de ambiente não estão configuradas na Vercel
- Configure na Vercel Dashboard → Settings → Environment Variables:
  - `VITE_SUPABASE_URL` = sua URL do Supabase
  - `VITE_SUPABASE_ANON_KEY` = sua chave anônima do Supabase

**Se parar em "AuthProvider: Buscando sessão...":**
- Problema ao conectar com o Supabase
- Verificar se as credenciais estão corretas
- Verificar se o projeto Supabase está ativo

**Se parar em "GuardedLayout: Renderizando...":**
- Problema no layout ou nas rotas
- Verificar erros de TypeScript nos componentes

### 4. **Variáveis de Ambiente Necessárias**

**OBRIGATÓRIAS:**
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...sua-chave-aqui
```

**OPCIONAIS:**
```
VITE_API_BASE_URL=https://seu-dominio.vercel.app/api
VITE_WORKSPACE_ID=seu-workspace-id
```

### 5. **Verificar no Build da Vercel**

No painel da Vercel:
1. Vá em Deployments → clique no último deploy
2. Vá na aba "Build Logs"
3. Procure por erros de build ou warnings
4. Vá em Settings → Environment Variables
5. Certifique-se que todas as variáveis estão definidas

### 6. **Testar Localmente**

```bash
# Criar arquivo .env.local na raiz do projeto
cp .env.example .env.local

# Editar .env.local com suas credenciais
nano .env.local

# Instalar dependências
npm install

# Rodar em dev
npm run dev

# Ou fazer build e preview
npm run build
npm run preview
```

### 7. **Erros Comuns e Soluções**

**Tela preta sem logs no console:**
- JavaScript não está carregando
- Verificar se o build gerou arquivos em dist/
- Verificar vercel.json

**Logs param em "URL configurada? false":**
- Configure VITE_SUPABASE_URL na Vercel
- Faça redeploy após adicionar variáveis

**Erro "Failed to fetch":**
- Credenciais do Supabase incorretas
- Projeto Supabase pausado ou deletado
- Verificar se a URL está correta

**Redireciona infinitamente entre / e /login:**
- Problema na lógica de autenticação
- Verificar se o AuthContext está funcionando

**Componente não renderiza:**
- Erro de TypeScript ou import
- Verificar o console para stack trace

### 8. **Informações para Suporte**

Se precisar de ajuda, copie e cole:
1. Todos os logs do console (do início ao fim)
2. Logs de build da Vercel (aba Build Logs)
3. URL do deploy
4. Prints das variáveis de ambiente (sem mostrar os valores sensíveis)

### 9. **Próximos Passos Após Identificar**

**Se o problema for variáveis de ambiente:**
- Configure na Vercel
- Faça redeploy

**Se o problema for import ou código:**
- Identifique o arquivo e linha pelo stack trace
- Corrija o código
- Faça commit e push

**Se o problema for build:**
- Verifique package.json
- Rode npm install localmente
- Verifique se há conflitos de versão

---

## Mudanças Aplicadas Nesta Versão

1. ✅ Removido DebugScreen/Boot que causava delay
2. ✅ Adicionado propriedade `loading` no WorkspaceContext  
3. ✅ Adicionado logging extensivo em:
   - main.tsx
   - App.tsx
   - AuthContext.tsx
   - WorkspaceContext.tsx
   - supabaseClient.ts

**IMPORTANTE:** Após identificar e corrigir o problema, você pode remover os console.log() se quiser, mas eles não afetam a performance em produção (browsers modernos otimizam isso).

---

Boa sorte! 🚀
