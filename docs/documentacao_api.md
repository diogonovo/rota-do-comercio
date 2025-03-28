# Documentação da API - Rota do Comércio

## Introdução

Esta documentação descreve a API REST e GraphQL do marketplace Rota do Comércio. A API permite que desenvolvedores integrem suas aplicações com o marketplace, acessando funcionalidades como gestão de produtos, encomendas, marcas e utilizadores.

## Base URL

```
https://api.rotadocomercio.pt/v1
```

## Autenticação

A API utiliza autenticação baseada em tokens JWT. Para obter um token, é necessário fazer uma requisição para o endpoint de login.

### Obter Token

```
POST /auth/login
```

**Corpo da Requisição:**

```json
{
  "email": "exemplo@email.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nome do Utilizador",
    "email": "exemplo@email.com",
    "role": "BRAND"
  }
}
```

### Utilizar o Token

Inclua o token no cabeçalho `Authorization` de todas as requisições que requerem autenticação:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints

### Autenticação

#### Registar Utilizador

```
POST /auth/register
```

**Corpo da Requisição:**

```json
{
  "name": "Nome do Utilizador",
  "email": "exemplo@email.com",
  "password": "senha123",
  "role": "CUSTOMER"
}
```

**Resposta:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nome do Utilizador",
    "email": "exemplo@email.com",
    "role": "CUSTOMER"
  }
}
```

#### Obter Utilizador Atual

```
GET /auth/me
```

**Resposta:**

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Nome do Utilizador",
    "email": "exemplo@email.com",
    "role": "CUSTOMER"
  }
}
```

### Produtos

#### Listar Produtos

```
GET /products
```

**Parâmetros de Query:**

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Número de itens por página (padrão: 20)
- `category` (opcional): Filtrar por categoria
- `brandId` (opcional): Filtrar por marca
- `minPrice` (opcional): Preço mínimo
- `maxPrice` (opcional): Preço máximo
- `search` (opcional): Termo de pesquisa

**Resposta:**

