# **📌 SISTEMA DE AGENDAMENTOS - API**  

Este projeto é um **Desafio Técnico** para o desenvolvimento de um **Sistema de Agendamentos**, onde usuários podem marcar horários para serviços específicos.  

### O objetivo é mostrar habilidades em:

✅ **NestJS** para construção da API (backend)  
✅ **React/Next.js** para a interface do usuário ([frontend](https://github.com/michelereginabora/sistema-de-agendamentos-frontend))  
✅ **Modelagem de banco de dados** com **PostgreSQL**  e TypeORM
✅ **Implementação de regras de negócio** para garantir um fluxo seguro e eficiente


O sistema visa ser robusto, escalável e seguir boas práticas de desenvolvimento. 🚀

## Links de Documentação

### Swagger API
- **URL**: `http://localhost:3030/docs#/`
- Documentação interativa da API
- Testes de endpoints
- Descrição dos schemas

### Documentação do Código
- **GitHub**: [Link para documentação completa](https://github.com/michelereginabora/sistema-de-agendamentos-backend/blob/main/DOC.md)
- Detalhamento técnico

-----------

### **🚀 Rodando o Projeto**  

## **🔧 Pré-requisitos**
Antes de começar, certifique-se de ter instalado:

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (ou `npm` / `yarn`)
- [PostgreSQL](https://www.postgresql.org/)

---

### **1️⃣ Clone o Repositório**  
```sh
git clone https://github.com/michelereginabora/sistema-de-agendamentos-backend.git
cd sistema-de-agendamentos-backend
```

### **2️⃣ Configure as Variáveis de Ambiente**  
Crie um arquivo **`.env`** na raiz do projeto com o seguinte conteúdo (ou copie o `.env.local.example`):  

```ini
# Banco de Dados PostgreSQL
PORT=3030
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=suasenha
DATABASE_NAME=schedule_db
DATABASE_SYNCHRONIZE=true

# Autenticação JWT
JWT_SECRET=minha_chave_jwt_super_secreta_12345!@#$%
JWT_EXPIRES_IN=60m
```

---

### **3️⃣ Instale as Dependências e Rode a Aplicação**  
Antes de iniciar, instale as dependências:  
```sh
npm install
```  
Agora, para rodar a aplicação, utilize um dos comandos abaixo:  
```sh
npm start        # Modo normal  
npm run start:dev  # Modo desenvolvimento (hot reload)  
```

---

### **4️⃣ Baixando e Instalando o PostgreSQL 13**

Para instalar o PostgreSQL 13, siga as instruções abaixo conforme o seu sistema operacional:

#### **Windows**
1. Acesse a página de downloads oficial do PostgreSQL:  
   [PostgreSQL Downloads para Windows](https://www.postgresql.org/download/windows/)
2. Baixe o instalador executável.
3. Siga as instruções do assistente de instalação. Durante a instalação, escolha a versão 13.
4. Após a instalação, o PostgreSQL será executado como um serviço, e você pode acessá-lo usando o `pgAdmin` ou a linha de comando.

#### **Linux**
Para distribuições baseadas em Debian/Ubuntu, use o seguinte comando para instalar a versão 13:
```sh
sudo apt update
sudo apt install postgresql-13 postgresql-client-13
```

Para outras distribuições, acesse a página oficial de instalação para seguir as instruções detalhadas:
[PostgreSQL Downloads para Linux](https://www.postgresql.org/download/)

#### **macOS**
1. Você pode usar o [Homebrew](https://brew.sh/) para instalar o PostgreSQL 13:
   ```sh
   brew install postgresql@13
   ```
2. Após a instalação, inicie o serviço com o comando:
   ```sh
   brew services start postgresql@13
   ```

---

### **5️⃣ Acesse os Bancos de Dados**  
Após ter o PostgreSQL instalado e configurado, você pode acessar o banco de dados usando as seguintes configurações:

- **PostgreSQL**  
  - **Host:** `localhost`  
  - **Porta:** `5432`  
  - **Usuário:** `postgres`  
  - **Senha:** `sua senha`  
  - **Banco:** `schedule_db`  
  - **GUI:** Use o [pgAdmin](https://www.pgadmin.org/) ou [DBeaver](https://dbeaver.io/) para uma interface gráfica amigável.

---

## **✅ Testando a API**
Após subir o projeto, teste a API no navegador ou com **cURL**:

```sh
curl http://localhost:3030/
```

Ou use o **Postman** / **Insomnia** para testar as rotas da aplicação.

Ou ainda, utilize o *Swagger API*
- **URL**: `http://localhost:3030/docs#/`

---

## **📚 Referências**
- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
