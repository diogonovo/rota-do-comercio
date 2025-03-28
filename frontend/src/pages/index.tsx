import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';
import { BrandCard } from '@/components/brand/brand-card';

export default function HomePage() {
  // Dados de exemplo para produtos em destaque
  const featuredProducts = [
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
    }
  ];

  // Dados de exemplo para marcas em destaque
  const featuredBrands = [
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
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Descubra o melhor das marcas independentes portuguesas
            </h1>
            <p className="mb-8 text-lg text-white/90">
              A Rota do Comércio conecta-o às melhores marcas pequenas e independentes de Portugal, oferecendo produtos únicos e autênticos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="accent">
                Explorar Produtos
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-900">
                Para Marcas
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">Produtos em Destaque</h2>
            <Button variant="outline">Ver Todos</Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-2xl font-bold md:text-3xl">Categorias Populares</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <a href="/categoria/moda" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Moda"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h3 className="text-xl font-bold text-white">Moda</h3>
              </div>
            </a>
            <a href="/categoria/casa" className="group relative overflow-hidden rounded-lg">
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
            <a href="/categoria/alimentacao" className="group relative overflow-hidden rounded-lg">
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
            <a href="/categoria/artesanato" className="group relative overflow-hidden rounded-lg">
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
      </section>

      {/* Featured Brands Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">Marcas em Destaque</h2>
            <Button variant="outline">Ver Todas</Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBrands.map((brand) => (
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">O Que Dizem Sobre Nós</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-soft">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="Cliente"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Ana Silva</h4>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Adoro a Rota do Comércio! Encontrei marcas portuguesas incríveis que não conhecia e os produtos são de excelente qualidade. O processo de compra é simples e o atendimento ao cliente é excelente."
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-soft">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="Cliente"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">João Oliveira</h4>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Uma plataforma fantástica para descobrir produtos únicos e apoiar pequenos negócios portugueses. Já fiz várias compras e nunca fiquei desiludido. Recomendo vivamente!"
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-soft">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="Cliente"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Maria Santos</h4>
                  <p className="text-sm text-muted-foreground">Marca Vendedora</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Como pequena marca portuguesa, a Rota do Comércio deu-nos uma visibilidade que nunca teríamos conseguido sozinhos. A plataforma é intuitiva e o suporte é excelente. As nossas vendas aumentaram significativamente!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Pronto para Começar?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Junte-se a milhares de clientes satisfeitos ou torne-se um vendedor na nossa plataforma. A Rota do Comércio está aqui para ajudar o seu negócio a crescer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="accent">
              Explorar Produtos
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Vender na Plataforma
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
