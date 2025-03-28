# Guia de Instalação e Configuração - Rota do Comércio

Este guia fornece instruções detalhadas para instalar, configurar e executar o marketplace Rota do Comércio em ambientes de desenvolvimento e produção.

## Requisitos do Sistema

### Hardware Recomendado
- **CPU**: 4 cores ou mais
- **RAM**: 8GB mínimo, 16GB recomendado
- **Armazenamento**: 20GB mínimo para o código e dependências, mais espaço adicional para dados e uploads

### Software Necessário
- **Sistema Operativo**: Ubuntu 20.04 LTS ou superior
- **Node.js**: v16.x ou superior
- **PostgreSQL**: v14.x ou superior
- **Redis**: v6.x ou superior
- **Docker**: v20.x ou superior (opcional, para deployment com containers)
- **Kubernetes**: v1.22 ou superior (opcional, para deployment em cluster)

## Instalação em Ambiente de Desenvolvimento

### 1. Clonar o Repositório

```bash
git clone https://github.com/rotadocomercio/marketplace.git
cd marketplace
```

### 2. Configurar Variáveis de Ambiente

Crie um ficheiro `.env` na raiz do projeto com as seguintes variáveis:

```
# Configurações da Base de Dados
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rota_do_comercio?schema=public
REDIS_URL=redis://localhost:6379

# Configurações da Aplicação
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000/api
FRONTEND_URL=http://localhost:3000

# Configurações de Autenticação
JWT_SECRET=seu_segredo_jwt_aqui
JWT_EXPIRATION=1d

# Configurações de Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880 # 5MB

# Configurações de Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
EMAIL_FROM=noreply@rotadocomercio.pt

# Configurações de Pagamento
MULTIBANCO_API_KEY=sua_chave_api
MBWAY_API_KEY=sua_chave_api
STRIPE_API_KEY=sua_chave_api
```

### 3. Instalar Dependências

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 4. Configurar a Base de Dados

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 5. Iniciar o Servidor de Desenvolvimento

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em:
- Frontend: http://localhost:3000
- API: http://localhost:3001/api
- GraphQL: http://localhost:3001/graphql
- Documentação da API: http://localhost:3001/api-docs

## Instalação em Ambiente de Produção

### 1. Utilizando Docker Compose

#### Clonar o Repositório

```bash
git clone https://github.com/rotadocomercio/marketplace.git
cd marketplace
```

#### Configurar Variáveis de Ambiente

Crie um ficheiro `.env.production` na raiz do projeto com as configurações de produção.

#### Construir e Iniciar os Containers

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Utilizando Kubernetes

#### Pré-requisitos
- Cluster Kubernetes configurado
- kubectl instalado e configurado
- Helm instalado

#### Instalar com Helm

```bash
helm repo add rotadocomercio https://charts.rotadocomercio.pt
helm repo update
helm install rotadocomercio rotadocomercio/marketplace --values values.yaml
```

Exemplo de ficheiro `values.yaml`:

```yaml
global:
  environment: production
  domain: rotadocomercio.pt

database:
  host: postgres-host
  port: 5432
  username: postgres
  password: postgres_password
  database: rota_do_comercio

redis:
  host: redis-host
  port: 6379

frontend:
  replicas: 2
  resources:
    limits:
      cpu: 1
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi

backend:
  replicas: 3
  resources:
    limits:
      cpu: 2
      memory: 2Gi
    requests:
      cpu: 1
      memory: 1Gi

ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: rotadocomercio.pt
      paths:
        - path: /
          pathType: Prefix
    - host: api.rotadocomercio.pt
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: rotadocomercio-tls
      hosts:
        - rotadocomercio.pt
        - api.rotadocomercio.pt
```

## Configuração Avançada

### Configuração do Nginx

Exemplo de configuração do Nginx para o frontend:

