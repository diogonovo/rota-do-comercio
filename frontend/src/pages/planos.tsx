import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PlansPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Planos de Subscrição</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Escolha o plano ideal para o seu negócio. Todos os planos incluem acesso à plataforma Rota do Comércio e ferramentas essenciais para vender online.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Plano Básico */}
          <Card className="flex flex-col border-2 border-border">
            <CardHeader className="text-center">
              <Badge variant="default" className="mx-auto mb-2">Básico</Badge>
              <CardTitle className="text-2xl">Plano Básico</CardTitle>
              <CardDescription>Para pequenas marcas a iniciar</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">€19</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Até 50 produtos</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>1 imagem por produto</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestão de encomendas</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Integração com transportadoras</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Comissão de 10% por venda</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Personalização da loja</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Analytics avançados</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Escolher Plano Básico
              </Button>
            </CardContent>
          </Card>

          {/* Plano Pro */}
          <Card className="flex flex-col border-2 border-primary relative">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge variant="primary" className="px-3 py-1">Mais Popular</Badge>
            </div>
            <CardHeader className="text-center">
              <Badge variant="primary" className="mx-auto mb-2">Pro</Badge>
              <CardTitle className="text-2xl">Plano Pro</CardTitle>
              <CardDescription>Para marcas em crescimento</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">€49</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Até 200 produtos</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5 imagens por produto</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestão de encomendas</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Integração com transportadoras</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Comissão de 7% por venda</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Personalização da loja</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Analytics avançados</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Destaque de produtos</span>
                </li>
              </ul>
              <Button variant="primary" className="w-full">
                Escolher Plano Pro
              </Button>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="flex flex-col border-2 border-border">
            <CardHeader className="text-center">
              <Badge variant="accent" className="mx-auto mb-2">Premium</Badge>
              <CardTitle className="text-2xl">Plano Premium</CardTitle>
              <CardDescription>Para marcas estabelecidas</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">€99</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Produtos ilimitados</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Imagens ilimitadas por produto</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestão de encomendas</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Integração com transportadoras</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Comissão de 5% por venda</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Personalização total da loja</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Analytics avançados</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Campanhas de marketing</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Taxas de envio personalizadas</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Escolher Plano Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 rounded-lg bg-muted p-8">
          <h2 className="mb-4 text-2xl font-bold">Perguntas Frequentes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Posso mudar de plano mais tarde?</h3>
              <p className="text-muted-foreground">
                Sim, pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor no próximo ciclo de faturação.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Como são calculadas as comissões?</h3>
              <p className="text-muted-foreground">
                As comissões são calculadas sobre o valor total da venda, excluindo os custos de envio. São cobradas apenas quando uma venda é concluída com sucesso.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Existe um período de teste?</h3>
              <p className="text-muted-foreground">
                Sim, oferecemos um período de teste de 14 dias para todos os planos, permitindo-lhe experimentar todas as funcionalidades antes de se comprometer.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Quais são os métodos de pagamento aceites?</h3>
              <p className="text-muted-foreground">
                Aceitamos pagamentos por cartão de crédito/débito (Visa, Mastercard), transferência bancária e referência Multibanco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
