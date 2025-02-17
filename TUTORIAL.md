# Tutorial do Sistema de Agendamentos

## 1. Criando um Usuário Administrador

```json
POST /users
{
  "name": "John Doe",
  "email": "john@email.com",
  "password": "123456",
  "isAdmin": true,
  "isActive": true
}
```

Resposta esperada (201 Created):
```json
{
  "id": "uuid-gerado",
  "name": "John Doe",
  "email": "john@email.com",
  "password": "123456",
  "isAdmin": true,
  "isActive": true
}
```

## 2. Realizando Login

```json
POST /auth/login
{
  "email": "john@email.com",
  "password": "123456",
}
```

Resposta esperada (200 OK):
```json
{
  "access_token": "jwt-token-gerado"
}
```

**Importante**: Guarde o token recebido, ele será necessário para as próximas requisições.

## 3. Criando um Serviço

Certifique-se de que o usuário tem permissões de admin
Adicione o token no header: `Authorization: Bearer {seu-token}`


```json
POST /services
{
  "name": "Corte de Cabelo",
  "duration": 60,
  "price": 50.00
}
```

Resposta esperada (201 Created):
```json
{
  "id": "uuid-gerado",
  "name": "Corte de Cabelo",
  "duration": 60,
  "price": 50.00
}
```

## 4. Agendando um Serviço

Primeiro, adicione o token de autenticação no header da requisição: `Authorization: Bearer {seu-token}`


### Verificando disponibilidade
Para verificar os horários disponíveis, faça uma requisição GET para o endpoint de disponibilidade com os parâmetros serviceId e date:

Exemplo:
```http
GET http://localhost:3000/availability?serviceId=8ac99ae7-f9b5-4754-8213-209075d37754&date=2025-02-17
```

Você receberá uma resposta com os horários disponíveis:
```json
{
    "serviceName": "Massagem",
    "appointmentDate": "2025-02-17T00:00:00.000Z",
    "availableSlots": [
        {
            "start": "09:00",
            "end": "10:20"
        },
        {
            "start": "09:30",
            "end": "10:50"
        },
        // ... outros horários disponíveis
        {
            "start": "16:30",
            "end": "17:50"
        }
    ]
}
```

### Realizando o agendamento
Após escolher um horário disponível, faça o agendamento:

```http
POST /appointments
Content-Type: application/json

{
    "serviceId": "uuid-do-servico",
    "appointmentDate": "2025-09-20 17:50:00"
}
```

Em caso de sucesso, você receberá uma resposta com status 201 Created:
```json
{
    "id": "uuid-gerado",
    "userId": "seu-user-id",
    "serviceId": "uuid-do-servico",
    "appointmentDate": "2025-09-20T20:50:00.000Z",
    "createdAt": "horário atual em UTC"
}
```

## Regras Importantes

### Ao Agendar
- O horário escolhido deve estar disponível
- Não é possível agendar datas passadas
- Não é possível ter dois agendamentos no mesmo horário
- O sistema valida a duração do serviço para evitar conflitos

### Exemplos de Erros Comuns

1. **Horário Indisponível**:
```json
{
  "statusCode": 400,
  "message": "Serviço não está disponível para esse horário"
}
```

2. **Data Passada**:
```json
{
  "statusCode": 400,
  "message": "Não é possível agendar para uma data passada"
}
```

3. **Conflito de Horário**:
```json
{
  "statusCode": 400,
  "message": "Usuário já possui o agendamento NOME DO SERVIÇO para esse horário"
}
```

## 5. Consultando Agendamentos

### Listar Seus Agendamentos
```http
GET /appointments
Authorization: Bearer {seu-token}
```

Resposta:
```json
[
  {
    "id": "uuid-do-agendamento",
    "userId": "seu-user-id",
    "serviceId": "uuid-do-servico",
    "appointmentDate": "2025-09-20T20:50:00.000Z",
    "createdAt": "2025-09-20T19:50:00.000Z",
    "service": {
      "id": "uuid-do-servico",
      "name": "Corte de Cabelo",
      "duration": 60,
      "price": 50.00
    }
  }
]
```

### Observações Importantes
- Todos os horários são salvos em UTC
- A duração do serviço é considerada para verificar disponibilidade
- Um cliente pode ter múltiplos agendamentos em datas/horários diferentes
- Apenas usuários admin podem criar/editar serviços
- Cliente comum pode apenas visualizar serviços e criar/gerenciar seus próprios agendamentos

## Dicas de Uso
- Sempre verifique a disponibilidade antes de tentar agendar
- Lembre-se de incluir o token em todas as requisições autenticadas
- Preste atenção na duração do serviço ao escolher o horário
