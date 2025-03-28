#!/usr/bin/env python3
from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.compute import Server
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.inmemory import Redis
from diagrams.onprem.search import Elasticsearch
from diagrams.onprem.queue import RabbitMQ
from diagrams.onprem.network import Nginx
from diagrams.aws.storage import S3
from diagrams.programming.framework import React
from diagrams.programming.language import TypeScript, NodeJS
from diagrams.onprem.container import Docker
from diagrams.k8s.compute import Pod
from diagrams.k8s.network import Service
from diagrams.onprem.client import Users, Client
from diagrams.onprem.network import Internet
from diagrams.aws.network import CloudFront

# Configuração do diagrama
graph_attr = {
    "fontsize": "30",
    "bgcolor": "white",
    "rankdir": "TB",
    "splines": "spline",
    "pad": "0.5",
    "nodesep": "0.60",
    "ranksep": "0.75",
}

# Criar o diagrama principal
with Diagram("Arquitetura Rota do Comércio", show=False, filename="arquitetura_sistema", outformat="png", graph_attr=graph_attr):
    
    # Utilizadores
    clientes = Users("Clientes")
    marcas = Users("Marcas")
    admin = Users("Administrador")
    
    # Internet
    internet = Internet("Internet")
    
    # CDN
    with Cluster("CDN"):
        cdn = CloudFront("Cloudflare")
    
    # Frontend
    with Cluster("Frontend"):
        frontend = React("Next.js Frontend")
        
    # API Gateway
    with Cluster("API Gateway"):
        api_gateway = Nginx("API Gateway")
    
    # Microserviços
    with Cluster("Microserviços"):
        with Cluster("Serviços de Marketplace"):
            produtos = Pod("Serviço de Produtos")
            encomendas = Pod("Serviço de Encomendas")
            lojas = Pod("Serviço de Lojas")
        
        with Cluster("Serviços de Utilizadores"):
            autenticacao = Pod("Serviço de Autenticação")
            perfis = Pod("Serviço de Perfis")
            subscricoes = Pod("Serviço de Subscrições")
        
        with Cluster("Serviços de Pagamento"):
            pagamentos = Pod("Serviço de Pagamentos")
            comissoes = Pod("Serviço de Comissões")
        
        with Cluster("Serviços de Transportadoras"):
            envios = Pod("Serviço de Envios")
            rastreamento = Pod("Serviço de Rastreamento")
    
    # Base de Dados
    with Cluster("Base de Dados"):
        postgres = PostgreSQL("PostgreSQL")
        redis = Redis("Redis")
        elastic = Elasticsearch("Elasticsearch")
    
    # Mensagens
    with Cluster("Mensagens"):
        rabbitmq = RabbitMQ("RabbitMQ")
    
    # Armazenamento
    with Cluster("Armazenamento"):
        s3 = S3("AWS S3")
    
    # Conexões
    clientes >> internet >> cdn >> frontend
    marcas >> internet >> cdn >> frontend
    admin >> internet >> cdn >> frontend
    
    frontend >> api_gateway
    
    api_gateway >> produtos
    api_gateway >> encomendas
    api_gateway >> lojas
    api_gateway >> autenticacao
    api_gateway >> perfis
    api_gateway >> subscricoes
    api_gateway >> pagamentos
    api_gateway >> comissoes
    api_gateway >> envios
    api_gateway >> rastreamento
    
    produtos >> postgres
    encomendas >> postgres
    lojas >> postgres
    autenticacao >> postgres
    perfis >> postgres
    subscricoes >> postgres
    pagamentos >> postgres
    comissoes >> postgres
    envios >> postgres
    rastreamento >> postgres
    
    produtos >> redis
    encomendas >> redis
    autenticacao >> redis
    
    produtos >> elastic
    
    produtos >> rabbitmq
    encomendas >> rabbitmq
    pagamentos >> rabbitmq
    envios >> rabbitmq
    
    produtos >> s3
    lojas >> s3
