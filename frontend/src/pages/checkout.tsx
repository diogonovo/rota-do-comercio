import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export default function CheckoutPage() {
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

  // Estado para controlar o passo atual do checkout
  const [step, setStep] = React.useState(1);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Finalizar Compra</h1>

        {/* Passos do Checkout */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <span className="mt-2 text-sm">Envio</span>
            </div>
            <div className={`flex-grow border-t ${step >= 2 ? 'border-primary' : 'border-muted'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
              <span className="mt-2 text-sm">Pagamento</span>
            </div>
            <div className={`flex-grow border-t ${step >= 3 ? 'border-primary' : 'border-muted'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                3
              </div>
              <span className="mt-2 text-sm">Confirmação</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Envio</CardTitle>
                  <CardDescription>Introduza os seus dados para envio</CardDescription>
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
                          placeholder="Introduza o seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                          Apelido
                        </label>
                        <Input 
                          id="lastName" 
                          type="text" 
                          placeholder="Introduza o seu apelido"
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
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Telefone
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="912 345 678"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="mb-2 block text-sm font-medium">
                        Morada
                      </label>
                      <Input 
                        id="address" 
                        type="text" 
                        placeholder="Rua, Número, Andar"
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
                          placeholder="1000-100"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="mb-2 block text-sm font-medium">
                          Localidade
                        </label>
                        <Input 
                          id="city" 
                          type="text" 
                          placeholder="Lisboa"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shippingMethod" className="mb-2 block text-sm font-medium">
                        Método de Envio
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex items-center">
                            <input
                              id="shipping-standard"
                              name="shippingMethod"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                            <label htmlFor="shipping-standard" className="ml-3">
                              <span className="block text-sm font-medium">Envio Standard</span>
                              <span className="block text-sm text-muted-foreground">2-4 dias úteis</span>
                            </label>
                          </div>
                          <span className="text-sm font-medium">{formatPrice(4.99)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex items-center">
                            <input
                              id="shipping-express"
                              name="shippingMethod"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="shipping-express" className="ml-3">
                              <span className="block text-sm font-medium">Envio Expresso</span>
                              <span className="block text-sm text-muted-foreground">1-2 dias úteis</span>
                            </label>
                          </div>
                          <span className="text-sm font-medium">{formatPrice(9.99)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                        Notas para a Encomenda (opcional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Instruções especiais para entrega..."
                      ></textarea>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => window.location.href = '/carrinho'}>
                    Voltar ao Carrinho
                  </Button>
                  <Button variant="primary" onClick={() => setStep(2)}>
                    Continuar para Pagamento
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Pagamento</CardTitle>
                  <CardDescription>Introduza os seus dados de pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="paymentMethod" className="mb-2 block text-sm font-medium">
                        Método de Pagamento
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex items-center">
                            <input
                              id="payment-card"
                              name="paymentMethod"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                            <label htmlFor="payment-card" className="ml-3 flex items-center">
                              <span className="mr-2 block text-sm font-medium">Cartão de Crédito/Débito</span>
                              <div className="flex space-x-1">
                                <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="40" height="24" rx="4" fill="white"/>
                                  <path d="M15.4 9.2H24.6V14.8H15.4V9.2Z" fill="#FF5F00"/>
                                  <path d="M16 12C16 10.4 17 9 18.4 8.2C17.4 7.6 16.2 7.2 15 7.2C12 7.2 9.6 9.4 9.6 12C9.6 14.6 12 16.8 15 16.8C16.2 16.8 17.4 16.4 18.4 15.8C17 15 16 13.6 16 12Z" fill="#EB001B"/>
                                  <path d="M30.4 12C30.4 14.6 28 16.8 25 16.8C23.8 16.8 22.6 16.4 21.6 15.8C23 15 24 13.6 24 12C24 10.4 23 9 21.6 8.2C22.6 7.6 23.8 7.2 25 7.2C28 7.2 30.4 9.4 30.4 12Z" fill="#F79E1B"/>
                                </svg>
                                <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="40" height="24" rx="4" fill="white"/>
                                  <path d="M15 16H12V8H15L17 14L19 8H22V16H19V10L17 16H15Z" fill="#00579F"/>
                                  <path d="M25 8C24.4 7.8 23.4 7.6 22.4 7.6C20 7.6 18 9 18 11C18 12.6 19.4 13.4 20.4 13.8C21.4 14.2 21.6 14.6 21.6 15C21.6 15.6 21 16 20.4 16C19.4 16 18.8 15.8 18 15.4L17.6 15.2L17.2 17.6C18 18 19.2 18.2 20.4 18.2C23 18.2 24.8 16.8 24.8 14.6C24.8 13.4 24.2 12.4 22.6 11.6C21.6 11.2 21 10.8 21 10.4C21 10 21.6 9.6 22.2 9.6C22.8 9.6 23.2 9.8 23.8 10L24.2 10.2L24.6 8.2L25 8Z" fill="#00579F"/>
                                  <path d="M28.6 8H26.4C26 8 25.8 8.2 25.6 8.6L22.4 16H25C25 16 25.4 15 25.4 14.8C25.6 14.8 27.6 14.8 28 14.8C28 15 28.2 16 28.2 16H30.6L28.6 8ZM26 12.8C26.2 12 26.8 10.4 26.8 10.4C26.8 10.4 27 9.8 27.2 9.4L27.4 10.2C27.4 10.2 27.8 12 28 12.8H26Z" fill="#00579F"/>
                                </svg>
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex items-center">
                            <input
                              id="payment-mb"
                              name="paymentMethod"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="payment-mb" className="ml-3 flex items-center">
                              <span className="mr-2 block text-sm font-medium">Multibanco</span>
                              <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="24" rx="4" fill="white"/>
                                <path d="M30 7.2H10C8.8 7.2 8 8 8 9.2V14.8C8 16 8.8 16.8 10 16.8H30C31.2 16.8 32 16 32 14.8V9.2C32 8 31.2 7.2 30 7.2Z" fill="#A6A6A6"/>
                                <path d="M30 8.8H10C9.4 8.8 8.8 9.4 8.8 10V14.8C8.8 15.4 9.4 16 10 16H30C30.6 16 31.2 15.4 31.2 14.8V10C31.2 9.4 30.6 8.8 30 8.8Z" fill="#FFFFFF"/>
                                <path d="M12 13.6H11.2V12H12V13.6ZM13.2 13.6H12.4V12H13.2V13.6ZM14.4 13.6H13.6V12H14.4V13.6ZM15.6 13.6H14.8V12H15.6V13.6ZM16.8 13.6H16V12H16.8V13.6ZM18 13.6H17.2V12H18V13.6ZM19.2 13.6H18.4V12H19.2V13.6ZM20.4 13.6H19.6V12H20.4V13.6ZM21.6 13.6H20.8V12H21.6V13.6ZM22.8 13.6H22V12H22.8V13.6ZM24 13.6H23.2V12H24V13.6ZM25.2 13.6H24.4V12H25.2V13.6ZM26.4 13.6H25.6V12H26.4V13.6ZM27.6 13.6H26.8V12H27.6V13.6ZM28.8 13.6H28V12H28.8V13.6Z" fill="#A6A6A6"/>
                              </svg>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex items-center">
                            <input
                              id="payment-mbway"
                              name="paymentMethod"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="payment-mbway" className="ml-3 flex items-center">
                              <span className="mr-2 block text-sm font-medium">MB WAY</span>
                              <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="24" rx="4" fill="#white"/>
                                <path d="M8 7.2H32V16.8H8V7.2Z" fill="#00A0E4"/>
                                <path d="M20 9.6C18.4 9.6 17.2 10.8 17.2 12.4C17.2 14 18.4 15.2 20 15.2C21.6 15.2 22.8 14 22.8 12.4C22.8 10.8 21.6 9.6 20 9.6ZM20 14C19.2 14 18.4 13.2 18.4 12.4C18.4 11.6 19.2 10.8 20 10.8C20.8 10.8 21.6 11.6 21.6 12.4C21.6 13.2 20.8 14 20 14Z" fill="white"/>
                                <path d="M14 10.8H12.8V14H14V10.8Z" fill="white"/>
                                <path d="M27.2 10.8H26V14H27.2V10.8Z" fill="white"/>
                                <path d="M15.2 10.8H14V14H15.2V10.8Z" fill="white"/>
                                <path d="M26 10.8H24.8V14H26V10.8Z" fill="white"/>
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <h3 className="mb-4 text-base font-medium">Detalhes do Cartão</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardName" className="mb-2 block text-sm font-medium">
                            Nome no Cartão
                          </label>
                          <Input 
                            id="cardName" 
                            type="text" 
                            placeholder="Nome como aparece no cartão"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium">
                            Número do Cartão
                          </label>
                          <Input 
                            id="cardNumber" 
                            type="text" 
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="mb-2 block text-sm font-medium">
                              Data de Validade
                            </label>
                            <Input 
                              id="expiryDate" 
                              type="text" 
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="mb-2 block text-sm font-medium">
                              CVV
                            </label>
                            <Input 
                              id="cvv" 
                              type="text" 
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="saveCard"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="saveCard" className="ml-2 block text-sm text-muted-foreground">
                        Guardar este cartão para compras futuras
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)}>
                    Finalizar Encomenda
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Encomenda Confirmada</CardTitle>
                  <CardDescription>A sua encomenda foi processada com sucesso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Obrigado pela sua compra!</h3>
                    <p className="text-muted-foreground">
                      A sua encomenda #12345 foi confirmada e será processada em breve.
                    </p>
                  </div>

                  <div className="mb-6 rounded-lg border border-border p-4">
                    <h3 className="mb-4 text-base font-medium">Detalhes da Encomenda</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Número da Encomenda</span>
                        <span className="text-sm font-medium">#12345</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Data</span>
                        <span className="text-sm font-medium">28 de Março de 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Email</span>
                        <span className="text-sm font-medium">cliente@exemplo.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Método de Pagamento</span>
                        <span className="text-sm font-medium">Cartão de Crédito (•••• 4242)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Método de Envio</span>
                        <span className="text-sm font-medium">Envio Standard (2-4 dias úteis)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 rounded-lg border border-border p-4">
                    <h3 className="mb-4 text-base font-medium">Morada de Envio</h3>
                    <p className="text-sm text-muted-foreground">
                      João Silva<br />
                      Rua das Flores, 123<br />
                      1000-100 Lisboa<br />
                      Portugal
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Produtos Encomendados</h3>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              Quantidade: {item.quantity}
                            </p>
                            {item.variant && (
                              <p className="text-xs text-muted-foreground">
                                {item.variant.size && <span>Tamanho: {item.variant.size}</span>}
                                {item.variant.size && item.variant.color && <span> / </span>}
                                {item.variant.color && <span>Cor: {item.variant.color}</span>}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {item.discount ? (
                            <div>
                              <span className="text-sm font-medium">
                                {formatPrice(item.price * (1 - item.discount / 100) * item.quantity)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => window.location.href = '/'}>
                    Continuar a Comprar
                  </Button>
                  <Button variant="primary" onClick={() => window.location.href = '/dashboard/cliente'}>
                    Ver Minhas Encomendas
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Resumo do Pedido */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {item.discount ? (
                          <div>
                            <span className="text-sm font-medium">
                              {formatPrice(item.price * (1 - item.discount / 100) * item.quantity)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-2 pt-4">
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
                </div>
              </CardContent>
            </Card>

            {step < 3 && (
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
            )}

            {step < 3 && (
              <div className="mt-6 rounded-lg border border-border p-4">
                <h3 className="mb-4 text-sm font-medium">Precisamos de Ajuda?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Se tiver alguma dúvida sobre a sua encomenda, não hesite em contactar-nos.
                </p>
                <div className="flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">apoio@rotadocomercio.pt</span>
                </div>
                <div className="mt-2 flex items-center">
                  <svg className="mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">+351 210 123 456</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
