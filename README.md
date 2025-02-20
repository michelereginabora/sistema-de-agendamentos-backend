# **SISTEMA DE AGENDAMENTOS - API**  

Este projeto é um **Desafio Técnico** para o desenvolvimento de um **Sistema de Agendamentos**, onde usuários podem marcar horários para serviços específicos.  

O objetivo é mostrar habilidades em:  
✅ **NestJS** para construção da API (backend)  
✅ **React/Next.js** para a interface do usuário (frontend)  
✅ **Modelagem de banco de dados** com **PostgreSQL**
✅ **Implementação de regras de negócio** para garantir um fluxo seguro e eficiente  

O sistema visa ser robusto, escalável e seguir boas práticas de desenvolvimento. 🚀

## Links de Documentação

### Swagger API
- **URL**: `http://localhost:{porta}/docs#/`
- Documentação interativa da API
- Testes de endpoints
- Descrição dos schemas

### Documentação do Código
- **GitHub**: [Link para documentação completa](https://github.com/michelereginabora/sistema-de-agendamentos-backend/blob/main/DOC.md)
- Detalhamento técnico

-----------

## **📌 Schedule Manager - Setup Local com Docker**

Este projeto é uma aplicação **NestJS** que utiliza **PostgreSQL** como bancos de dados.
---

## **🔧 Pré-requisitos**
Antes de começar, certifique-se de ter instalado:


- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (ou `npm` / `yarn`)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### **🚀 Rodando o Projeto**  

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
DATABASE_PASSWORD=admin
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

### **4️⃣ Suba os Containers com Docker**  
Caso prefira utilizar **Docker**, rode o seguinte comando:  
```sh
docker-compose up -d
```
Isso irá:  
✅ Criar os containers do **NestJS** e **PostgreSQL**
✅ Configurar os bancos de dados automaticamente  
✅ Disponibilizar a API em **http://localhost:3030**  

---

### **5️⃣ Acesse os Bancos de Dados**  
- **PostgreSQL**  
  - **Host:** `localhost`  
  - **Porta:** `5432`  
  - **Usuário:** `postgres`  
  - **Senha:** `admin`  
  - **Banco:** `schedule_db`  
  - **GUI:** Use o [pgAdmin](https://www.pgadmin.org/) ou [DBeaver](https://dbeaver.io/)  

---

## **🛠️ Comandos Úteis**
📌 **Ver logs do NestJS**  
```sh
docker logs -f schedule_manager_app
```

📌 **Acessar o container do PostgreSQL**  
```sh
docker exec -it schedule_manager_postgres psql -U postgres -d schedule_db
```

📌 **Acessar o container do MongoDB**  
```sh
docker exec -it schedule_manager_mongo mongosh
```

📌 **Derrubar os containers**  
```sh
docker-compose down
```

📌 **Recriar os containers do zero**  
```sh
docker-compose down -v
docker-compose up --build -d
```

---

## **✅ Testando a API**
Após subir o projeto, teste a API no navegador ou com **cURL**:

```sh
curl http://localhost:3030/
```

Ou use o **Postman** / **Insomnia** para testar as rotas da aplicação.

---

## **📚 Referências**
- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
