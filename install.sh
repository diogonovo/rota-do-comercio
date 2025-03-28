#!/bin/bash

# Script de instalação para o marketplace Rota do Comércio
# Este script configura o ambiente de produção completo

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para exibir mensagens
print_message() {
  echo -e "${GREEN}[Rota do Comércio]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[Aviso]${NC} $1"
}

print_error() {
  echo -e "${RED}[Erro]${NC} $1"
}

# Verificar se o script está sendo executado como root
if [ "$EUID" -ne 0 ]; then
  print_error "Este script deve ser executado como root (sudo)."
  exit 1
fi

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
  print_message "Docker não encontrado. A instalar..."
  
  # Instalar Docker
  apt-get update
  apt-get install -y apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
  add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  apt-get update
  apt-get install -y docker-ce
  
  # Iniciar e habilitar o serviço Docker
  systemctl start docker
  systemctl enable docker
  
  print_message "Docker instalado com sucesso!"
else
  print_message "Docker já está instalado."
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
  print_message "Docker Compose não encontrado. A instalar..."
  
  # Instalar Docker Compose
  curl -L "https://github.com/docker/compose/releases/download/v2.15.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  
  print_message "Docker Compose instalado com sucesso!"
else
  print_message "Docker Compose já está instalado."
fi

# Criar diretórios necessários
print_message "A criar diretórios necessários..."
mkdir -p nginx/conf.d nginx/ssl nginx/logs prometheus

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
  print_message "Arquivo .env não encontrado. A criar um modelo..."
  
  cat > .env << EOL
# Configurações da Base de Dados
POSTGRES_USER=rota_user
POSTGRES_PASSWORD=senha_segura_aqui
POSTGRES_DB=rota_do_comercio

# Configurações de Autenticação
JWT_SECRET=chave_secreta_jwt_aqui

# Configurações de Email
SMTP_HOST=smtp.exemplo.com
SMTP_PORT=587
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
EMAIL_FROM=noreply@rotadocomercio.pt

# Configurações do Grafana
GRAFANA_PASSWORD=senha_admin_grafana
EOL

  print_warning "Arquivo .env criado. Por favor, edite-o com suas configurações antes de continuar."
  print_warning "Execute o comando: nano .env"
  exit 1
fi

# Verificar se os diretórios do projeto existem
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
  print_error "Diretórios do projeto não encontrados. Certifique-se de estar no diretório raiz do projeto."
  exit 1
fi

# Verificar se os Dockerfiles existem
if [ ! -f "frontend/Dockerfile.prod" ] || [ ! -f "backend/Dockerfile.prod" ]; then
  print_error "Dockerfiles não encontrados. Certifique-se de que os arquivos Dockerfile.prod existem nos diretórios frontend e backend."
  exit 1
fi

# Verificar se o docker-compose.prod.yml existe
if [ ! -f "docker-compose.prod.yml" ]; then
  print_error "Arquivo docker-compose.prod.yml não encontrado."
  exit 1
fi

# Iniciar os serviços
print_message "A iniciar os serviços do Rota do Comércio..."
docker-compose -f docker-compose.prod.yml up -d

# Verificar se os serviços foram iniciados corretamente
if [ $? -eq 0 ]; then
  print_message "Todos os serviços foram iniciados com sucesso!"
  
  # Obter o IP do servidor
  SERVER_IP=$(hostname -I | awk '{print $1}')
  
  print_message "O marketplace Rota do Comércio está disponível em:"
  echo -e "${GREEN}Frontend:${NC} http://$SERVER_IP"
  echo -e "${GREEN}API:${NC} http://$SERVER_IP:3001/api"
  echo -e "${GREEN}Documentação da API:${NC} http://$SERVER_IP:3001/api-docs"
  echo -e "${GREEN}Grafana:${NC} http://$SERVER_IP:3002 (admin/senha definida no .env)"
  echo -e "${GREEN}Prometheus:${NC} http://$SERVER_IP:9090"
  
  print_message "Para configurar os domínios, edite o arquivo nginx/conf.d/default.conf e reinicie o serviço nginx:"
  echo "docker-compose -f docker-compose.prod.yml restart nginx"
  
  print_message "Para verificar os logs dos serviços:"
  echo "docker-compose -f docker-compose.prod.yml logs -f [serviço]"
  
  print_message "Para parar todos os serviços:"
  echo "docker-compose -f docker-compose.prod.yml down"
else
  print_error "Ocorreu um erro ao iniciar os serviços. Verifique os logs para mais detalhes:"
  echo "docker-compose -f docker-compose.prod.yml logs"
fi
