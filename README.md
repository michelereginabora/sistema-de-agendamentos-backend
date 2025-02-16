# **SISTEMA DE AGENDAMENTOS - API**  

Este projeto é um **Desafio Técnico** para o desenvolvimento de um **Sistema de Agendamentos**, onde usuários podem marcar horários para serviços específicos.  

O objetivo é mostrar habilidades em:  
✅ **NestJS** para construção da API (backend)  
✅ **React/Next.js** para a interface do usuário (frontend)  
✅ **Modelagem de banco de dados** com **PostgreSQL** e **MongoDB**  
✅ **Implementação de regras de negócio** para garantir um fluxo seguro e eficiente  

O sistema visa ser robusto, escalável e seguir boas práticas de desenvolvimento. 🚀

-----------

## **📌 Schedule Manager - Setup Local com Docker**

Este projeto é uma aplicação **NestJS** que utiliza **PostgreSQL** e **MongoDB** como bancos de dados, rodando via **Docker Compose**.

---

## **🔧 Pré-requisitos**
Antes de começar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js 22+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (ou `npm` / `yarn`)

---

## **🚀 Rodando o Projeto**
### **1️⃣ Clone o Repositório**
```sh
git clone https://github.com/michelereginabora/sistema-de-agendamentos-backend.git
cd sistema-de-agendamentos-backend
```

### **2️⃣ Configure as Variáveis de Ambiente**
Crie um arquivo **`.env`** na raiz do projeto com o seguinte conteúdo (ou apenas copie o .env.local):

```ini
# Banco de Dados PostgreSQL
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=admin
DATABASE_NAME=schedule_db
DATABASE_SYNCHRONIZE=true

# Banco de Dados MongoDB
MONGO_URL=mongodb://mongo:27017/schedule_db

# URL do Banco PostgreSQL
DATABASE_URL=postgresql://postgres:admin@postgres:5432/schedule_db
```

---

### **3️⃣ Suba os Containers com Docker**
Agora, rode o seguinte comando para subir os containers:

```sh
docker-compose up -d
```

Isso irá:

✅ Criar os containers do **NestJS**, **PostgreSQL** e **MongoDB**  
✅ Configurar os bancos de dados automaticamente  
✅ Disponibilizar a API em **http://localhost:3000**

---

### **4️⃣ Acesse os Bancos de Dados**
- **PostgreSQL**
  - **Host:** `localhost`
  - **Porta:** `5432`
  - **Usuário:** `postgres`
  - **Senha:** `admin`
  - **Banco:** `schedule_db`
  - **GUI:** Use o [pgAdmin](https://www.pgadmin.org/) ou [DBeaver](https://dbeaver.io/)

- **MongoDB**
  - **Host:** `localhost`
  - **Porta:** `27017`
  - **Banco:** `schedule_db`
  - **GUI:** Use o [MongoDB Compass](https://www.mongodb.com/try/download/compass)

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
curl http://localhost:3000/
```

Ou use o **Postman** / **Insomnia** para testar as rotas da aplicação.

---

## **📚 Referências**
- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
