import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export default function AdminDashboardPage() {
  // Dados de exemplo para o dashboard do administrador
  const stats = {
    totalBrands: 124,
    totalProducts: 3567,
    totalOrders: 1892,
    totalRevenue: 156789.45,
    totalUsers: 4321,
    pendingApprovals: 12,
    activeSubscriptions: {
      basic: 68,
      pro: 42,
      premium: 14
    },
    monthlyRevenue: [
      { month: 'Jan', revenue: 12450.75 },
      { month: 'Fev', revenue: 13560.25 },
      { month: 'Mar', revenue: 15780.50 },
      { month: 'Abr', revenue: 14980.30 },
      { month: 'Mai', revenue: 16540.75 },
      { month: 'Jun', revenue: 18970.25 }
    ]
  };

  // Dados de exemplo para marcas recentes
  const recentBrands = [
    {
      id: 1,
      name: 'Lã Portuguesa',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      subscriptionLevel: 'PREMIUM',
      joinDate: '15 de março de 2025',
      productsCount: 24,
      status: 'active'
    },
    {
      id: 2,
      name: 'Cerâmica Alentejana',
      logo: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      subscriptionLevel: 'PRO',
      joinDate: '10 de março de 2025',
      productsCount: 18,
      status: 'active'
    },
    {
      id: 3,
      name: 'Vinhos do Douro',
      logo: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      subscriptionLevel: 'BASIC',
      joinDate: '5 de março de 2025',
      productsCount: 12,
      status: 'pending'
    },
    {
      id: 4,
      name: 'Azeites Tradicionais',
      logo: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      subscriptionLevel: 'PRO',
      joinDate: '1 de março de 2025',
      productsCount: 8,
      status: 'active'
    },
    {
      id: 5,
      name: 'Cortiça & Design',
      logo: 'https://images.unsplash.com/photo-1572950748086-e06d16e9f3ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      subscriptionLevel: 'BASIC',
      joinDate: '25 de fevereiro de 2025',
      productsCount: 15,
      status: 'active'
    }
  ];

  // Dados de exemplo para encomendas recentes
  const recentOrders = [
    {
      id: 'ORD-12345',
      date: '28 de março de 2025',
      customer: 'João Silva',
      brand: 'Lã Portuguesa',
      total: 79.99,
      status: 'pending',
      items: 1
    },
    {
      id: 'ORD-12344',
      date: '27 de março de 2025',
      customer: 'Maria Santos',
      brand: 'Cerâmica Alentejana',
      total: 119.98,
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-12343',
      date: '26 de março de 2025',
      customer: 'António Ferreira',
      brand: 'Vinhos do Douro',
      total: 34.99,
      status: 'shipped',
      items: 1
    },
    {
      id: 'ORD-12342',
      date: '25 de março de 2025',
      customer: 'Sofia Costa',
      brand: 'Azeites Tradicionais',
      total: 89.98,
      status: 'delivered',
      items: 3
    },
    {
      id: 'ORD-12341',
      date: '24 de março de 2025',
      customer: 'Pedro Oliveira',
      brand: 'Cortiça & Design',
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
        {/* Cabeçalho do Admin */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Painel de Administração</h1>
          <p className="text-muted-foreground">Gerencie o marketplace Rota do Comércio</p>
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
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'brands' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('brands')}
          >
            Marcas
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('orders')}
          >
            Encomendas
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('users')}
          >
            Utilizadores
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
                      <p className="text-sm text-muted-foreground">Marcas</p>
                      <h3 className="mt-1 text-2xl font-bold">{stats.totalBrands}</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
                      <p className="text-sm text-muted-foreground">Produtos</p>
                      <h3 className="mt-1 text-2xl font-bold">{stats.totalProducts}</h3>
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
                      <h3 className="mt-1 text-2xl font-bold">{stats.totalOrders}</h3>
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
                      <p className="text-sm text-muted-foreground">Receita</p>
                      <h3 className="mt-1 text-2xl font-bold">{formatPrice(stats.totalRevenue)}</h3>
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
                      10%
                    </span>
                    <span className="ml-2">desde o mês passado</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Marcas Recentes */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Marcas Recentes</CardTitle>
                    <CardDescription>As últimas 5 marcas registadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBrands.map((brand) => (
                        <div key={brand.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex items-center">
                            <Avatar 
                              src={brand.logo} 
                              alt={brand.name}
                              className="h-10 w-10"
                            />
                            <div className="ml-4">
                              <div className="flex items-center">
                                <h3 className="text-base font-medium">{brand.name}</h3>
                                <Badge 
                                  variant={
                                    brand.subscriptionLevel === 'PREMIUM' ? 'premium' : 
                                    brand.subscriptionLevel === 'PRO' ? 'default' : 
                                    'outline'
                                  } 
                                  className="ml-2"
                                >
                                  {brand.subscriptionLevel === 'PREMIUM' ? 'Premium' : 
                                   brand.subscriptionLevel === 'PRO' ? 'Pro' : 
                                   'Básico'}
                                </Badge>
                                {brand.status === 'pending' && (
                                  <Badge variant="warning" className="ml-2">
                                    Pendente
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {brand.joinDate} • {brand.productsCount} produtos
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline">
                      Ver Todas as Marcas
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Estatísticas de Subscrição */}
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Subscrições Ativas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Básico</span>
                          <span className="text-sm text-muted-foreground">{stats.activeSubscriptions.basic} marcas</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-primary/60" 
                            style={{ width: `${(stats.activeSubscriptions.basic / stats.totalBrands) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Pro</span>
                          <span className="text-sm text-muted-foreground">{stats.activeSubscriptions.pro} marcas</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-primary/80" 
                            style={{ width: `${(stats.activeSubscriptions.pro / stats.totalBrands) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Premium</span>
                          <span className="text-sm text-muted-foreground">{stats.activeSubscriptions.premium} marcas</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(stats.activeSubscriptions.premium / stats.totalBrands) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Aprovações Pendentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
                        <p className="text-sm text-muted-foreground">Marcas aguardando aprovação</p>
                      </div>
                      <Button variant="primary">
                        Rever Agora
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Receita Mensal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.monthlyRevenue.map((month) => (
                        <div key={month.month} className="flex items-center justify-between">
                          <span className="text-sm">{month.month}</span>
                          <span className="font-medium">{formatPrice(month.revenue)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da Tab Marcas */}
        {activeTab === 'brands' && (
          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold">Marcas</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input 
                    type="text" 
                    placeholder="Pesquisar marcas..." 
                    className="w-full pl-10 sm:w-64"
                  />
                </div>
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="all">Todos os níveis</option>
                  <option value="basic">Básico</option>
                  <option value="pro">Pro</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-6 py-4 text-left text-sm font-medium">Marca</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Data de Registo</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Subscrição</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Produtos</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Estado</th>
                        <th className="px-6 py-4 text-right text-sm font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBrands.map((brand) => (
                        <tr key={brand.id} className="border-b border-border last:border-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Avatar 
                                src={brand.logo} 
                                alt={brand.name}
                                className="h-10 w-10"
                              />
                              <div className="ml-4">
                                <p className="font-medium">{brand.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span>{brand.joinDate}</span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={
                                brand.subscriptionLevel === 'PREMIUM' ? 'premium' : 
                                brand.subscriptionLevel === 'PRO' ? 'default' : 
                                'outline'
                              }
                            >
                              {brand.subscriptionLevel === 'PREMIUM' ? 'Premium' : 
                               brand.subscriptionLevel === 'PRO' ? 'Pro' : 
                               'Básico'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <span>{brand.productsCount} produtos</span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={brand.status === 'active' ? 'success' : 'warning'}
                            >
                              {brand.status === 'active' ? 'Ativo' : 'Pendente'}
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
                  Mostrando 1-5 de {stats.totalBrands} marcas
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
                        <th className="px-6 py-4 text-left text-sm font-medium">Marca</th>
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
                            <span>{order.brand}</span>
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
                  Mostrando 1-5 de {stats.totalOrders} encomendas
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

        {/* Conteúdo da Tab Utilizadores */}
        {activeTab === 'users' && (
          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold">Utilizadores</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input 
                    type="text" 
                    placeholder="Pesquisar utilizadores..." 
                    className="w-full pl-10 sm:w-64"
                  />
                </div>
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="all">Todos os tipos</option>
                  <option value="admin">Administradores</option>
                  <option value="brand">Marcas</option>
                  <option value="customer">Clientes</option>
                </select>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-muted-foreground">Total de {stats.totalUsers} utilizadores registados</p>
                  <div className="mt-4 flex justify-center">
                    <Button variant="primary">
                      Gerir Utilizadores
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Conteúdo da Tab Definições */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Definições do Marketplace</CardTitle>
                  <CardDescription>Configure as definições gerais do marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="marketplaceName" className="mb-2 block text-sm font-medium">
                        Nome do Marketplace
                      </label>
                      <Input 
                        id="marketplaceName" 
                        type="text" 
                        defaultValue="Rota do Comércio"
                      />
                    </div>

                    <div>
                      <label htmlFor="marketplaceDescription" className="mb-2 block text-sm font-medium">
                        Descrição
                      </label>
                      <textarea
                        id="marketplaceDescription"
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue="Marketplace online destinado a marcas pequenas e independentes, onde cada marca pode criar a sua própria loja personalizada dentro da plataforma."
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contactEmail" className="mb-2 block text-sm font-medium">
                          Email de Contacto
                        </label>
                        <Input 
                          id="contactEmail" 
                          type="email" 
                          defaultValue="contacto@rotadocomercio.pt"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactPhone" className="mb-2 block text-sm font-medium">
                          Telefone de Contacto
                        </label>
                        <Input 
                          id="contactPhone" 
                          type="tel" 
                          defaultValue="+351 210 123 456"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="marketplaceAddress" className="mb-2 block text-sm font-medium">
                        Morada
                      </label>
                      <Input 
                        id="marketplaceAddress" 
                        type="text" 
                        defaultValue="Avenida da Liberdade, 123, 1250-096 Lisboa"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label htmlFor="marketplaceInstagram" className="mb-2 block text-sm font-medium">
                          Instagram
                        </label>
                        <Input 
                          id="marketplaceInstagram" 
                          type="text" 
                          defaultValue="@rotadocomercio"
                        />
                      </div>
                      <div>
                        <label htmlFor="marketplaceFacebook" className="mb-2 block text-sm font-medium">
                          Facebook
                        </label>
                        <Input 
                          id="marketplaceFacebook" 
                          type="text" 
                          defaultValue="facebook.com/rotadocomercio"
                        />
                      </div>
                      <div>
                        <label htmlFor="marketplaceTwitter" className="mb-2 block text-sm font-medium">
                          Twitter
                        </label>
                        <Input 
                          id="marketplaceTwitter" 
                          type="text" 
                          defaultValue="@rotadocomercio"
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
                  <CardTitle>Comissões e Taxas</CardTitle>
                  <CardDescription>Configure as comissões e taxas do marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="basicCommission" className="mb-2 block text-sm font-medium">
                        Comissão para Subscrição Básica (%)
                      </label>
                      <Input 
                        id="basicCommission" 
                        type="number" 
                        defaultValue="10"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label htmlFor="proCommission" className="mb-2 block text-sm font-medium">
                        Comissão para Subscrição Pro (%)
                      </label>
                      <Input 
                        id="proCommission" 
                        type="number" 
                        defaultValue="8"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label htmlFor="premiumCommission" className="mb-2 block text-sm font-medium">
                        Comissão para Subscrição Premium (%)
                      </label>
                      <Input 
                        id="premiumCommission" 
                        type="number" 
                        defaultValue="5"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label htmlFor="processingFee" className="mb-2 block text-sm font-medium">
                        Taxa de Processamento (€)
                      </label>
                      <Input 
                        id="processingFee" 
                        type="number" 
                        defaultValue="0.50"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="primary">
                    Guardar Alterações
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Preços de Subscrição</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="basicPrice" className="mb-2 block text-sm font-medium">
                      Subscrição Básica (€/mês)
                    </label>
                    <Input 
                      id="basicPrice" 
                      type="number" 
                      defaultValue="29.99"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label htmlFor="proPrice" className="mb-2 block text-sm font-medium">
                      Subscrição Pro (€/mês)
                    </label>
                    <Input 
                      id="proPrice" 
                      type="number" 
                      defaultValue="59.99"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label htmlFor="premiumPrice" className="mb-2 block text-sm font-medium">
                      Subscrição Premium (€/mês)
                    </label>
                    <Input 
                      id="premiumPrice" 
                      type="number" 
                      defaultValue="99.99"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="primary">
                    Guardar Alterações
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Manutenção</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Modo de Manutenção</p>
                      <p className="text-xs text-muted-foreground">Desativa temporariamente o marketplace</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="maintenanceMode"
                      />
                      <label
                        htmlFor="maintenanceMode"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" size="sm" className="w-full">
                      Limpar Cache
                    </Button>
                  </div>

                  <div>
                    <Button variant="outline" size="sm" className="w-full">
                      Backup da Base de Dados
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Verificação em Duas Etapas</p>
                      <p className="text-xs text-muted-foreground">Obrigatório para administradores</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="twoFactorAdmin"
                        defaultChecked
                      />
                      <label
                        htmlFor="twoFactorAdmin"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" size="sm" className="w-full">
                      Alterar Palavra-passe
                    </Button>
                  </div>

                  <div>
                    <Button variant="outline" size="sm" className="w-full">
                      Registos de Atividade
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
