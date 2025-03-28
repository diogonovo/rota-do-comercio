import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/product-card';

export default function ProductListPage() {
  // Dados de exemplo para produtos
  const products = [
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
      isNew: true,
      isFeatured: true,
      rating: 4.8
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
      name: 'Candeeiro Artesanal em Cortiça',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 3,
        name: 'Cortiça Design',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      isFeatured: true,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Vinho Tinto Reserva',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 4,
        name: 'Vinhos do Douro',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      discount: 10,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Sabonete Artesanal de Lavanda',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 5,
        name: 'Essências Naturais',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      isNew: true,
      rating: 4.5
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
      id: 7,
      name: 'Mel de Rosmaninho',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 2,
        name: 'Sabores do Alentejo',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      discount: 5,
      rating: 4.9
    },
    {
      id: 8,
      name: 'Porta-Chaves em Cortiça',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 3,
        name: 'Cortiça Design',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 4.3
    }
  ];

  // Categorias de exemplo
  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'clothing', label: 'Vestuário' },
    { value: 'food', label: 'Alimentação' },
    { value: 'home', label: 'Casa e Decoração' },
    { value: 'beauty', label: 'Beleza e Bem-estar' },
    { value: 'accessories', label: 'Acessórios' }
  ];

  // Opções de ordenação
  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'price_asc', label: 'Preço: Menor para Maior' },
    { value: 'price_desc', label: 'Preço: Maior para Menor' },
    { value: 'newest', label: 'Mais Recentes' },
    { value: 'rating', label: 'Melhor Avaliados' }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="text-muted-foreground">Descubra produtos únicos de marcas independentes portuguesas</p>
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
                    placeholder="Pesquisar produtos..." 
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Categoria</label>
                  <Select 
                    options={categories}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Preço</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full"
                    />
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Avaliação</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input
                          id={`rating-${rating}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <svg 
                              key={i}
                              className="h-4 w-4 text-accent"
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <svg 
                              key={i}
                              className="h-4 w-4 text-gray-300"
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-muted-foreground">ou mais</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Marcas</label>
                  <div className="space-y-2">
                    {['Lã Portuguesa', 'Sabores do Alentejo', 'Cortiça Design', 'Vinhos do Douro', 'Essências Naturais'].map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input
                          id={`brand-${brand}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="only-discounted"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="only-discounted" className="ml-2 text-sm">
                      Apenas produtos com desconto
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="only-new"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="only-new" className="ml-2 text-sm">
                      Apenas produtos novos
                    </label>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Produtos */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <Select 
                  options={sortOptions}
                  className="w-48"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Mostrando 1-8 de 24 produtos</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  brand={product.brand}
                  isNew={product.isNew}
                  isFeatured={product.isFeatured}
                  discount={product.discount}
                  rating={product.rating}
                  onClick={() => console.log(`Produto ${product.id} clicado`)}
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
      </div>
    </MainLayout>
  );
}
