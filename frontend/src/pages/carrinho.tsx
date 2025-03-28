import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export default function CartPage() {
  // Dados de exemplo para o carrinho
  const cartItems = [
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
      quantity: 1,
      variant: {
        size: 'M',
        color: 'Azul Marinho'
      }
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
      quantity: 2,
      variant: {
        size: 'Único',
        color: 'Natural'
      }
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
      quantity: 1,
      variant: {
        size: '500ml',
        color: null
      },
      discount: 15
    }
  ];

  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  // Valores fixos para demonstração
  const shipping = 4.99;
  const tax = subtotal * 0.23; // IVA a 23%
  const total = subtotal + shipping;

  // Formatar preço
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Carrinho de Compras</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col border-b border-border pb-6 last:border-0 last:pb-0 sm:flex-row">
                        <div className="mb-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-grow flex-col sm:ml-6">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium">{item.name}</h3>
                              <div className="mt-1 flex items-center">
                                <img 
                                  src={item.brand.logo} 
                                  alt={item.brand.name} 
                                  className="mr-2 h-4 w-4 rounded-full object-cover" 
                                />
                                <span className="text-xs text-muted-foreground">{item.brand.name}</span>
                              </div>
                              {item.variant && (
                                <div className="mt-1 text-sm text-muted-foreground">
                                  {item.variant.size && <span>Tamanho: {item.variant.size}</span>}
                                  {item.variant.size && item.variant.color && <span> / </span>}
                                  {item.variant.color && <span>Cor: {item.variant.color}</span>}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              {item.discount ? (
                                <div>
                                  <span className="text-base font-medium">
                                    {formatPrice(item.price * (1 - item.discount / 100))}
                                  </span>
                                  <span className="ml-2 text-sm text-muted-foreground line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-base font-medium">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex items-end justify-between">
                            <div className="flex h-10 w-32 items-center rounded-md border border-border">
                              <button
                                className="flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                                onClick={() => console.log('Decrease quantity')}
                              >
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                readOnly
                                className="h-full w-12 border-x border-border bg-transparent text-center text-sm focus:outline-none"
                              />
                              <button
                                className="flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                                onClick={() => console.log('Increase quantity')}
                              >
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </div>
                            <button
                              className="text-sm text-muted-foreground hover:text-destructive"
                              onClick={() => console.log('Remove item')}
                            >
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => console.log('Continue shopping')}>
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continuar a Comprar
                  </Button>
                  <Button variant="outline" onClick={() => console.log('Update cart')}>
                    Atualizar Carrinho
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envio</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IVA (incluído)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="primary" className="w-full" onClick={() => console.log('Proceed to checkout')}>
                      Finalizar Compra
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Código Promocional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Inserir código" 
                      className="flex-grow"
                    />
                    <Button variant="outline">Aplicar</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Métodos de Pagamento Aceites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-md bg-muted p-2">
                      <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="32" rx="4" fill="white"/>
                        <path d="M18.4 11.2H29.6V20.8H18.4V11.2Z" fill="#FF5F00"/>
                        <path d="M19.2 16C19.2 14 20.4 12.2 22 11.2C20.8 10.4 19.2 10 17.6 10C13.6 10 10.4 12.8 10.4 16C10.4 19.2 13.6 22 17.6 22C19.2 22 20.8 21.6 22 20.8C20.4 19.8 19.2 18 19.2 16Z" fill="#EB001B"/>
                        <path d="M37.6 16C37.6 19.2 34.4 22 30.4 22C28.8 22 27.2 21.6 26 20.8C27.6 19.8 28.8 18 28.8 16C28.8 14 27.6 12.2 26 11.2C27.2 10.4 28.8 10 30.4 10C34.4 10 37.6 12.8 37.6 16Z" fill="#F79E1B"/>
                      </svg>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="32" rx="4" fill="white"/>
                        <path d="M18 21.6H14.4L16.8 10.4H20.4L18 21.6Z" fill="#00579F"/>
                        <path d="M30 10.6C29.2 10.4 28 10 26.8 10C23.6 10 21.2 11.8 21.2 14.4C21.2 16.4 22.8 17.4 24 18C25.2 18.6 25.6 19 25.6 19.6C25.6 20.4 24.8 20.8 24 20.8C22.8 20.8 22 20.6 20.8 20L20.4 19.8L20 22.8C20.8 23.2 22.4 23.6 24 23.6C27.6 23.6 29.6 21.8 29.6 19C29.6 17.4 28.8 16.2 26.8 15.2C25.6 14.6 24.8 14.2 24.8 13.6C24.8 13 25.6 12.6 26.4 12.6C27.2 12.6 27.6 12.8 28.4 13L28.8 13.2L29.2 10.6H30Z" fill="#00579F"/>
                        <path d="M34.4 10.4H31.6C31.2 10.4 30.8 10.6 30.4 11L26.4 21.6H30C30 21.6 30.4 20.4 30.4 20.2C30.8 20.2 33.2 20.2 33.6 20.2C33.6 20.4 34 21.6 34 21.6H37.2L34.4 10.4ZM31.2 17.6C31.6 16.6 32.4 14.4 32.4 14.4C32.4 14.4 32.8 13.6 32.8 13.2L33.2 14.2C33.2 14.2 33.6 16.6 33.6 17.6H31.2Z" fill="#00579F"/>
                      </svg>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="32" rx="4" fill="white"/>
                        <path d="M32.8 10.4H29.6V18.4H32.8V10.4Z" fill="#006FCF"/>
                        <path d="M29.2 11.2C28.4 10.8 27.6 10.4 26.4 10.4C24 10.4 22.4 11.6 22.4 13.6C22.4 15.2 23.6 16 24.8 16.4C26 16.8 26.4 17.2 26.4 17.6C26.4 18.4 25.6 18.8 24.8 18.8C23.6 18.8 22.8 18.4 22 18L21.6 17.6L21.2 20C22 20.4 23.2 20.8 24.4 20.8C27.2 20.8 28.8 19.6 28.8 17.2C28.8 16 28 15.2 26.4 14.4C25.6 14 25.2 13.6 25.2 13.2C25.2 12.8 25.6 12.4 26.4 12.4C27.2 12.4 27.6 12.8 28 12.8L28.4 13.2L29.2 11.2Z" fill="#006FCF"/>
                        <path d="M36.8 10.4L34.4 10.4L31.2 18.4L34 18.4C34 18.4 34.4 17.2 34.4 17.2C34.8 17.2 36.8 17.2 37.2 17.2C37.2 17.6 37.6 18.4 37.6 18.4L40 18.4L36.8 10.4ZM35.2 15.2C35.6 14.4 36 13.2 36 13.2C36 13.2 36.4 12.4 36.4 12L36.8 13.2C36.8 13.2 37.2 14.4 37.2 15.2L35.2 15.2Z" fill="#006FCF"/>
                        <path d="M18.4 18.4L18 16.8C17.6 15.6 16.4 14 15.2 14L11.2 14L11.2 18.8C11.2 18.8 14.8 19.6 18 20.8L18.4 18.4Z" fill="#006FCF"/>
                      </svg>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="32" rx="4" fill="white"/>
                        <path d="M24 10C20 10 16.8 12.8 16.8 16C16.8 19.2 20 22 24 22C28 22 31.2 19.2 31.2 16C31.2 12.8 28 10 24 10ZM24 20C21.2 20 18.8 18.4 18.8 16C18.8 13.6 21.2 12 24 12C26.8 12 29.2 13.6 29.2 16C29.2 18.4 26.8 20 24 20Z" fill="#0079BE"/>
                        <path d="M25.6 14.4H22.4V17.6H25.6V14.4Z" fill="#0079BE"/>
                      </svg>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="32" rx="4" fill="white"/>
                        <path d="M24 10C20 10 16.8 12.8 16.8 16C16.8 19.2 20 22 24 22C28 22 31.2 19.2 31.2 16C31.2 12.8 28 10 24 10Z" fill="#FFB600"/>
                        <path d="M24 10C20 10 16.8 12.8 16.8 16H31.2C31.2 12.8 28 10 24 10Z" fill="#F7981D"/>
                        <path d="M16.8 16C16.8 19.2 20 22 24 22C28 22 31.2 19.2 31.2 16H16.8Z" fill="#00A2E5"/>
                      </svg>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="32" rx="4" fill="white"/>
                        <path d="M24 10C20 10 16.8 12.8 16.8 16C16.8 19.2 20 22 24 22C28 22 31.2 19.2 31.2 16C31.2 12.8 28 10 24 10Z" fill="#016FD0"/>
                        <path d="M24 10C20 10 16.8 12.8 16.8 16H31.2C31.2 12.8 28 10 24 10Z" fill="#EB1C26"/>
                        <path d="M16.8 16C16.8 19.2 20 22 24 22C28 22 31.2 19.2 31.2 16H16.8Z" fill="#126DE5"/>
                      </svg>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="32" rx="4" fill="white"/>
                        <path d="M30.4 10H17.6C13.6 10 10.4 13.2 10.4 17.2V18.8C10.4 19.6 11.2 20.4 12 20.4H36C36.8 20.4 37.6 19.6 37.6 18.8V17.2C37.6 13.2 34.4 10 30.4 10Z" fill="#A6A6A6"/>
                        <path d="M36 12H12C11.2 12 10.4 12.8 10.4 13.6V18.8C10.4 19.6 11.2 20.4 12 20.4H36C36.8 20.4 37.6 19.6 37.6 18.8V13.6C37.6 12.8 36.8 12 36 12Z" fill="#FFFFFF"/>
                        <path d="M14.4 16.8H13.6V14.8H14.4V16.8ZM16 16.8H15.2V14.8H16V16.8ZM17.6 16.8H16.8V14.8H17.6V16.8ZM19.2 16.8H18.4V14.8H19.2V16.8ZM20.8 16.8H20V14.8H20.8V16.8ZM22.4 16.8H21.6V14.8H22.4V16.8ZM24 16.8H23.2V14.8H24V16.8ZM25.6 16.8H24.8V14.8H25.6V16.8ZM27.2 16.8H26.4V14.8H27.2V16.8ZM28.8 16.8H28V14.8H28.8V16.8ZM30.4 16.8H29.6V14.8H30.4V16.8ZM32 16.8H31.2V14.8H32V16.8ZM33.6 16.8H32.8V14.8H33.6V16.8ZM35.2 16.8H34.4V14.8H35.2V16.8Z" fill="#A6A6A6"/>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="mb-4 h-16 w-16 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="mb-2 text-xl font-semibold">O seu carrinho está vazio</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Parece que ainda não adicionou nenhum produto ao seu carrinho.
              <br />
              Explore a nossa seleção de produtos de marcas independentes portuguesas.
            </p>
            <Button variant="primary" onClick={() => console.log('Go to products')}>
              Explorar Produtos
            </Button>
          </div>
        )}

        {/* Produtos Recomendados */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Também Pode Gostar</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((product) => (
                <div key={product} className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={`https://images.unsplash.com/photo-${1570000000000 + product * 1000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
                      alt={`Produto Recomendado ${product}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product === 2 && (
                      <div className="absolute top-2 left-2">
                        <span className="inline-block rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">
                          -15%
                        </span>
                      </div>
                    )}
                    {product === 3 && (
                      <div className="absolute top-2 left-2">
                        <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                          Novo
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col p-4">
                    <div className="mb-2 flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                        alt="Logo da Marca" 
                        className="mr-2 h-4 w-4 rounded-full object-cover" 
                      />
                      <span className="text-xs text-muted-foreground">Marca #{product}</span>
                    </div>
                    
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium">Produto Recomendado #{product}</h3>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">
                        {formatPrice(29.99 + product * 10)}
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
                        <span className="ml-1 text-xs">{(4 + product * 0.1).toFixed(1)}</span>
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
          </div>
        )}
      </div>
    </MainLayout>
  );
}
