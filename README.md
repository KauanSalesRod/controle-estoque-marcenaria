# 📦 Gerenciamento de Estoque Fullstack (Supabase + JS)

Uma aplicação web completa para controle e gerenciamento de estoque com autenticação de usuários em tempo real, persistência em nuvem e isolamento de dados por usuário.

![Tecnologias](https://img.shields.io/badge/Stack-JavaScript%20%7C%20HTML5%20%7C%20CSS3%20%7C%20Supabase-blue)

---

## 🚀 Funcionalidades

- **🔐 Autenticação de Usuários:** Login, cadastro e logout gerenciados via Supabase Auth.
- **🛡️ Segurança de Dados (RLS):** Cada usuário autenticado visualiza e gerencia exclusivamente os seus próprios itens em estoque.
- **📝 Operações CRUD Completas:**
  - **Create:** Cadastro de novos produtos com validação dos campos.
  - **Read:** Listagem dinâmica atualizada em tempo real direto da nuvem.
  - **Update:** Edição de nome, quantidade e descrição de itens existentes.
  - **Delete:** Remoção instantânea de registros.
- **💬 Feedback Dinâmico:** Mensagens visuais de status para ações de sucesso, falhas e logout.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+ / Modules)
- **Backend as a Service (BaaS):** [Supabase](https://supabase.com/)
  - Supabase Auth (Gerenciamento de Usuários)
  - PostgreSQL Database
  - Row Level Security (RLS)

---

## ⚙️ Configuração do Banco de Dados (Supabase)

Para rodar este projeto ou replicar a estrutura no seu próprio Supabase:

1. Crie um projeto no [Supabase](https://supabase.com/).
2. Vá ao **SQL Editor** no painel do Supabase.
3. Copie e execute o script localizado no arquivo [`schema.sql`](./schema.sql) deste repositório para criar a tabela `estoque` e configurar as políticas de segurança (RLS).

---

## 🏃‍♂️ Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/KauanSalesRod/controle-estoque-marcenaria]
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd controle-estoque-marcenaria
   ```

3. **Abra o projeto:**
   - Como o projeto utiliza ES Modules (`import/export`), abra o arquivo `index.html` (ou `login.html`) através de um servidor local como a extensão **Live Server** do VS Code.

---

## ✒️ Autor

Desenvolvido por Kauan Sales Rodrigues 👋  
Sinta-se à vontade para entrar em contato no [LinkedIn](https://www.linkedin.com/in/kauan-sales-rodrigues/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BFVLyvh5tR6CiBc%2Bmr3%2FBag%3D%3D)!
