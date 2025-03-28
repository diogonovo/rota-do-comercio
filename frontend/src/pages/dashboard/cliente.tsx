import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export default function DashboardClientePage() {
  // Dados de exemplo para o cliente
  const user = {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    address: {
      street: 'Rua das Flores, 123',
      postalCode: '1000-100',
      city: 'Lisboa',
      country: 'Portugal'
    },
    phone: '+351 912 345 678',
    registeredDate: '10 de janeiro de 2025',
    lastLogin: '28 de março de 2025'
  };

  // Dados de exemplo para encomendas
  const orders = [
    {
      id: 'ORD-12345',
      date: '28 de março de 2025',
      status: 'Confirmada',
      total: 212.47,
      items: 3,
      paymentMethod: 'Cartão de Crédito',
      shippingMethod: 'Envio Standard',
      trackingNumber: 'CTT123456789PT'
    },
    {
      id: 'ORD-12344',
      date: '15 de março de 2025',
      status: 'Entregue',
      total: 89.99,
      items: 1,
      paymentMethod: 'MB WAY',
      shippingMethod: 'Envio Standard',
      trackingNumber: 'CTT987654321PT'
    },
    {
      id: 'ORD-12343',
      date: '2 de março de 2025',
      status: 'Entregue',
      total: 145.98,
      items: 2,
      paymentMethod: 'Multibanco',
      shippingMethod: 'Envio Expresso',
      trackingNumber: 'DPD123456789PT'
    }
  ];

  // Dados de exemplo para produtos favoritos
  const favorites = [
    {
      id: 1,
      name: 'Camisola de Lã Merino',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 1,
        name: 'Lã Portuguesa',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 4.8
    },
    {
      id: 6,
      name: 'Manta de Linho Natural',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 1,
        name: 'Lã Portuguesa',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 4.4
    },
    {
      id: 2,
      name: 'Azeite Extra Virgem Premium',
      price: 12.50,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 2,
        name: 'Sabores do Alentejo',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      discount: 15,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Vinho Tinto Reserva',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 3,
        name: 'Vinhos do Douro',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 4.7
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
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center">
            <Avatar 
              src={user.avatar} 
              alt={user.name}
              size="lg"
              className="mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Olá, {user.name.split(' ')[0]}</h1>
              <p className="text-muted-foreground">Bem-vindo ao seu painel de cliente</p>
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm" className="mr-2">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Continuar a Comprar
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

        <div className="mb-8 flex border-b border-border">
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('profile')}
          >
            Perfil
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('orders')}
          >
            Encomendas
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'favorites' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favoritos
          </button>
          <button
            className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium ${activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('settings')}
          >
            Definições
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Gerir os seus dados pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                          Nome
                        </label>
                        <Input 
                          id="firstName" 
                          type="text" 
                          defaultValue={user.name.split(' ')[0]}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                          Apelido
                        </label>
                        <Input 
                          id="lastName" 
                          type="text" 
                          defaultValue={user.name.split(' ')[1]}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue={user.email}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Telefone
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        defaultValue={user.phone}
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="mb-2 block text-sm font-medium">
                        Morada
                      </label>
                      <Input 
                        id="address" 
                        type="text" 
                        defaultValue={user.address.street}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="postalCode" className="mb-2 block text-sm font-medium">
                          Código Postal
                        </label>
                        <Input 
                          id="postalCode" 
                          type="text" 
                          defaultValue={user.address.postalCode}
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="mb-2 block text-sm font-medium">
                          Localidade
                        </label>
                        <Input 
                          id="city" 
                          type="text" 
                          defaultValue={user.address.city}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="mb-2 block text-sm font-medium">
                        País
                      </label>
                      <Input 
                        id="country" 
                        type="text" 
                        defaultValue={user.address.country}
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
                  <CardTitle>Informações da Conta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Membro desde</p>
                    <p className="text-muted-foreground">{user.registeredDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Último acesso</p>
                    <p className="text-muted-foreground">{user.lastLogin}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Encomendas</p>
                    <p className="text-muted-foreground">{orders.length} encomendas realizadas</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Comunicação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Newsletter</p>
                      <p className="text-xs text-muted-foreground">Receber novidades e promoções</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="newsletter"
                        defaultChecked
                      />
                      <label
                        htmlFor="newsletter"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Notificações SMS</p>
                      <p className="text-xs text-muted-foreground">Receber atualizações por SMS</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="sms"
                      />
                      <label
                        htmlFor="sms"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Notificações de Encomendas</p>
                      <p className="text-xs text-muted-foreground">Receber atualizações de encomendas</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                        id="orders"
                        defaultChecked
                      />
                      <label
                        htmlFor="orders"
                        className="peer-checked:bg-primary peer-focus:ring-primary-foreground peer h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"
                      ></label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">
                    Guardar Preferências
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Minhas Encomendas</CardTitle>
                <CardDescription>Histórico de todas as suas encomendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border border-border p-4">
                      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-base font-medium">{order.id}</h3>
                            <Badge 
                              variant={
                                order.status === 'Confirmada' ? 'outline' : 
                                order.status === 'Entregue' ? 'success' : 
                                'default'
                              } 
                              className="ml-2"
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items} {order.items === 1 ? 'item' : 'itens'} • {formatPrice(order.total)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                          {order.status === 'Confirmada' && (
                            <Button variant="primary" size="sm">
                              Rastrear Encomenda
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Método de Pagamento</span>
                          <span>{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Método de Envio</span>
                          <span>{order.shippingMethod}</span>
                        </div>
                        {order.trackingNumber && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Número de Rastreio</span>
                            <span>{order.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Produtos Favoritos</CardTitle>
                <CardDescription>Produtos que você marcou como favoritos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {favorites.map((product) => (
                    <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {product.discount && (
                          <div className="absolute top-2 left-2">
                            <span className="inline-block rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">
                              -{product.discount}%
                            </span>
                          </div>
                        )}
                        <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-primary hover:bg-white">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex flex-col p-4">
                        <div className="mb-2 flex items-center">
                          <img 
                            src={product.brand.logo} 
                            alt={product.brand.name} 
                            className="mr-2 h-4 w-4 rounded-full object-cover" 
                          />
                          <span className="text-xs text-muted-foreground">{product.brand.name}</span>
                        </div>
                        
                        <h3 className="mb-1 line-clamp-2 text-sm font-medium">{product.name}</h3>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-sm font-bold text-foreground">
                            {formatPrice(product.price)}
                          </span>
                          
                          <div className="flex items-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              className="h-4 w-4 text-accent"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            <span className="ml-1 text-xs">{product.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute inset-x-0 bottom-0 h-12 translate-y-full bg-primary p-2 transition-transform duration-300 group-hover:translate-y-0">
                        <button className="flex h-full w-full items-center justify-center rounded-md bg-primary-foreground text-sm font-medium text-primary">
                          Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Alterar Palavra-passe</CardTitle>
                  <CardDescription>Atualize a sua palavra-passe para manter a sua conta segura</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium">
                        Palavra-passe Atual
                      </label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="mb-2 block text-sm font-medium">
                        Nova Palavra-passe
                      </label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                        Confirmar Nova Palavra-passe
                      </label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="primary">
                    Atualizar Palavra-passe
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pagamento</CardTitle>
                  <CardDescription>Gerir os seus métodos de pagamento guardados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center">
                        <div className="mr-4 flex h-10 w-16 items-center justify-center rounded bg-muted">
                          <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="24" rx="4" fill="white"/>
                            <path d="M15.4 9.2H24.6V14.8H15.4V9.2Z" fill="#FF5F00"/>
                            <path d="M16 12C16 10.4 17 9 18.4 8.2C17.4 7.6 16.2 7.2 15 7.2C12 7.2 9.6 9.4 9.6 12C9.6 14.6 12 16.8 15 16.8C16.2 16.8 17.4 16.4 18.4 15.8C17 15 16 13.6 16 12Z" fill="#EB001B"/>
                            <path d="M30.4 12C30.4 14.6 28 16.8 25 16.8C23.8 16.8 22.6 16.4 21.6 15.8C23 15 24 13.6 24 12C24 10.4 23 9 21.6 8.2C22.6 7.6 23.8 7.2 25 7.2C28 7.2 30.4 9.4 30.4 12Z" fill="#F79E1B"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cartão Mastercard</p>
                          <p className="text-xs text-muted-foreground">Termina em 4242 • Expira em 03/2026</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Remover
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center">
                        <div className="mr-4 flex h-10 w-16 items-center justify-center rounded bg-muted">
                          <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="24" rx="4" fill="white"/>
                            <path d="M15 16H12V8H15L17 14L19 8H22V16H19V10L17 16H15Z" fill="#00579F"/>
                            <path d="M25 8C24.4 7.8 23.4 7.6 22.4 7.6C20 7.6 18 9 18 11C18 12.6 19.4 13.4 20.4 13.8C21.4 14.2 21.6 14.6 21.6 15C21.6 15.6 21 16 20.4 16C19.4 16 18.8 15.8 18 15.4L17.6 15.2L17.2 17.6C18 18 19.2 18.2 20.4 18.2C23 18.2 24.8 16.8 24.8 14.6C24.8 13.4 24.2 12.4 22.6 11.6C21.6 11.2 21 10.8 21 10.4C21 10 21.6 9.6 22.2 9.6C22.8 9.6 23.2 9.8 23.8 10L24.2 10.2L24.6 8.2L25 8Z" fill="#00579F"/>
                            <path d="M28.6 8H26.4C26 8 25.8 8.2 25.6 8.6L22.4 16H25C25 16 25.4 15 25.4 14.8C25.6 14.8 27.6 14.8 28 14.8C28 15 28.2 16 28.2 16H30.6L28.6 8ZM26 12.8C26.2 12 26.8 10.4 26.8 10.4C26.8 10.4 27 9.8 27.2 9.4L27.4 10.2C27.4 10.2 27.8 12 28 12.8H26Z" fill="#00579F"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cartão Visa</p>
                          <p className="text-xs text-muted-foreground">Termina em 1234 • Expira em 12/2025</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Remover
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Adicionar Novo Método de Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Privacidade e Segurança</CardTitle>
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

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Histórico de Atividade</p>
                      <p className="text-xs text-muted-foreground">Monitorizar atividade da conta</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Histórico
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Sessões Ativas</p>
                      <p className="text-xs text-muted-foreground">Gerir dispositivos conectados</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Gerir Sessões
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eliminar Conta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Ao eliminar a sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
                  </p>
                  <Button variant="destructive" size="sm">
                    Eliminar Conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
