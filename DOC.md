# Documentação do Sistema de Autenticação e Usuários

## Índice

1. [Estrutura do Projeto](#estrutura-do-projeto)
   - [Visão Geral da Estrutura de Diretórios](#visão-geral-da-estrutura-de-diretórios)
     - [src/auth/](#srcauth)
     - [src/database/](#srcdatabase)
     - [src/resources/](#srcresources)
     - [src/utils/](#srcutils)

2. [Módulo de Autenticação](#módulo-de-autenticação-auth)
   - [JWT Strategy](#jwt-strategy)
   - [JWT Auth Guard](#jwt-auth-guard)
   - [Interfaces de Autenticação](#interfaces-de-autenticação)
   - [Controller de Autenticação](#controller-de-autenticação)
   - [Serviço de Autenticação](#serviço-de-autenticação)
   - [Módulo de Autenticação](#módulo-de-autenticação)

3. [Módulo de Usuários](#módulo-de-usuários-user)
   - [Entidade User](#entidade-user)
   - [Serviço de Usuários](#serviço-de-usuários)
   - [Controller de Usuários](#controller-de-usuários)

4. [Módulo de Serviços](#módulo-de-serviços-services)
   - [Entidade Services](#entidade-services)
   - [Serviço de Services](#serviço-de-services)
   - [Controllers de Services](#controllers-de-services)

5. [Módulo de Agendamento](#módulo-de-agendamento)
   - [Entidade Appointments](#entidade-appointments)
   - [Serviço de Appointments](#serviço-de-appointments)
   - [Regras de Negócio](#regras-de-negócio)
   - [Métodos Principais](#métodos-principais)
   - [Métodos de Validação](#métodos-de-validação)
   - [Exceções](#exceções)

## Estrutura do Projeto

### Visão Geral da Estrutura de Diretórios

#### src/auth/
Contém implementações relacionadas à autenticação:
- Estratégias de autenticação
- Guardas de rotas
- Interfaces de autenticação

#### src/database/
Configurações e conexões com bancos de dados:

- **postgres/**
  - Configurações específicas para PostgreSQL
  - Arquivos de configuração/conexão

- **mongodb/**
  - Configurações específicas para MongoDB

#### src/resources/
Recursos da aplicação:

- **user/**
  - Controllers
  - Services
  - DTOs
  - Entities

#### src/utils/
Utilitários, types, interfaces e funções auxiliares:
- hash.ts - criação de hash para senhas
- RequestWithUser - interface que extende do tipo Request do Express para incluir informações do usuário autenticado.

## Módulo de Autenticação (Auth)

### JWT Strategy
O arquivo `jwt.strategy.ts` implementa a estratégia de autenticação JWT:
- Extrai o token JWT do header Authorization
- Verifica a validade do token usando a chave secreta
- Verifica a expiração do token
- Decodifica o payload
- Disponibiliza os dados do usuário para a aplicação

### JWT Auth Guard
O guard de autenticação em `jwt-auth.guard.ts`:
- Intercepta requisições
- Verifica a existência e validade do token JWT
- Permite acesso se o token for válido
- Retorna erro 401 (Unauthorized) se inválido

Em `admin.guard.ts`:
- Gerencia o acesso
- Permite apenas usuários admins

### Interfaces de Autenticação
O arquivo `auth.interfaces.ts` define:
- Tipagem forte para o sistema de autenticação
- Consistência nos dados trafegados
- Estruturas claras para manutenção do código

### Controller de Autenticação
`auth.controller.ts` implementa:
- Endpoint de login
- Integração com sistema JWT
- Validação de credenciais

### Serviço de Autenticação
Em `auth.service.ts`, são implementados:
- Validação de credenciais
- Geração de tokens JWT
- Segurança das operações
- Consistência dos dados

### Módulo de Autenticação
`auth.module.ts` centraliza e integra:
- Estratégia JWT
- Guard JWT
- Controller
- Serviço
- Interfaces

## Módulo de Usuários (User)

### Entidade User
Estrutura da tabela no banco de dados:

```sql
CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  isAdmin BOOLEAN NOT NULL,
  isActive BOOLEAN NOT NULL DEFAULT true
);
```

### Serviço de Usuários
Implementa métodos CRUD e funcionalidades extras:

**Métodos:**

1. **create**
   - Recebe dados via DTO
   - Gera hash da senha
   - Salva usuário no banco

2. **findAll**
   - Lista todos os usuários

3. **findOne**
   - Busca por ID
   - Retorna null se não encontrar

4. **update**
   - Atualiza dados
   - Retorna usuário atualizado

5. **findByEmail**
   - Busca por email
   - Usado na autenticação

6. **remove**
   - Remove usuário
   - Sem retorno de dados

**Segurança:**
- Hashing de senha
- Validação via DTOs
- Operações assíncronas

### Controller de Usuários
Características principais:
- Proteção de rotas com JwtAuthGuard
- Validação de entrada via DTOs
- Operações assíncronas (Promises)

## Módulo de Serviços (Services)

### Entidade Services
Estrutura da tabela no banco de dados:

```sql
CREATE TABLE services (
 id UUID PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 duration INT NOT NULL, -- em minutos
 price DECIMAL(10,2)
);
```

### Serviço de Services
Fornece dois métodos principais:
- findAll(): Retorna todos os serviços cadastrados
- create(): Cria um novo serviço usando os dados fornecidos

### Controllers de Services
Implementa duas rotas:

- **GET /services**
  - Pública (não requer autenticação)
  - Retorna todos os serviços cadastrados

- **POST /services**
  - Protegida (requer autenticação)
  - Requer que o usuário seja admin
  - Aceita dados no corpo da requisição para criar um novo serviço
  - Valida os dados recebidos usando o CreateServiceDto

## Módulo de Agendamento

### Entidade Appointments
Estrutura da tabela no banco de dados:

```sql
CREATE TABLE appointments (
 id UUID PRIMARY KEY,
 user_id UUID NOT NULL,
 service_id UUID REFERENCES services(id),
 created_at TIMESTAMP DEFAULT NOW()
);
```

### Serviço de Appointments
O serviço lida com a criação, validação e consulta de agendamentos, implementando um conjunto robusto de regras de negócio.

### Regras de Negócio
- Um horário só pode ser agendado se estiver disponível (Um serviço não pode ser agendado para dois usuários diferentes no mesmo horário)
- Usuários não podem ter mais de um agendamento no mesmo horário
- Usuários não podem agendar horários passados
- Validar conflitos de horário (ex: serviço com duração de 1h não pode ser agendado em slots de 30min)
- O sistema considera o horário de início e fim (baseado na duração do serviço)

### Métodos Principais

#### createAppointment()
**Parâmetros:**
- `userId`: ID do usuário que está fazendo o agendamento
- `serviceId`: ID do serviço a ser agendado
- `appointmentData`: DTO contendo os dados do agendamento

#### findUserAppointments()
**Parâmetros:**
- `userId`: ID do usuário para buscar os agendamentos

### Métodos de Validação
- validateService() - Valida se o serviço existe no banco de dados.
- validateUser() - Valida se o usuário existe e foi encontrado.
- validateAppointmentDate() - Valida se a data do agendamento não é no passado.
- calculateAppointmentEndTime() - Calcula o horário de término de um agendamento baseado na duração do serviço.
- validateExistingUserAppointment() - Verifica se existe conflito com outros agendamentos do usuário no horário desejado.
- validateExistingServiceAppointment() - Verifica se o serviço está disponível no horário desejado.

### Exceções

#### BadRequestException
Lançada quando há violações nas regras de negócio:
- Agendamento em data passada
- Conflito de horários
- Serviço indisponível

#### NotFoundException
Lançada quando o serviço solicitado não existe.