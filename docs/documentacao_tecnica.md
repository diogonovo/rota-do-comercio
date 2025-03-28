# Documentação Técnica - Rota do Comércio

## Visão Geral

O Rota do Comércio é um marketplace online destinado a marcas pequenas e independentes, onde cada marca pode criar a sua própria loja personalizada dentro da plataforma. As marcas têm acesso a diferentes funcionalidades e níveis de visibilidade consoante o pack de serviços que subscrevem (Básico, Pro, Premium).

Esta documentação técnica destina-se a desenvolvedores e administradores técnicos que necessitam de compreender a arquitetura, implementação e manutenção do sistema.

## Arquitetura do Sistema

### Visão Geral da Arquitetura

O Rota do Comércio segue uma arquitetura de microserviços, com separação clara entre frontend e backend:

- **Frontend**: Aplicação Next.js com TypeScript, Tailwind CSS e Shadcn UI
- **Backend**: API RESTful e GraphQL construída com NestJS e TypeScript
- **Base de Dados**: PostgreSQL para armazenamento persistente
- **Cache**: Redis para caching e sessões
- **Pesquisa**: Elasticsearch para pesquisa avançada de produtos
- **Armazenamento**: AWS S3 para armazenamento de imagens e ficheiros
- **Infraestrutura**: Docker e Kubernetes para containerização e orquestração

### Diagrama de Arquitetura

O diagrama de arquitetura está disponível em `/docs/diagramas/arquitetura_sistema.png`.

### Componentes Principais

#### Frontend

- **Páginas Públicas**: Home, Produtos, Marcas, Checkout, etc.
- **Painel de Cliente**: Gestão de perfil, encomendas, favoritos
- **Painel de Marca**: Gestão de produtos, encomendas, análises, configurações
- **Painel de Administração**: Gestão de marcas, utilizadores, configurações do sistema

#### Backend

- **Autenticação**: Gestão de utilizadores, autenticação JWT, autorização baseada em roles
- **Produtos**: CRUD de produtos, categorias, variantes, imagens
- **Marcas**: Gestão de marcas, lojas personalizadas, níveis de subscrição
- **Encomendas**: Processamento de encomendas, pagamentos, envios
- **Subscrições**: Gestão de níveis de subscrição, pagamentos recorrentes
- **Transportadoras**: Integração com CTT, DPD, GLS
- **Pagamentos**: Processamento de pagamentos, comissões, reembolsos

#### Base de Dados

- **PostgreSQL**: Base de dados relacional principal
- **Redis**: Cache e gestão de sessões
- **Elasticsearch**: Motor de pesquisa para produtos e marcas

## Stack Tecnológica

### Frontend

- **Framework**: Next.js 14
- **Linguagem**: TypeScript 5.0+
- **Estilização**: Tailwind CSS 3.3+
- **Componentes UI**: Shadcn UI
- **Gestão de Estado**: React Context API, SWR para fetching de dados
- **Formulários**: React Hook Form, Zod para validação

### Backend

- **Framework**: NestJS 10
- **Linguagem**: TypeScript 5.0+
- **ORM**: Prisma
- **API**: REST e GraphQL (Apollo)
- **Autenticação**: Passport.js, JWT
- **Validação**: class-validator, class-transformer
- **Logging**: Winston
- **Testes**: Jest, Supertest

### Infraestrutura

- **Containerização**: Docker
- **Orquestração**: Kubernetes
- **CI/CD**: GitHub Actions
- **Cloud**: AWS (EC2, S3, RDS, ElastiCache, Elasticsearch Service)
- **Monitorização**: Prometheus, Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

## Modelo de Dados

### Entidades Principais

- **User**: Utilizadores do sistema (administradores, marcas, clientes)
- **Brand**: Marcas/vendedores na plataforma
- **Product**: Produtos disponíveis para venda
- **ProductVariant**: Variantes de produtos (tamanhos, cores, etc.)
- **ProductImage**: Imagens de produtos
- **Category**: Categorias de produtos
- **Order**: Encomendas realizadas pelos clientes
- **OrderItem**: Itens individuais de uma encomenda
- **Payment**: Pagamentos associados a encomendas
- **Subscription**: Subscrições das marcas (Básico, Pro, Premium)
- **Carrier**: Transportadoras disponíveis para envio
- **ShippingAddress**: Endereços de envio
- **Review**: Avaliações de produtos

### Diagrama ER

O diagrama de entidade-relacionamento está disponível em `/docs/diagramas/modelo_dados.png`.

## API

### Endpoints REST

#### Autenticação

- `POST /api/auth/register` - Registo de novos utilizadores
- `POST /api/auth/login` - Login de utilizadores
- `GET /api/auth/me` - Obter informações do utilizador autenticado
- `POST /api/auth/logout` - Logout de utilizadores

#### Produtos

- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Obter detalhes de um produto
- `POST /api/products` - Criar um novo produto (requer autenticação de marca)
- `PUT /api/products/:id` - Atualizar um produto (requer autenticação de marca)
- `DELETE /api/products/:id` - Eliminar um produto (requer autenticação de marca)
- `GET /api/products/search` - Pesquisar produtos

#### Marcas

- `GET /api/brands` - Listar marcas
- `GET /api/brands/:id` - Obter detalhes de uma marca
- `POST /api/brands` - Criar uma nova marca (requer autenticação)
- `PUT /api/brands/:id` - Atualizar uma marca (requer autenticação de marca)
- `GET /api/brands/dashboard` - Obter dados do dashboard da marca (requer autenticação de marca)

#### Encomendas

