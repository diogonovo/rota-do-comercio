import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export default function DashboardMarcaPage() {
  // Dados de exemplo para a marca
  const brand = {
    id: 1,
    name: 'Lã Portuguesa',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    banner: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Produtos de lã merino de alta qualidade, produzidos artesanalmente em Portugal.',
    subscriptionLevel: 'PREMIUM',
    subscriptionExpiry: '15 de abril de 2026',
    productCount: 24,
    orderCount: 156,
    revenue: 12450.75,
    balance: 9876.50,
    stats: {
      views: 2345,
      sales: 156,
      conversion: 6.65,
      averageOrder: 79.81
    }
  };

  // Dados de exemplo para produtos
  const products = [
    {
      id: 1,
      name: 'Camisola de Lã Merino',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      stock: 15,
      sales: 42,
      status: 'active',
      isNew: true,
      isFeatured: true,
      rating: 4.8
    },
    {
      id: 6,
      name: 'Manta de Linho Natural',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      stock: 8,
      sales: 27,
      status: 'active',
      rating: 4.4
    },
    {
      id: 9,
      name: 'Cachecol de Lã Merino',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      stock: 22,
      sales: 31,
      status: 'active',
      rating: 4.6
    },
    {
      id: 10,
      name: 'Gorro de Lã Artesanal',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      stock: 5,
      sales: 18,
      status: 'low_stock',
      discount: 10,
      rating: 4.5
    },
    {
      id: 12,
      name: 'Luvas de Lã Merino',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      stock: 0,
      sales: 15,
      status: 'out_of_stock',
      isNew: true,
      rating: 4.7
    }
  ];

  // Dados de exemplo para encomendas recentes
  const recentOrders = [
    {
      id: 'ORD-12345',
      date: '28 de março de 2025',
      customer: 'João Silva',
      total: 79.99,
      status: 'pending',
      items: 1
    },
    {
      id: 'ORD-12344',
      date: '27 de março de 2025',
      customer: 'Maria Santos',
      total: 119.98,
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-12343',
      date: '26 de março de 2025',
      customer: 'António Ferreira',
      total: 34.99,
      status: 'shipped',
      items: 1
    },
    {
      id: 'ORD-12342',
      date: '25 de março de 2025',
      customer: 'Sofia Costa',
      total: 89.98,
      status: 'delivered',
      items: 3
    },
    {
      id: 'ORD-12341',
      date: '24 de março de 2025',
      customer: 'Pedro Oliveira',
      total: 59.99,
      status: 'delivered',
      items: 1
    }
  ];

  // Formatar preço
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  // Estado para controlar a tab ativa
  const [activeTab, setActiveTab] = React.useState('dashboard');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho da Marca */}
        <div className="mb-8 rounded-lg bg-card shadow-sm">
          <div className="relative h-40 w-full overflow-hidden rounded-t-lg md:h-60">
            <img 
              src={brand.banner} 
              alt={`${brand.name} Banner`} 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <Avatar 
                src={brand.logo} 
                alt={brand.name}
                size="xl"
                className="-mt-10 border-4 border-background sm:-mt-16"
              />
              
              <div className="mt-4 sm:ml-6 sm:mt-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold md:text-3xl">{brand.name}</h1>
                  <Badge variant="premium">Subscrição Premium</Badge>
                </div>
                <p className="text-muted-foreground">{brand.description}</p>
              </div>
              
              <div className="mt-4 flex flex-grow justify-start sm:mt-0 sm:justify-end">
                <Button variant="outline" size="sm" className="mr-2">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver Loja
                </Button>
                <Button variant="primary" size="sm">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Definições
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação por Tabs */}
        <div className="mb-8 flex border-b border-border">
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'dashboard' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('products')}
          >
            Produtos
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('orders')}
          >
            Encomendas
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'analytics' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Análises
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('settings')}
          >
            Definições
          </button>
        </div>

        {/* Conteúdo da Tab Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Cartões de Estatísticas */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Produtos</p>
                      <h3 className="mt-1 text-2xl font-bold">{brand.productCount}</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center text-success">
                      <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      12%
                    </span>
                    <span className="ml-2">desde o mês passado</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Encomendas</p>
                      <h3 className="mt-1 text-2xl font-bold">{brand.orderCount}</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center text-success">
                      <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      8%
                    </span>
                    <span className="ml-2">desde o mês passado</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Receita</p>
                      <h3 className="mt-1 text-2xl font-bold">{formatPrice(brand.revenue)}</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center text-success">
                      <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      15%
                    </span>
                    <span className="ml-2">desde o mês passado</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Saldo</p>
                      <h3 className="mt-1 text-2xl font-bold">{formatPrice(brand.balance)}</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center text-success">
                      <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      10%
                    </span>
                    <span className="ml-2">desde o mês passado</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Encomendas Recentes */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Encomendas Recentes</CardTitle>
                    <CardDescription>As últimas 5 encomendas recebidas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-base font-medium">{order.id}</h3>
                              <Badge 
                                variant={
                                  order.status === 'pending' ? 'outline' : 
                                  order.status === 'processing' ? 'default' : 
                                  order.status === 'shipped' ? 'secondary' : 
                                  'success'
                                } 
                                className="ml-2"
                              >
                                {order.status === 'pending' ? 'Pendente' : 
                                 order.status === 'processing' ? 'Em Processamento' : 
                                 order.status === 'shipped' ? 'Enviada' : 
                                 'Entregue'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.date} • {order.customer} • {order.items} {order.items === 1 ? 'item' : 'itens'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-medium">{formatPrice(order.total)}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline">
                      Ver Todas as Encomendas
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Informações da Subscrição */}
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Subscrição</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Plano Atual</p>
                      <div className="flex items-center">
                        <Badge variant="premium">Premium</Badge>
                        <span className="ml-2 text-muted-foreground">Todas as funcionalidades</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Validade</p>
                      <p className="text-muted-foreground">{brand.subscriptionExpiry}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Funcionalidades</p>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center">
                          <svg className="mr-2 h-4 w-4 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Produtos ilimitados
                        </li>
                        <li className="flex items-center">
                          <svg className="mr-2 h-4 w-4 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Imagens ilimitadas por produto
                        </li>
                        <li className="flex items-center">
                          <svg className="mr-2 h-4 w-4 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Personalização completa da loja
                        </li>
                        <li className="flex items-center">
                          <svg className="mr-2 h-4 w-4 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Campanhas de marketing
                        </li>
                        <li className="flex items-center">
                          <svg className="mr-2 h-4 w-4 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Taxas de envio personalizadas
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline">
                      Gerir Subscrição
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas da Loja</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Visualizações</span>
                      <span className="font-medium">{brand.stats.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Vendas</span>
                      <span className="font-medium">{brand.stats.sales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
                      <span className="font-medium">{brand.stats.conversion}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valor Médio de Encomenda</span>
                      <span className="font-medium">{formatPrice(brand.stats.averageOrder)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline">
                      Ver Análises Detalhadas
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da Tab Produtos */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold">Produtos</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input 
                    type="text" 
                    placeholder="Pesquisar produtos..." 
                    className="w-full pl-10 sm:w-64"
                  />
                </div>
                <Button variant="primary">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Adicionar Produto
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-6 py-4 text-left text-sm font-medium">Produto</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Stock</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Preço</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Vendas</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Estado</th>
                        <th className="px-6 py-4 text-right text-sm font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-border last:border-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="font-medium">{product.name}</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span className="flex items-center">
                                    <svg className="mr-1 h-3 w-3 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {product.rating}
                                  </span>
                                  {product.isNew && (
                                    <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                      Novo
                                    </span>
                                  )}
                                  {product.isFeatured && (
                                    <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                                      Destaque
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              product.stock === 0 
                                ? 'bg-destructive/10 text-destructive' 
                                : product.stock < 10 
                                  ? 'bg-warning/10 text-warning' 
                                  : 'bg-success/10 text-success'
                            }`}>
                              {product.stock === 0 ? 'Sem stock' : `${product.stock} unidades`}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {product.discount ? (
                              <div>
                                <span className="font-medium">
                                  {formatPrice(product.price * (1 - product.discount / 100))}
                                </span>
                                <span className="ml-2 text-sm text-muted-foreground line-through">
                                  {formatPrice(product.price)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-medium">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span>{product.sales} vendas</span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={
                                product.status === 'active' ? 'success' : 
                                product.status === 'low_stock' ? 'warning' : 
                                'destructive'
                              }
                            >
                              {product.status === 'active' ? 'Ativo' : 
                               product.status === 'low_stock' ? 'Stock Baixo' : 
                               'Sem Stock'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border p-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando 1-5 de 24 produtos
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm">
                    Próximo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Conteúdo da Tab Encomendas */}
        {activeTab === 'orders' && (
          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold">Encomendas</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input 
                    type="text" 
                    placeholder="Pesquisar encomendas..." 
                    className="w-full pl-10 sm:w-64"
                  />
                </div>
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="all">Todos os estados</option>
                  <option value="pending">Pendente</option>
                  <option value="processing">Em Processamento</option>
                  <option value="shipped">Enviada</option>
                  <option value="delivered">Entregue</option>
                </select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-6 py-4 text-left text-sm font-medium">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Data</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Cliente</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Total</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Estado</th>
                        <th className="px-6 py-4 text-right text-sm font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border last:border-0">
                          <td className="px-6 py-4">
                            <span className="font-medium">{order.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span>{order.date}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span>{order.customer}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium">{formatPrice(order.total)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={
                                order.status === 'pending' ? 'outline' : 
                                order.status === 'processing' ? 'default' : 
                                order.status === 'shipped' ? 'secondary' : 
                                'success'
                              }
                            >
                              {order.status === 'pending' ? 'Pendente' : 
                               order.status === 'processing' ? 'Em Processamento' : 
                               order.status === 'shipped' ? 'Enviada' : 
                               'Entregue'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              Ver Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border p-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando 1-5 de 156 encomendas
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm">
                    Próximo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Conteúdo da Tab Análises */}
        {activeTab === 'analytics' && (
          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold">Análises</h2>
              <div className="flex space-x-2">
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="7days">Últimos 7 dias</option>
                  <option value="30days">Últimos 30 dias</option>
                  <option value="90days">Últimos 90 dias</option>
                  <option value="year">Este ano</option>
                </select>
                <Button variant="outline">
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas</CardTitle>
                  <CardDescription>Vendas nos últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de vendas seria exibido aqui</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produtos Mais Vendidos</CardTitle>
                  <CardDescription>Top 5 produtos mais vendidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 5).sort((a, b) => b.sales - a.sales).map((product, index) => (
                      <div key={product.id} className="flex items-center">
                        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                          {index + 1}
                        </div>
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} vendas</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Origem dos Clientes</CardTitle>
                  <CardDescription>De onde vêm os seus clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de origem dos clientes seria exibido aqui</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dispositivos</CardTitle>
                  <CardDescription>Dispositivos utilizados pelos clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de dispositivos seria exibido aqui</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Conteúdo da Tab Definições */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Informações da Marca</CardTitle>
                  <CardDescription>Atualize as informações da sua marca</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="brandName" className="mb-2 block text-sm font-medium">
                        Nome da Marca
                      </label>
                      <Input 
                        id="brandName" 
                        type="text" 
                        defaultValue={brand.name}
                      />
                    </div>

                    <div>
                      <label htmlFor="brandDescription" className="mb-2 block text-sm font-medium">
                        Descrição
                      </label>
                      <textarea
                        id="brandDescription"
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue={brand.description}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="brandLogo" className="mb-2 block text-sm font-medium">
                          Logotipo
                        </label>
                        <div className="flex items-center">
                          <img 
                            src={brand.logo} 
                            alt={brand.name} 
                            className="mr-4 h-12 w-12 rounded-full object-cover"
                          />
                          <Button variant="outline" size="sm">
                            Alterar
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="brandBanner" className="mb-2 block text-sm font-medium">
                          Banner
                        </label>
                        <div className="flex items-center">
                          <div className="mr-4 h-12 w-24 overflow-hidden rounded-md">
                            <img 
                              src={brand.banner} 
                              alt={`${brand.name} Banner`} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            Alterar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="brandWebsite" className="mb-2 block text-sm font-medium">
                        Website (opcional)
                      </label>
                      <Input 
                        id="brandWebsite" 
                        type="url" 
                        placeholder="https://www.exemplo.pt"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label htmlFor="brandInstagram" className="mb-2 block text-sm font-medium">
                          Instagram (opcional)
                        </label>
                        <Input 
                          id="brandInstagram" 
                          type="text" 
                          placeholder="@suamarca"
                        />
                      </div>
                      <div>
                        <label htmlFor="brandFacebook" className="mb-2 block text-sm font-medium">
                          Facebook (opcional)
                        </label>
                        <Input 
                          id="brandFacebook" 
                          type="text" 
                          placeholder="facebook.com/suamarca"
                        />
                      </div>
                      <div>
                        <label htmlFor="brandTwitter" className="mb-2 block text-sm font-medium">
                          Twitter (opcional)
                        </label>
                        <Input 
                          id="brandTwitter" 
                          type="text" 
                          placeholder="@suamarca"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="primary">
                    Guardar Alterações
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personalização da Loja</CardTitle>
                  <CardDescription>Personalize a aparência da sua loja</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="storeTheme" className="mb-2 block text-sm font-medium">
                        Tema da Loja
                      </label>
                      <select
                        id="storeTheme"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="default">Padrão</option>
                        <option value="minimal">Minimalista</option>
                        <option value="bold">Arrojado</option>
                        <option value="elegant">Elegante</option>
                        <option value="vintage">Vintage</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="primaryColor" className="mb-2 block text-sm font-medium">
                        Cor Principal
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          id="primaryColor"
                          defaultValue="#7C3AED"
                          className="h-10 w-10 rounded-md border border-input"
                        />
                        <Input 
                          type="text" 
                          defaultValue="#7C3AED" 
                          className="ml-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="accentColor" className="mb-2 block text-sm font-medium">
                        Cor de Destaque
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          id="accentColor"
                          defaultValue="#F59E0B"
                          className="h-10 w-10 rounded-md border border-input"
                        />
                        <Input 
                          type="text" 
                          defaultValue="#F59E0B" 
                          className="ml-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fontFamily" className="mb-2 block text-sm font-medium">
                        Fonte
                      </label>
                      <select
                        id="fontFamily"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="inter">Inter</option>
                        <option value="roboto">Roboto</option>
                        <option value="opensans">Open Sans</option>
                        <option value="montserrat">Montserrat</option>
                        <option value="poppins">Poppins</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Pré-visualizar
                  </Button>
                  <Button variant="primary">
                    Guardar Alterações
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Métodos de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="mr-2 h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="white"/>
                        <path d="M10 16C10 14.9 10.9 14 12 14H20C21.1 14 22 14.9 22 16V20C22 21.1 21.1 22 20 22H12C10.9 22 10 21.1 10 20V16Z" fill="#A6A6A6"/>
                        <path d="M10 12C10 10.9 10.9 10 12 10H20C21.1 10 22 10.9 22 12V16C22 17.1 21.1 18 20 18H12C10.9 18 10 17.1 10 16V12Z" fill="#FFFFFF"/>
                        <path d="M12 14H11V12H12V14ZM13 14H12V12H13V14ZM14 14H13V12H14V14ZM15 14H14V12H15V14ZM16 14H15V12H16V14ZM17 14H16V12H17V14ZM18 14H17V12H18V14ZM19 14H18V12H19V14ZM20 14H19V12H20V14ZM21 14H20V12H21V14Z" fill="#A6A6A6"/>
                      </svg>
                      <span className="font-medium">Multibanco</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="multibanco"
                        defaultChecked
                      />
                      <label
                        htmlFor="multibanco"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="mr-2 h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="white"/>
                        <path d="M10 10H22V22H10V10Z" fill="#00A0E4"/>
                        <path d="M16 12C15.2 12 14.4 12.8 14.4 14C14.4 15.2 15.2 16 16 16C16.8 16 17.6 15.2 17.6 14C17.6 12.8 16.8 12 16 12ZM16 15.2C15.6 15.2 15.2 14.8 15.2 14C15.2 13.2 15.6 12.8 16 12.8C16.4 12.8 16.8 13.2 16.8 14C16.8 14.8 16.4 15.2 16 15.2Z" fill="white"/>
                        <path d="M12 12.8H11.2V15.2H12V12.8Z" fill="white"/>
                        <path d="M20.8 12.8H20V15.2H20.8V12.8Z" fill="white"/>
                        <path d="M12.8 12.8H12V15.2H12.8V12.8Z" fill="white"/>
                        <path d="M20 12.8H19.2V15.2H20V12.8Z" fill="white"/>
                      </svg>
                      <span className="font-medium">MB WAY</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="mbway"
                        defaultChecked
                      />
                      <label
                        htmlFor="mbway"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="mr-2 h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="white"/>
                        <path d="M10.4 14.4H21.6V17.6H10.4V14.4Z" fill="#FF5F00"/>
                        <path d="M11.2 16C11.2 14.8 11.6 13.6 12.4 12.8C11.6 12 10.4 11.6 9.2 11.6C6.8 11.6 4.8 13.6 4.8 16C4.8 18.4 6.8 20.4 9.2 20.4C10.4 20.4 11.6 20 12.4 19.2C11.6 18.4 11.2 17.2 11.2 16Z" fill="#EB001B"/>
                        <path d="M22.8 16C22.8 18.4 20.8 20.4 18.4 20.4C17.2 20.4 16 20 15.2 19.2C16 18.4 16.4 17.2 16.4 16C16.4 14.8 16 13.6 15.2 12.8C16 12 17.2 11.6 18.4 11.6C20.8 11.6 22.8 13.6 22.8 16Z" fill="#F79E1B"/>
                      </svg>
                      <span className="font-medium">Cartão de Crédito</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="creditcard"
                        defaultChecked
                      />
                      <label
                        htmlFor="creditcard"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="mr-2 h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="white"/>
                        <path d="M10 20H8V12H10L12 18L14 12H16V20H14V14L12 20H10Z" fill="#00579F"/>
                        <path d="M18 12C17.6 11.8 16.8 11.6 16 11.6C14 11.6 12.4 13 12.4 14.8C12.4 16.4 13.6 17.2 14.4 17.6C15.2 18 15.6 18.4 15.6 18.8C15.6 19.2 15.2 19.6 14.4 19.6C13.6 19.6 13.2 19.6 12.4 19.2L12 19L11.6 21C12.4 21.2 13.2 21.6 14.4 21.6C16.4 21.6 18 20.4 18 18.4C18 17.2 17.2 16.4 16 15.6C15.2 15.2 14.8 14.8 14.8 14.4C14.8 14 15.2 13.6 16 13.6C16.4 13.6 16.8 13.6 17.2 13.8L17.6 14L18 12Z" fill="#00579F"/>
                        <path d="M22 12H20.4C20 12 19.6 12.4 19.6 12.4L16.8 20H18.8C18.8 20 19.2 19.2 19.2 19.2C19.6 19.2 21.2 19.2 21.6 19.2C21.6 19.6 21.6 20 21.6 20H23.6L22 12ZM20 17.6C20.4 16.8 20.8 15.6 20.8 15.6C20.8 15.6 21.2 14.8 21.2 14.4L21.6 15.6C21.6 15.6 22 16.8 22 17.6H20Z" fill="#00579F"/>
                      </svg>
                      <span className="font-medium">Cartão de Débito</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="debitcard"
                        defaultChecked
                      />
                      <label
                        htmlFor="debitcard"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">
                    Configurar
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Métodos de Envio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="mr-2 h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="white"/>
                        <path d="M8 10H24L26 22H6L8 10Z" fill="#ED3237"/>
                        <path d="M12 14H20V18H12V14Z" fill="white"/>
                        <path d="M14 16H18" stroke="#ED3237" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 14V18" stroke="#ED3237" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-medium">CTT</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="ctt"
                        defaultChecked
                      />
                      <label
                        htmlFor="ctt"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="mr-2 h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="white"/>
                        <path d="M6 10H26L24 22H8L6 10Z" fill="#DC0032"/>
                        <path d="M12 14H20V18H12V14Z" fill="white"/>
                        <path d="M13 16L19 16" stroke="#DC0032" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M13 15L19 15" stroke="#DC0032" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M13 17L19 17" stroke="#DC0032" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-medium">DPD</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="dpd"
                        defaultChecked
                      />
                      <label
                        htmlFor="dpd"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="mr-2 h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="white"/>
                        <path d="M6 10H26L24 22H8L6 10Z" fill="#0082CA"/>
                        <path d="M12 14H20V18H12V14Z" fill="white"/>
                        <path d="M14 16H18" stroke="#0082CA" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 14V18" stroke="#0082CA" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-medium">GLS</span>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="gls"
                        defaultChecked
                      />
                      <label
                        htmlFor="gls"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">
                    Configurar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Autenticação de Dois Fatores</p>
                      <p className="text-xs text-muted-foreground">Aumentar a segurança da sua conta</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="twoFactor"
                      />
                      <label
                        htmlFor="twoFactor"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" size="sm" className="w-full">
                      Alterar Palavra-passe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
