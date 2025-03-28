import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { BrandCard } from '@/components/brand/brand-card';

export default function BrandsPage() {
  // Dados de exemplo para marcas
  const brands = [
    {
      id: 1,
      name: 'Lã Portuguesa',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Produtos de lã merino de alta qualidade, produzidos artesanalmente em Portugal.',
      productCount: 24,
      subscriptionLevel: 'PREMIUM' as 'PREMIUM',
      isFeatured: true,
      primaryColor: '#2563eb'
    },
    {
      id: 2,
      name: 'Sabores do Alentejo',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Azeites, vinhos e produtos gourmet do Alentejo, com tradição e qualidade.',
      productCount: 36,
      subscriptionLevel: 'PRO' as 'PRO',
      isFeatured: true,
      primaryColor: '#059669'
    },
    {
      id: 3,
      name: 'Cortiça Design',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Peças de decoração e acessórios em cortiça, combinando tradição e design moderno.',
      productCount: 18,
      subscriptionLevel: 'PRO' as 'PRO',
      isFeatured: true,
      primaryColor: '#b45309'
    },
    {
      id: 4,
      name: 'Vinhos do Douro',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Vinhos premiados da região do Douro, produzidos com uvas selecionadas e métodos tradicionais.',
      productCount: 42,
      subscriptionLevel: 'PREMIUM' as 'PREMIUM',
      isFeatured: false,
      primaryColor: '#7f1d1d'
    },
    {
      id: 5,
      name: 'Essências Naturais',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Produtos de beleza e bem-estar 100% naturais, feitos à mão com ingredientes portugueses.',
      productCount: 29,
      subscriptionLevel: 'PRO' as 'PRO',
      isFeatured: false,
      primaryColor: '#065f46'
    },
    {
      id: 6,
      name: 'Cerâmica Tradicional',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Peças de cerâmica artesanal portuguesa, mantendo vivas as tradições seculares.',
      productCount: 15,
      subscriptionLevel: 'BASICO' as 'BASICO',
      isFeatured: false,
      primaryColor: '#9d174d'
    },
    {
      id: 7,
      name: 'Joalharia Artesanal',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Joias artesanais portuguesas, criadas com paixão e atenção aos detalhes.',
      productCount: 22,
      subscriptionLevel: 'PRO' as 'PRO',
      isFeatured: false,
      primaryColor: '#1e40af'
    },
    {
      id: 8,
      name: 'Calçado Português',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Calçado de qualidade premium, produzido artesanalmente em Portugal.',
      productCount: 31,
      subscriptionLevel: 'PREMIUM' as 'PREMIUM',
      isFeatured: false,
      primaryColor: '#713f12'
    },
    {
      id: 9,
      name: 'Conservas Artesanais',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      banner: 'https://images.unsplash.com/photo-1626082929543-5bfa38815f2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Conservas de peixe artesanais, seguindo receitas tradicionais portuguesas.',
      productCount: 17,
      subscriptionLevel: 'BASICO' as 'BASICO',
      isFeatured: false,
      primaryColor: '#0e7490'
    }
  ];

  // Categorias de exemplo
  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'food', label: 'Alimentação' },
    { value: 'clothing', label: 'Vestuário' },
    { value: 'home', label: 'Casa e Decoração' },
    { value: 'beauty', label: 'Beleza e Bem-estar' },
    { value: 'accessories', label: 'Acessórios' },
    { value: 'crafts', label: 'Artesanato' }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Marcas</h1>
          <p className="text-muted-foreground">Descubra marcas independentes portuguesas de qualidade</p>
        </div>

        {/* Banner de destaque */}
        <div className="mb-12 overflow-hidden rounded-lg bg-gradient-to-r from-primary-900 to-primary-700 p-8 text-white">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Quer vender na Rota do Comércio?</h2>
              <p className="mb-6">
                Junte-se a dezenas de marcas independentes portuguesas e alcance milhares de clientes. 
                Oferecemos uma plataforma completa para gerir a sua loja online.
              </p>
              <Button variant="accent" size="lg">
                Comece a Vender
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Vender na Rota do Comércio" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">Pesquisar</label>
                  <Input 
                    type="text" 
                    placeholder="Pesquisar marcas..." 
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Categoria</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Nível de Subscrição</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="subscription-premium"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="subscription-premium" className="ml-2 flex items-center">
                        <Badge variant="accent" className="mr-2">Premium</Badge>
                        <span className="text-sm text-muted-foreground">Marcas Premium</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="subscription-pro"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="subscription-pro" className="ml-2 flex items-center">
                        <Badge variant="primary" className="mr-2">Pro</Badge>
                        <span className="text-sm text-muted-foreground">Marcas Pro</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="subscription-basic"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="subscription-basic" className="ml-2 flex items-center">
                        <Badge variant="default" className="mr-2">Básico</Badge>
                        <span className="text-sm text-muted-foreground">Marcas Básicas</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="only-featured"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="only-featured" className="ml-2 text-sm">
                      Apenas marcas em destaque
                    </label>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Marcas */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="featured">Destaque</option>
                  <option value="name_asc">Nome: A-Z</option>
                  <option value="name_desc">Nome: Z-A</option>
                  <option value="products">Número de Produtos</option>
                  <option value="newest">Mais Recentes</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Mostrando 1-9 de 24 marcas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  id={brand.id}
                  name={brand.name}
                  logo={brand.logo}
                  banner={brand.banner}
                  description={brand.description}
                  productCount={brand.productCount}
                  subscriptionLevel={brand.subscriptionLevel}
                  isFeatured={brand.isFeatured}
                  primaryColor={brand.primaryColor}
                  onClick={() => console.log(`Marca ${brand.id} clicada`)}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <Button variant="primary" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="text-muted-foreground">...</span>
                <Button variant="outline" size="sm">8</Button>
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </nav>
            </div>
          </div>
        </div>

        {/* Seção de Categorias */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Explorar por Categoria</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <a href="/marcas/categoria/alimentacao" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Alimentação"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h3 className="text-xl font-bold text-white">Alimentação</h3>
              </div>
            </a>
            <a href="/marcas/categoria/vestuario" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Vestuário"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h3 className="text-xl font-bold text-white">Vestuário</h3>
              </div>
            </a>
            <a href="/marcas/categoria/casa" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Casa"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h3 className="text-xl font-bold text-white">Casa</h3>
              </div>
            </a>
            <a href="/marcas/categoria/artesanato" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Artesanato"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h3 className="text-xl font-bold text-white">Artesanato</h3>
              </div>
            </a>
          </div>
        </div>

        {/* CTA para Marcas */}
        <div className="mt-16 rounded-lg bg-muted p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Tem uma marca independente?</h2>
              <p className="mb-6 text-muted-foreground">
                Junte-se à Rota do Comércio e alcance novos clientes. Oferecemos uma plataforma completa para gerir a sua loja online, 
                com ferramentas de marketing, gestão de encomendas e integração com transportadoras.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground">Loja online personalizada</span>
                </div>
                <div className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground">Gestão de encomendas e stock</span>
                </div>
                <div className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground">Integração com transportadoras</span>
                </div>
                <div className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground">Ferramentas de marketing e analytics</span>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="primary">Saber Mais</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Vender na Rota do Comércio" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
