# Documentação do Sistema de Autenticação e Usuários

# Estrutura do Projeto

## Visão Geral da Estrutura de Diretórios

### src/
Diretório principal do código fonte.

#### auth/
Contém implementações relacionadas à autenticação.
- Estratégias de autenticação
- Guardas de rotas
- Interfaces de autenticação

#### database/
Configurações e conexões com bancos de dados.

##### postgres/
Configurações específicas para PostgreSQL
- Arquivos de configuração/conexão

##### mongodb/
Configurações específicas para MongoDB


#### resources/
Recursos da aplicação.

##### user/
Implementações relacionadas aos usuários
- Controllers
- Services
- DTOs
- Entities

#### utils/
Utilitários e funções auxiliares.
hash.ts - criação de hash para senhas

---------------


## Módulo de Autenticação (Auth)

### JWT Strategy
O arquivo `jwt.strategy.ts` implementa a estratégia de autenticação JWT:
- Extrai o token JWT do header Authorization
- Verifica a validade do token usando a chave secreta
- Verifica a expiração do token
- Decodifica o payload
- Disponibiliza os dados do usuário para a aplicação

### JWT Auth Guard
Em `jwt-auth.guard.ts`, o guard de autenticação:
- Intercepta requisições
- Verifica a existência e validade do token JWT
- Gerencia o acesso:
  - Permite acesso se o token for válido
  - Retorna erro 401 (Unauthorized) se inválido

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
Implementa operações CRUD e funcionalidades extras:

#### Métodos
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

#### Segurança
- Hashing de senha
- Validação via DTOs
- Operações assíncronas

### Controller de Usuários
Características principais:
- Proteção de rotas com JwtAuthGuard
- Validação de entrada via DTOs
- Operações assíncronas (Promises)
- Conformidade com padrões RESTful