- `GET /api/orders` - Listar encomendas do utilizador (requer autenticação)
- `GET /api/orders/:id` - Obter detalhes de uma encomenda (requer autenticação)
- `POST /api/orders` - Criar uma nova encomenda (requer autenticação)
- `PATCH /api/orders/:id/status` - Atualizar estado de uma encomenda (requer autenticação de marca ou admin)
- `PATCH /api/orders/:id/cancel` - Cancelar uma encomenda (requer autenticação)

#### Subscrições

- `GET /api/subscriptions/current` - Obter subscrição atual (requer autenticação de marca)
- `PATCH /api/subscriptions/upgrade` - Atualizar nível de subscrição (requer autenticação de marca)
- `PATCH /api/subscriptions/renew` - Renovar subscrição (requer autenticação de marca)
- `PATCH /api/subscriptions/cancel` - Cancelar subscrição (requer autenticação de marca)

### API GraphQL

O Rota do Comércio também disponibiliza uma API GraphQL em `/api/graphql` que permite consultas mais flexíveis e eficientes.

Exemplos de queries:

```graphql
# Obter produtos com filtros
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

# Obter detalhes de uma marca com produtos
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

## Segurança

### Autenticação e Autorização

- **JWT**: Tokens JWT para autenticação
- **Roles**: Sistema de roles (ADMIN, BRAND, CUSTOMER)
- **Guards**: Guards NestJS para proteção de rotas
- **Middleware**: Middleware de autenticação e autorização

### Proteção de Dados

- **Encriptação**: Passwords encriptadas com bcrypt
- **HTTPS**: Todas as comunicações são encriptadas via HTTPS
- **Validação**: Validação rigorosa de inputs para prevenir injeções
- **Rate Limiting**: Limitação de requisições para prevenir ataques de força bruta
- **CORS**: Configuração adequada de CORS para prevenir ataques cross-site

## Níveis de Subscrição

### Básico

- Até 50 produtos
- 1 imagem por produto
- Funcionalidades essenciais
- Sem destaque na plataforma
- Comissão de 10% por venda

### Pro

- Até 200 produtos
- Até 5 imagens por produto
- Personalização da loja
- Analytics avançados
- Destaque de produtos na plataforma
- Comissão de 8% por venda

### Premium

- Produtos ilimitados
- Imagens ilimitadas por produto
- Personalização completa da loja
- Campanhas de marketing
- Taxas de envio personalizadas
- Atualizações em massa
- Comissão de 6% por venda

## Escalabilidade e Desempenho

### Estratégias de Escalabilidade

- **Horizontal Scaling**: Adição de mais instâncias para lidar com aumento de carga
- **Vertical Scaling**: Aumento de recursos para instâncias existentes
- **Microservices**: Arquitetura de microserviços para escalabilidade independente
- **Load Balancing**: Distribuição de carga entre múltiplas instâncias
- **Database Sharding**: Particionamento da base de dados para melhor desempenho

### Otimizações de Desempenho

- **Caching**: Redis para caching de dados frequentemente acedidos
- **CDN**: Utilização de CDN para conteúdo estático
- **Lazy Loading**: Carregamento preguiçoso de imagens e componentes
- **Code Splitting**: Divisão de código para carregamento mais rápido
- **Database Indexing**: Índices adequados para consultas frequentes

## Monitorização e Logging

### Monitorização

- **Prometheus**: Coleta de métricas
- **Grafana**: Visualização de métricas e dashboards
- **Alerting**: Alertas para situações críticas
- **Health Checks**: Verificações de saúde para todos os serviços

### Logging

- **ELK Stack**: Elasticsearch, Logstash, Kibana para gestão de logs
- **Structured Logging**: Logs estruturados para melhor análise
- **Log Levels**: Níveis de log adequados (DEBUG, INFO, WARN, ERROR)
- **Log Rotation**: Rotação de logs para gestão de espaço

## Integração com Transportadoras

### CTT

- Cálculo de custos de envio
- Geração de etiquetas de envio
- Tracking de encomendas
- Notificações de estado

### DPD

- Cálculo de custos de envio
- Geração de etiquetas de envio
- Tracking de encomendas
- Notificações de estado

### GLS

- Cálculo de custos de envio
- Geração de etiquetas de envio
- Tracking de encomendas
- Notificações de estado

## Integração com Pagamentos

### Multibanco

- Geração de referências
- Verificação de pagamentos
- Notificações de pagamento

### MB WAY

- Pagamentos via telemóvel
- Notificações de pagamento

### Cartão de Crédito

- Processamento seguro de pagamentos
- Tokenização de cartões
- Verificação 3D Secure

## Deployment

### Ambiente de Desenvolvimento

- Docker Compose para ambiente local
- Scripts de seed para dados de teste
- Hot reloading para desenvolvimento rápido

### Ambiente de Produção

- Kubernetes para orquestração
- CI/CD via GitHub Actions
- Blue/Green deployment para zero downtime
- Backups automáticos da base de dados

## Manutenção

### Backups

- Backups diários da base de dados
- Retenção de backups por 30 dias
- Procedimentos de restauro documentados

### Atualizações

- Janelas de manutenção programadas
- Procedimentos de rollback
- Testes automatizados para validar atualizações

### Troubleshooting

- Logs centralizados para diagnóstico
- Dashboards de monitorização
- Procedimentos de escalação

## Conclusão

Esta documentação técnica fornece uma visão geral da arquitetura, implementação e manutenção do Rota do Comércio. Para informações mais detalhadas sobre componentes específicos, consulte a documentação da API e os manuais de utilizador.
