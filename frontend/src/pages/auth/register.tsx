import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <Card variant="elevated" className="mx-auto w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Criar Conta na Rota do Comércio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Nome"
                  type="text"
                  placeholder="Seu nome"
                />
                <Input
                  label="Apelido"
                  type="text"
                  placeholder="Seu apelido"
                />
              </div>
              
              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
              />
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Palavra-passe"
                  type="password"
                  placeholder="••••••••"
                />
                <Input
                  label="Confirmar Palavra-passe"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              
              <Select
                label="Tipo de Conta"
                options={[
                  { value: 'CLIENTE', label: 'Cliente - Quero comprar produtos' },
                  { value: 'MARCA', label: 'Marca - Quero vender produtos' }
                ]}
              />
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                    Concordo com os <a href="/termos" className="text-primary hover:underline">Termos e Condições</a> e a <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-muted-foreground">
                    Quero receber novidades e promoções por email
                  </label>
                </div>
              </div>
              
              <Button variant="primary" className="w-full">
                Criar Conta
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Ou continue com</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>
              
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">Já tem uma conta?</span>{' '}
                <a href="/auth/login" className="font-medium text-primary hover:text-primary/80">
                  Entrar
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