```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Nome do Produto",
      "description": "Descrição do produto",
      "price": 29.99,
      "stock": 10,
      "brandId": 1,
      "brand": {
        "id": 1,
        "name": "Nome da Marca"
      },
      "images": [
        {
          "id": 1,
          "url": "https://exemplo.com/imagem.jpg",
          "isMain": true
        }
      ],
      "categories": [
        {
          "id": 1,
          "name": "Categoria"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

#### Obter Produto

```
GET /products/:id
```

**Resposta:**

```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Nome do Produto",
    "description": "Descrição do produto",
    "price": 29.99,
    "stock": 10,
    "brandId": 1,
    "brand": {
      "id": 1,
      "name": "Nome da Marca"
    },
    "images": [
      {
        "id": 1,
        "url": "https://exemplo.com/imagem.jpg",
        "isMain": true
      }
    ],
    "categories": [
      {
        "id": 1,
        "name": "Categoria"
      }
    ],
    "variants": [
      {
        "id": 1,
        "name": "Tamanho",
        "options": ["P", "M", "G"]
      }
    ],
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Ótimo produto!",
        "user": {
          "id": 2,
          "name": "Cliente"
        },
        "createdAt": "2025-03-15T10:30:00Z"
      }
    ]
  }
}
```

#### Criar Produto

```
POST /products
```

**Corpo da Requisição:**

```json
{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 29.99,
  "stock": 10,
  "categories": [1, 2],
  "images": [
    {
      "url": "https://exemplo.com/imagem.jpg",
      "isMain": true
    }
  ],
  "variants": [
    {
      "name": "Tamanho",
      "options": ["P", "M", "G"]
    }
  ]
}
```

**Resposta:**

```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Nome do Produto",
    "description": "Descrição do produto",
    "price": 29.99,
    "stock": 10,
    "brandId": 1,
    "images": [
      {
        "id": 1,
        "url": "https://exemplo.com/imagem.jpg",
        "isMain": true
      }
    ],
    "categories": [
      {
        "id": 1,
        "name": "Categoria 1"
      },
      {
        "id": 2,
        "name": "Categoria 2"
      }
    ],
    "variants": [
      {
        "id": 1,
        "name": "Tamanho",
        "options": ["P", "M", "G"]
      }
    ]
  }
}
```

#### Atualizar Produto

```
PUT /products/:id
```

**Corpo da Requisição:**

```json
{
  "name": "Nome Atualizado",
  "price": 39.99,
  "stock": 20
}
```

**Resposta:**

```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Nome Atualizado",
    "description": "Descrição do produto",
    "price": 39.99,
    "stock": 20,
    "brandId": 1,
    "images": [
      {
        "id": 1,
        "url": "https://exemplo.com/imagem.jpg",
        "isMain": true
      }
    ],
    "categories": [
      {
        "id": 1,
        "name": "Categoria 1"
      },
      {
        "id": 2,
        "name": "Categoria 2"
      }
    ]
  }
}
```

#### Excluir Produto

```
DELETE /products/:id
```

**Resposta:**

```json
{
  "success": true,
  "message": "Produto excluído com sucesso"
}
```

### Marcas

#### Listar Marcas

```
GET /brands
```

**Parâmetros de Query:**

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Número de itens por página (padrão: 20)
- `search` (opcional): Termo de pesquisa

**Resposta:**

```json
{
  "success": true,
  "brands": [
    {
      "id": 1,
      "name": "Nome da Marca",
      "description": "Descrição da marca",
      "logo": "https://exemplo.com/logo.jpg",
      "banner": "https://exemplo.com/banner.jpg",
      "subscriptionLevel": "PRO",
      "productCount": 25
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

#### Obter Marca

```
GET /brands/:id
```

**Resposta:**

```json
{
  "success": true,
  "brand": {
    "id": 1,
    "name": "Nome da Marca",
    "description": "Descrição da marca",
    "logo": "https://exemplo.com/logo.jpg",
    "banner": "https://exemplo.com/banner.jpg",
    "subscriptionLevel": "PRO",
    "featuredProducts": [
      {
        "id": 1,
        "name": "Produto Destacado",
        "price": 29.99,
        "image": "https://exemplo.com/imagem.jpg"
      }
    ],
    "categories": [
      {
        "id": 1,
        "name": "Categoria",
        "productCount": 10
      }
    ]
  }
}
```

#### Criar Marca

```
POST /brands
```

**Corpo da Requisição:**

```json
{
  "name": "Nome da Marca",
  "description": "Descrição da marca",
  "logo": "https://exemplo.com/logo.jpg",
  "banner": "https://exemplo.com/banner.jpg",
  "user": {
    "name": "Nome do Responsável",
    "email": "marca@exemplo.com",
    "password": "senha123"
  }
}
```

**Resposta:**

```json
{
  "success": true,
  "brand": {
    "id": 1,
    "name": "Nome da Marca",
    "description": "Descrição da marca",
    "logo": "https://exemplo.com/logo.jpg",
    "banner": "https://exemplo.com/banner.jpg",
    "subscriptionLevel": "BASIC",
    "userId": 1
  }
}
```

#### Atualizar Marca

```
PUT /brands/:id
```

**Corpo da Requisição:**

```json
{
  "name": "Nome Atualizado",
  "description": "Descrição atualizada",
  "logo": "https://exemplo.com/novo-logo.jpg"
}
```

**Resposta:**

```json
{
  "success": true,
  "brand": {
    "id": 1,
    "name": "Nome Atualizado",
    "description": "Descrição atualizada",
    "logo": "https://exemplo.com/novo-logo.jpg",
    "banner": "https://exemplo.com/banner.jpg",
    "subscriptionLevel": "BASIC",
    "userId": 1
  }
}
```

#### Dashboard da Marca

```
GET /brands/dashboard
```

**Resposta:**

```json
{
  "success": true,
  "dashboard": {
    "productCount": 25,
    "orderCount": 156,
    "revenue": 12450.75,
    "balance": 9876.50,
    "stats": {
      "views": 2345,
      "sales": 156,
      "conversion": 6.65,
      "averageOrder": 79.81
    },
    "recentOrders": [
      {
        "id": "ORD-12345",
        "date": "2025-03-28T10:30:00Z",
        "customer": "João Silva",
        "total": 79.99,
        "status": "pending"
      }
    ],
    "topProducts": [
      {
        "id": 1,
        "name": "Produto Popular",
        "price": 29.99,
        "sales": 42
      }
    ]
  }
}
```

### Encomendas

#### Listar Encomendas do Utilizador

```
GET /orders
```

**Parâmetros de Query:**

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Número de itens por página (padrão: 20)
- `status` (opcional): Filtrar por estado

**Resposta:**

```json
{
  "success": true,
  "orders": [
    {
      "id": "ORD-12345",
      "date": "2025-03-28T10:30:00Z",
      "total": 79.99,
      "status": "pending",
      "items": 2
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "pages": 1
  }
}
```

#### Obter Encomenda

```
GET /orders/:id
```

**Resposta:**

```json
{
  "success": true,
  "order": {
    "id": "ORD-12345",
    "date": "2025-03-28T10:30:00Z",
    "total": 79.99,
    "status": "pending",
    "shippingAddress": {
      "name": "João Silva",
      "address": "Rua Exemplo, 123",
      "postalCode": "1000-001",
      "city": "Lisboa",
      "phone": "912345678"
    },
    "shippingMethod": {
      "name": "CTT",
      "price": 3.99,
      "estimatedDelivery": "2-3 dias úteis"
    },
    "paymentMethod": {
      "name": "Multibanco",
      "reference": "12345 12345 12345"
    },
    "items": [
      {
        "id": 1,
        "productId": 1,
        "name": "Produto 1",
        "price": 29.99,
        "quantity": 2,
        "total": 59.98,
        "brand": {
          "id": 1,
          "name": "Marca 1"
        },
        "image": "https://exemplo.com/imagem.jpg"
      },
      {
        "id": 2,
        "productId": 2,
        "name": "Produto 2",
        "price": 19.99,
        "quantity": 1,
        "total": 19.99,
        "brand": {
          "id": 2,
          "name": "Marca 2"
        },
        "image": "https://exemplo.com/imagem2.jpg"
      }
    ],
    "tracking": {
      "number": "CT123456789PT",
      "url": "https://www.ctt.pt/feapl_2/app/open/objectSearch/objectSearch.jspx?objects=CT123456789PT"
    }
  }
}
```

#### Criar Encomenda

```
POST /orders
```

**Corpo da Requisição:**

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "name": "João Silva",
    "address": "Rua Exemplo, 123",
    "postalCode": "1000-001",
    "city": "Lisboa",
    "phone": "912345678"
  },
  "shippingMethodId": 1,
  "paymentMethodId": 1
}
```

**Resposta:**

```json
{
  "success": true,
  "order": {
    "id": "ORD-12345",
    "date": "2025-03-28T10:30:00Z",
    "total": 83.98,
    "status": "pending",
    "items": [
      {
        "id": 1,
        "productId": 1,
        "name": "Produto 1",
        "price": 29.99,
        "quantity": 2,
        "total": 59.98
      },
      {
        "id": 2,
        "productId": 2,
        "name": "Produto 2",
        "price": 19.99,
        "quantity": 1,
        "total": 19.99
      }
    ],
    "shippingMethod": {
      "name": "CTT",
      "price": 3.99
    },
    "paymentMethod": {
      "name": "Multibanco",
      "reference": "12345 12345 12345"
    }
  }
}
```

#### Atualizar Estado da Encomenda

```
PATCH /orders/:id/status
```

**Corpo da Requisição:**

```json
{
  "status": "processing"
}
```

**Resposta:**

```json
{
  "success": true,
  "order": {
    "id": "ORD-12345",
    "status": "processing",
    "updatedAt": "2025-03-28T11:30:00Z"
  }
}
```

#### Cancelar Encomenda

```
PATCH /orders/:id/cancel
```

**Resposta:**

```json
{
  "success": true,
  "order": {
    "id": "ORD-12345",
    "status": "cancelled",
    "updatedAt": "2025-03-28T11:30:00Z"
  }
}
```

### Subscrições

#### Obter Subscrição Atual

```
GET /subscriptions/current
```

**Resposta:**

```json
{
  "success": true,
  "subscription": {
    "id": 1,
    "level": "PRO",
    "startDate": "2025-03-01T00:00:00Z",
    "endDate": "2025-04-01T00:00:00Z",
    "active": true,
    "features": [
      "Até 200 produtos",
      "Até 5 imagens por produto",
      "Personalização da loja",
      "Analytics avançados",
      "Destaque de produtos"
    ],
    "limits": {
      "products": 200,
      "imagesPerProduct": 5,
      "commission": 8
    }
  }
}
```

#### Atualizar Nível de Subscrição

```
PATCH /subscriptions/upgrade
```

**Corpo da Requisição:**

```json
{
  "level": "PREMIUM"
}
```

**Resposta:**

```json
{
  "success": true,
  "subscription": {
    "id": 1,
    "level": "PREMIUM",
    "startDate": "2025-03-28T00:00:00Z",
    "endDate": "2025-04-28T00:00:00Z",
    "active": true,
    "features": [
      "Produtos ilimitados",
      "Imagens ilimitadas por produto",
      "Personalização completa da loja",
      "Campanhas de marketing",
      "Taxas de envio personalizadas"
    ],
    "limits": {
      "products": -1,
      "imagesPerProduct": -1,
      "commission": 6
    },
    "payment": {
      "amount": 99.99,
      "method": "Cartão de Crédito",
      "date": "2025-03-28T10:30:00Z"
    }
  }
}
```

#### Renovar Subscrição

```
PATCH /subscriptions/renew
```

**Resposta:**

```json
{
  "success": true,
  "subscription": {
    "id": 1,
    "level": "PRO",
    "startDate": "2025-04-01T00:00:00Z",
    "endDate": "2025-05-01T00:00:00Z",
    "active": true,
    "payment": {
      "amount": 49.99,
      "method": "Cartão de Crédito",
      "date": "2025-03-28T10:30:00Z"
    }
  }
}
```

#### Cancelar Subscrição

```
PATCH /subscriptions/cancel
```

**Resposta:**

```json
{
  "success": true,
  "subscription": {
    "id": 1,
    "level": "PRO",
    "endDate": "2025-04-01T00:00:00Z",
    "active": false,
    "cancellationDate": "2025-03-28T10:30:00Z"
  }
}
```

## API GraphQL

Além da API REST, o Rota do Comércio também oferece uma API GraphQL para consultas mais flexíveis e eficientes.

### Endpoint

```
https://api.rotadocomercio.pt/graphql
```

### Autenticação

A autenticação é feita da mesma forma que na API REST, incluindo o token JWT no cabeçalho `Authorization`.

### Exemplos de Queries

#### Obter Produtos com Filtros

```graphql
query {
  products(
    filter: { 
      categoryId: 1, 
      minPrice: 10, 
      maxPrice: 100 
    }, 
    pagination: { 
      page: 1, 
      limit: 10 
    }
  ) {
    id
    name
    price
    description
    brand {
      id
      name
    }
    images {
      url
      isMain
    }
  }
}
```

#### Obter Detalhes de uma Marca com Produtos

```graphql
query {
  brand(id: 1) {
    id
    name
    description
    logo
    products {
      id
      name
      price
    }
  }
}
```

#### Obter Encomendas de um Utilizador

```graphql
query {
  myOrders(pagination: { page: 1, limit: 10 }) {
    id
    date
    total
    status
    items {
      product {
        id
        name
        image
      }
      quantity
      price
    }
  }
}
```

### Exemplos de Mutations

#### Criar Produto

```graphql
mutation {
  createProduct(
    input: {
      name: "Novo Produto"
      description: "Descrição do produto"
      price: 29.99
      stock: 10
      categories: [1, 2]
      images: [
        { url: "https://exemplo.com/imagem.jpg", isMain: true }
      ]
    }
  ) {
    id
    name
    price
  }
}
```

#### Criar Encomenda

```graphql
mutation {
  createOrder(
    input: {
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
      ],
      shippingAddress: {
        name: "João Silva"
        address: "Rua Exemplo, 123"
        postalCode: "1000-001"
        city: "Lisboa"
        phone: "912345678"
      },
      shippingMethodId: 1,
      paymentMethodId: 1
    }
  ) {
    id
    total
    status
  }
}
```

## Códigos de Erro

| Código | Descrição                                 |
|--------|--------------------------------------------|
| 400    | Requisição inválida                        |
| 401    | Não autenticado                            |
| 403    | Não autorizado                             |
| 404    | Recurso não encontrado                     |
| 409    | Conflito (ex: email já registado)          |
| 422    | Erro de validação                          |
| 429    | Muitas requisições                         |
| 500    | Erro interno do servidor                   |

## Limites de Taxa

A API tem os seguintes limites de taxa:

- 100 requisições por minuto para endpoints públicos
- 300 requisições por minuto para endpoints autenticados
- 1000 requisições por dia para endpoints de criação/atualização

## Webhooks

O Rota do Comércio suporta webhooks para notificar aplicações externas sobre eventos importantes.

### Eventos Disponíveis

- `order.created`: Quando uma nova encomenda é criada
- `order.updated`: Quando o estado de uma encomenda é atualizado
- `order.cancelled`: Quando uma encomenda é cancelada
- `product.created`: Quando um novo produto é criado
- `product.updated`: Quando um produto é atualizado
- `product.deleted`: Quando um produto é excluído
- `subscription.created`: Quando uma nova subscrição é criada
- `subscription.updated`: Quando uma subscrição é atualizada
- `subscription.cancelled`: Quando uma subscrição é cancelada

### Configurar Webhooks

```
POST /webhooks
```

**Corpo da Requisição:**

```json
{
  "url": "https://meusite.com/webhook",
  "events": ["order.created", "order.updated"],
  "secret": "meu_segredo_secreto"
}
```

**Resposta:**

```json
{
  "success": true,
  "webhook": {
    "id": 1,
    "url": "https://meusite.com/webhook",
    "events": ["order.created", "order.updated"],
    "active": true
  }
}
```

### Formato do Payload

```json
{
  "event": "order.created",
  "timestamp": "2025-03-28T10:30:00Z",
  "data": {
    "id": "ORD-12345",
    "total": 79.99,
    "status": "pending"
  }
}
```

## Suporte

Para suporte técnico relacionado à API, entre em contato com:

- Email: api@rotadocomercio.pt
- Documentação completa: https://developers.rotadocomercio.pt