```nginx
server {
    listen 80;
    server_name rotadocomercio.pt www.rotadocomercio.pt;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Exemplo de configuração do Nginx para o backend:

```nginx
server {
    listen 80;
    server_name api.rotadocomercio.pt;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Configuração do SSL com Let's Encrypt

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d rotadocomercio.pt -d www.rotadocomercio.pt -d api.rotadocomercio.pt
```

### Configuração do PostgreSQL

```bash
# Criar utilizador e base de dados
sudo -u postgres psql
CREATE USER rota_user WITH PASSWORD 'senha_segura';
CREATE DATABASE rota_do_comercio;
GRANT ALL PRIVILEGES ON DATABASE rota_do_comercio TO rota_user;
\q

# Configurar PostgreSQL para permitir conexões remotas
sudo nano /etc/postgresql/14/main/postgresql.conf
# Alterar listen_addresses = 'localhost' para listen_addresses = '*'

sudo nano /etc/postgresql/14/main/pg_hba.conf
# Adicionar: host all all 0.0.0.0/0 md5

sudo systemctl restart postgresql
```

### Configuração do Redis

```bash
# Instalar Redis
sudo apt-get update
sudo apt-get install redis-server

# Configurar Redis para iniciar no boot
sudo systemctl enable redis-server

# Configurar Redis para permitir conexões remotas (apenas em ambiente seguro)
sudo nano /etc/redis/redis.conf
# Alterar bind 127.0.0.1 ::1 para bind 0.0.0.0
# Definir uma senha: requirepass senha_segura

sudo systemctl restart redis-server
```

## Backup e Restauro

### Backup da Base de Dados

```bash
# Backup completo
pg_dump -U postgres -d rota_do_comercio -f backup_$(date +%Y%m%d).sql

# Backup comprimido
pg_dump -U postgres -d rota_do_comercio | gzip > backup_$(date +%Y%m%d).sql.gz

# Backup automático diário
echo "0 2 * * * pg_dump -U postgres -d rota_do_comercio | gzip > /backups/backup_\$(date +\%Y\%m\%d).sql.gz" | sudo tee -a /etc/crontab
```

### Restauro da Base de Dados

```bash
# Restaurar de um backup
psql -U postgres -d rota_do_comercio -f backup_20250328.sql

# Restaurar de um backup comprimido
gunzip -c backup_20250328.sql.gz | psql -U postgres -d rota_do_comercio
```

### Backup de Ficheiros de Upload

```bash
# Backup dos ficheiros de upload
tar -czf uploads_$(date +%Y%m%d).tar.gz /caminho/para/uploads

# Backup automático semanal
echo "0 3 * * 0 tar -czf /backups/uploads_\$(date +\%Y\%m\%d).tar.gz /caminho/para/uploads" | sudo tee -a /etc/crontab
```

## Monitorização

### Configuração do Prometheus

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'rotadocomercio-backend'
    static_configs:
      - targets: ['backend:3001']
  
  - job_name: 'rotadocomercio-frontend'
    static_configs:
      - targets: ['frontend:3000']
  
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
  
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

### Configuração do Grafana

1. Instalar Grafana
2. Adicionar Prometheus como fonte de dados
3. Importar dashboards pré-configurados:
   - ID 10991 para Node.js
   - ID 9628 para PostgreSQL
   - ID 763 para Redis

## Resolução de Problemas

### Problemas Comuns e Soluções

#### Erro de Conexão com a Base de Dados

**Problema**: A aplicação não consegue conectar-se à base de dados PostgreSQL.

**Solução**:
1. Verificar se o PostgreSQL está em execução: `sudo systemctl status postgresql`
2. Verificar as credenciais no ficheiro `.env`
3. Verificar as permissões do utilizador da base de dados
4. Verificar as configurações de firewall: `sudo ufw status`

#### Erro de Conexão com o Redis

**Problema**: A aplicação não consegue conectar-se ao Redis.

**Solução**:
1. Verificar se o Redis está em execução: `sudo systemctl status redis-server`
2. Verificar a URL do Redis no ficheiro `.env`
3. Verificar as configurações de firewall

#### Erros de Permissão em Uploads

**Problema**: A aplicação não consegue fazer upload de ficheiros.

**Solução**:
1. Verificar as permissões da pasta de uploads: `ls -la /caminho/para/uploads`
2. Ajustar as permissões: `sudo chown -R www-data:www-data /caminho/para/uploads`
3. Verificar o limite de tamanho de upload no `.env` e no `nginx.conf`

#### Problemas de Performance

**Problema**: A aplicação está lenta ou não responde.

**Solução**:
1. Verificar a utilização de recursos: `top`, `htop`, `free -m`
2. Verificar os logs da aplicação: `journalctl -u rotadocomercio-backend`
3. Aumentar os recursos alocados (CPU, RAM)
4. Otimizar consultas à base de dados
5. Implementar ou ajustar o caching

## Atualizações

### Atualização do Sistema

```bash
# Backup antes da atualização
pg_dump -U postgres -d rota_do_comercio | gzip > backup_pre_update.sql.gz

# Parar os serviços
sudo systemctl stop rotadocomercio-backend
sudo systemctl stop rotadocomercio-frontend

# Atualizar o código
cd /caminho/para/marketplace
git pull

# Instalar dependências
cd backend
npm install
cd ../frontend
npm install

# Executar migrações
cd ../backend
npx prisma migrate deploy

# Reiniciar os serviços
sudo systemctl start rotadocomercio-backend
sudo systemctl start rotadocomercio-frontend
```

### Rollback em Caso de Problemas

```bash
# Reverter para a versão anterior do código
cd /caminho/para/marketplace
git reset --hard HEAD~1

# Restaurar a base de dados
gunzip -c backup_pre_update.sql.gz | psql -U postgres -d rota_do_comercio

# Reiniciar os serviços
sudo systemctl restart rotadocomercio-backend
sudo systemctl restart rotadocomercio-frontend
```

## Conclusão

Este guia fornece as instruções básicas para instalar, configurar e manter o marketplace Rota do Comércio. Para suporte adicional, consulte a documentação técnica completa ou entre em contacto com a equipa de suporte.

Para mais informações, consulte:
- [Documentação Técnica](./documentacao_tecnica.md)
- [Manual do Utilizador](./manual_utilizador.md)
- [Documentação da API](./documentacao_api.md)
