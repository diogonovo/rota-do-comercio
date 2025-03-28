# README - Rota do Comércio

## Visão Geral

Rota do Comércio é um marketplace completo destinado a marcas pequenas e independentes em Portugal, onde cada marca pode criar a sua própria loja personalizada dentro da plataforma. As marcas têm acesso a diferentes funcionalidades e níveis de visibilidade consoante o pack de serviços que subscrevem (Básico, Pro, Premium).

## Características Principais

- **Lojas Personalizadas**: Cada marca pode personalizar a sua própria loja
- **Níveis de Subscrição**: Básico, Pro e Premium com diferentes funcionalidades
- **Gestão de Produtos**: Sistema completo de gestão de produtos com variantes e imagens
- **Gestão de Encomendas**: Processamento completo de encomendas
- **Integração com Transportadoras**: CTT, DPD, GLS
- **Pagamentos**: Multibanco, MB WAY, Cartão de Crédito
- **Painel de Administração**: Gestão completa do marketplace
- **Painel de Marca**: Gestão da loja, produtos, encomendas e análises
- **Design Premium**: Interface limpa e moderna para utilizadores finais

## Requisitos do Sistema

- **Sistema Operativo**: Ubuntu 20.04 LTS ou superior
- **Docker**: v20.x ou superior
- **Docker Compose**: v2.x ou superior
- **Mínimo de 4GB de RAM**
- **Mínimo de 20GB de espaço em disco**

## Instalação Rápida

1. Clone o repositório:
   ```bash
   git clone https://github.com/rotadocomercio/marketplace.git
   cd marketplace
   ```

2. Execute o script de instalação:
   ```bash
   sudo ./install.sh
   ```

3. Siga as instruções no ecrã para configurar o ambiente.

## Estrutura do Projeto

```
rota-do-comercio/
├── backend/               # API NestJS
├── frontend/              # Aplicação Next.js
├── database/              # Esquema e migrações Prisma
├── docs/                  # Documentação
├── nginx/                 # Configuração do Nginx
├── prometheus/            # Configuração do Prometheus
├── docker-compose.prod.yml # Configuração Docker para produção
└── install.sh             # Script de instalação
```

## Documentação

A documentação completa está disponível na pasta `docs/`:

- [Documentação Técnica](docs/documentacao_tecnica.md)
- [Manual do Utilizador](docs/manual_utilizador.md)
- [Documentação da API](docs/documentacao_api.md)
- [Guia de Instalação e Configuração](docs/guia_instalacao.md)

## Níveis de Subscrição

### Básico
- Até 50 produtos
- 1 imagem por produto
- Funcionalidades essenciais
- Comissão de 10% por venda

### Pro
- Até 200 produtos
- Até 5 imagens por produto
- Personalização da loja
- Analytics avançados
- Destaque de produtos
- Comissão de 8% por venda

### Premium
- Produtos ilimitados
- Imagens ilimitadas
- Personalização completa da loja
- Campanhas de marketing
- Taxas de envio personalizadas
- Comissão de 6% por venda

## Desenvolvimento

### Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:
   ```bash
   git clone https://github.com/rotadocomercio/marketplace.git
   cd marketplace
   ```

2. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com as suas configurações
   ```

3. Inicie o ambiente de desenvolvimento:
   ```bash
   docker-compose up -d
   ```

4. Acesse o frontend em `http://localhost:3000` e o backend em `http://localhost:3001`.

### Executar Testes

```bash
# Testes do backend
cd backend
npm test

# Testes do frontend
cd frontend
npm test
```

## Suporte

Para suporte técnico, entre em contacto através do email suporte@rotadocomercio.pt ou visite o nosso [Centro de Ajuda](https://www.rotadocomercio.pt/ajuda).

## Licença

Este projeto é propriedade da Rota do Comércio e está protegido por direitos de autor. Todos os direitos reservados.
