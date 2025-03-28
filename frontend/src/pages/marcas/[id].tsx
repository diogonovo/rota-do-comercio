import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export default function BrandDetailPage() {
  // Dados de exemplo para a marca
  const brand = {
    id: 1,
    name: 'Lã Portuguesa',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    banner: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Produtos de lã merino de alta qualidade, produzidos artesanalmente em Portugal. A Lã Portuguesa nasceu da paixão pela tradição têxtil portuguesa e pelo desejo de valorizar a lã merino nacional, criando peças únicas que combinam técnicas ancestrais com design contemporâneo.',
    longDescription: 'A Lã Portuguesa foi fundada em 2015 na região da Serra da Estrela, berço da produção de lã em Portugal. Trabalhamos diretamente com pastores locais, garantindo a sustentabilidade da produção e o bem-estar animal. Cada peça é produzida artesanalmente, respeitando técnicas tradicionais que são passadas de geração em geração.\n\nA nossa missão é valorizar a lã merino portuguesa, criando produtos de qualidade superior que destacam a excelência deste material natural. Acreditamos na produção sustentável e no comércio justo, contribuindo para a economia local e para a preservação do património cultural português.\n\nTodos os nossos produtos são feitos com lã merino 100% natural, conhecida pela sua suavidade, durabilidade e propriedades térmicas excepcionais. Não utilizamos químicos agressivos nos nossos processos, optando por tinturaria natural sempre que possível.',
    foundedYear: 2015,
    location: 'Serra da Estrela, Portugal',
    subscriptionLevel: 'PREMIUM',
    productCount: 24,
    rating: 4.8,
    reviewCount: 156,
    socialMedia: {
      website: 'https://www.laportuguesa.pt',
      instagram: '@laportuguesa',
      facebook: 'LaPortuguesa',
      twitter: '@laportuguesa'
    },
    team: [
      {
        name: 'Maria Silva',
        role: 'Fundadora e Diretora Criativa',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'João Santos',
        role: 'Mestre Artesão',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    ],
    values: [
      'Sustentabilidade',
      'Artesanato tradicional',
      'Qualidade premium',
      'Comércio justo',
      'Produção local'
    ]
  };

  // Dados de exemplo para produtos da marca
  const products = [
    {
      id: 1,
      name: 'Camisola de Lã Merino',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isNew: true,
      isFeatured: true,
      rating: 4.8
    },
    {
      id: 6,
      name: 'Manta de Linho Natural',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.4
    },
    {
      id: 9,
      name: 'Cachecol de Lã Merino',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6
    },
    {
      id: 10,
      name: 'Gorro de Lã Artesanal',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      discount: 10,
      rating: 4.5
    },
    {
      id: 12,
      name: 'Luvas de Lã Merino',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isNew: true,
      rating: 4.7
    },
    {
      id: 15,
      name: 'Almofada em Lã Natural',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.3
    }
  ];

  return (
    <MainLayout>
      <div>
        {/* Banner da Marca */}
        <div className="relative h-64 w-full overflow-hidden md:h-80">
          <img 
            src={brand.banner} 
            alt={`${brand.name} Banner`} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="container mx-auto flex items-center">
              <Avatar 
                src={brand.logo} 
                alt={brand.name}
                size="xl"
                className="mr-4 border-4 border-white"
              />
              <div>
                <h1 className="text-2xl font-bold text-white md:text-3xl">{brand.name}</h1>
                <p className="text-white/80">{brand.location} • Desde {brand.foundedYear}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Badge variant="premium">Marca Premium</Badge>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(brand.rating) ? 'text-accent' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {brand.rating} ({brand.reviewCount} avaliações)
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Seguir
              </Button>
              <Button variant="outline" size="sm">
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Partilhar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Informações da Marca */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre a Marca</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {brand.description}
                  </p>
                  <div className="whitespace-pre-line text-muted-foreground">
                    {brand.longDescription}
                  </div>

                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">Os Nossos Valores</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand.values.map((value, index) => (
                        <Badge key={index} variant="outline">{value}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">A Nossa Equipa</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {brand.team.map((member, index) => (
                        <div key={index} className="flex items-center rounded-lg border border-border p-4">
                          <Avatar 
                            src={member.image} 
                            alt={member.name}
                            size="md"
                            className="mr-4"
                          />
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Localização</p>
                    <p className="text-muted-foreground">{brand.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Fundada em</p>
                    <p className="text-muted-foreground">{brand.foundedYear}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Produtos</p>
                    <p className="text-muted-foreground">{brand.productCount} produtos disponíveis</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nível de Subscrição</p>
                    <Badge variant="premium">Premium</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contactos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <a href={brand.socialMedia.website} className="text-primary hover:underline">{brand.socialMedia.website}</a>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Redes Sociais</p>
                    <div className="mt-2 flex space-x-2">
                      <a href="#" className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="#" className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                      <a href="#" className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Produtos da Marca */}
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Produtos</h2>
              <Button variant="outline" size="sm">Ver Todos</Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
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
                    {product.isNew && (
                      <div className="absolute top-2 left-2">
                        <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                          Novo
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col p-4">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium">{product.name}</h3>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">
                        {new Intl.NumberFormat('pt-PT', {
                          style: 'currency',
                          currency: 'EUR',
                        }).format(product.price)}
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
          </div>

          {/* Avaliações */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Avaliações</h2>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-5xl font-bold">{brand.rating}</p>
                      <div className="my-2 flex justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i}
                            className={`h-6 w-6 ${i < Math.floor(brand.rating) ? 'text-accent' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground">{brand.reviewCount} avaliações</p>
                    </div>

                    <div className="mt-6 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        // Percentagens fictícias para demonstração
                        const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                        return (
                          <div key={star} className="flex items-center">
                            <div className="flex w-24 items-center">
                              <span className="mr-2">{star}</span>
                              <svg 
                                className="h-4 w-4 text-accent"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <div className="flex-grow">
                              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div 
                                  className="h-full bg-accent" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="ml-2 w-10 text-right text-sm text-muted-foreground">
                              {percentage}%
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6">
                      <Button variant="outline" className="w-full">Escrever Avaliação</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {/* Avaliações de exemplo */}
                  {[1, 2, 3].map((review) => (
                    <Card key={review}>
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-center">
                            <Avatar 
                              src={`https://i.pravatar.cc/150?img=${review + 10}`} 
                              alt={`Utilizador ${review}`}
                              size="sm"
                              className="mr-3"
                            />
                            <div>
                              <p className="font-medium">Utilizador {review}</p>
                              <p className="text-xs text-muted-foreground">
                                {review === 1 ? '12 de março de 2025' : review === 2 ? '3 de março de 2025' : '18 de fevereiro de 2025'}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i}
                                className={`h-4 w-4 ${i < (review === 3 ? 4 : 5) ? 'text-accent' : 'text-gray-300'}`}
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <h4 className="mb-2 font-medium">
                          {review === 1 
                            ? 'Produtos de excelente qualidade' 
                            : review === 2 
                              ? 'Atendimento excepcional' 
                              : 'Boa relação qualidade-preço'}
                        </h4>
                        <p className="text-muted-foreground">
                          {review === 1 
                            ? 'Comprei várias peças desta marca e estou extremamente satisfeito com a qualidade. A lã é macia, confortável e durável. Recomendo vivamente!' 
                            : review === 2 
                              ? 'Tive um problema com uma encomenda e o serviço de apoio ao cliente foi extremamente prestável e resolveu a situação rapidamente. Muito profissionais!' 
                              : 'Os produtos têm uma excelente relação qualidade-preço. São um pouco mais caros que outras marcas, mas a qualidade compensa totalmente o investimento.'}
                        </p>
                        {review === 1 && (
                          <div className="mt-4 flex space-x-2">
                            <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                              <img 
                                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                                alt="Produto" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                              <img 
                                src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                                alt="Produto" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  <div className="mt-4 text-center">
                    <Button variant="outline">Ver Mais Avaliações</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
