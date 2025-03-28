import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

export default function ProductDetailPage() {
  // Dados de exemplo para o produto
  const product = {
    id: 1,
    name: 'Camisola de Lã Merino',
    price: 79.99,
    discount: 0,
    description: 'Camisola de lã merino 100% natural, produzida artesanalmente em Portugal. Perfeita para os dias mais frios, esta peça combina o conforto e qualidade da lã merino com um design contemporâneo e versátil.',
    features: [
      'Lã merino 100% natural',
      'Produção artesanal portuguesa',
      'Tecido respirável e anti-odor',
      'Regulação térmica natural',
      'Macia e confortável contra a pele',
      'Durável e sustentável'
    ],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    brand: {
      id: 1,
      name: 'Lã Portuguesa',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      description: 'Produtos de lã merino de alta qualidade, produzidos artesanalmente em Portugal.',
      foundedYear: 2015,
      location: 'Serra da Estrela, Portugal'
    },
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    variants: [
      { id: 1, name: 'Tamanho', options: ['S', 'M', 'L', 'XL'] },
      { id: 2, name: 'Cor', options: ['Natural', 'Cinza', 'Azul Marinho', 'Verde Escuro'] }
    ],
    categories: ['Vestuário', 'Lã', 'Artesanal'],
    isNew: true,
    isFeatured: true,
    shippingInfo: 'Envio em 1-3 dias úteis. Entrega gratuita para compras acima de €50.',
    returnPolicy: 'Devoluções aceites no prazo de 30 dias após a compra.'
  };

  // Dados de exemplo para produtos relacionados
  const relatedProducts = [
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
      id: 9,
      name: 'Cachecol de Lã Merino',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 1,
        name: 'Lã Portuguesa',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 4.6
    },
    {
      id: 10,
      name: 'Gorro de Lã Artesanal',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      brand: {
        id: 1,
        name: 'Lã Portuguesa',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      discount: 10,
      rating: 4.5
    }
  ];

  // Estado para controlar a imagem principal
  const [mainImage, setMainImage] = React.useState(product.images[0]);
  // Estados para as variantes selecionadas
  const [selectedSize, setSelectedSize] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');
  // Estado para a quantidade
  const [quantity, setQuantity] = React.useState(1);

  // Formatar preço
  const formattedPrice = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  // Formatar preço com desconto
  const discountedPrice = product.discount > 0 
    ? new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
      }).format(product.price * (1 - product.discount / 100))
    : null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Início</a>
          <span>/</span>
          <a href="/produtos" className="hover:text-foreground">Produtos</a>
          <span>/</span>
          <a href="/produtos/categoria/vestuario" className="hover:text-foreground">Vestuário</a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Galeria de Imagens */}
          <div>
            <div className="mb-4 overflow-hidden rounded-lg bg-muted">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`overflow-hidden rounded-md border-2 ${image === mainImage ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Imagem ${index + 1}`} 
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div>
            <div className="mb-6 flex items-center">
              <a href={`/marcas/${product.brand.id}`} className="flex items-center">
                <Avatar 
                  src={product.brand.logo} 
                  alt={product.brand.name}
                  size="sm"
                  className="mr-2"
                />
                <span className="text-sm font-medium">{product.brand.name}</span>
              </a>
            </div>

            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

            <div className="mb-4 flex items-center">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-accent' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} avaliações)
                </span>
              </div>
            </div>

            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-foreground">{discountedPrice}</span>
                  <span className="ml-2 text-lg text-muted-foreground line-through">{formattedPrice}</span>
                  <Badge variant="destructive" className="ml-2">-{product.discount}%</Badge>
                </div>
              ) : (
                <span className="text-2xl font-bold text-foreground">{formattedPrice}</span>
              )}
              <p className="mt-1 text-sm text-muted-foreground">
                Inclui IVA a 23%
              </p>
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="mb-6 space-y-4">
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <label className="mb-2 block text-sm font-medium">
                    {variant.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        className={`rounded-md border px-4 py-2 text-sm ${
                          (variant.name === 'Tamanho' && selectedSize === option) || 
                          (variant.name === 'Cor' && selectedColor === option)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => {
                          if (variant.name === 'Tamanho') setSelectedSize(option);
                          if (variant.name === 'Cor') setSelectedColor(option);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Quantidade
              </label>
              <div className="flex w-32 items-center rounded-md border border-border">
                <button
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-10 w-12 border-x border-border bg-transparent text-center text-sm focus:outline-none"
                />
                <button
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.stock} unidades disponíveis
              </p>
            </div>

            <div className="mb-6 flex space-x-4">
              <Button variant="primary" size="lg" className="flex-grow">
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="lg">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Button>
            </div>

            <div className="space-y-4 rounded-lg border border-border p-4">
              <div className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{product.shippingInfo}</span>
              </div>
              <div className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{product.returnPolicy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes do Produto */}
        <div className="mt-12">
          <div className="mb-8 border-b border-border">
            <div className="flex space-x-8">
              <button className="border-b-2 border-primary px-4 py-2 font-medium text-foreground">
                Detalhes
              </button>
              <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground">
                Avaliações ({product.reviewCount})
              </button>
              <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground">
                Envio e Devoluções
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-xl font-bold">Descrição</h2>
              <p className="mb-6 text-muted-foreground">
                {product.description}
              </p>

              <h2 className="mb-4 text-xl font-bold">Características</h2>
              <ul className="mb-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sobre a Marca</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center">
                    <Avatar 
                      src={product.brand.logo} 
                      alt={product.brand.name}
                      size="lg"
                      className="mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{product.brand.name}</h3>
                      <p className="text-sm text-muted-foreground">Desde {product.brand.foundedYear}</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {product.brand.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Localização:</strong> {product.brand.location}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver Perfil da Marca
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {relatedProduct.discount && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-block rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">
                        -{relatedProduct.discount}%
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col p-4">
                  <div className="mb-2 flex items-center">
                    <img 
                      src={relatedProduct.brand.logo} 
                      alt={relatedProduct.brand.name} 
                      className="mr-2 h-4 w-4 rounded-full object-cover" 
                    />
                    <span className="text-xs text-muted-foreground">{relatedProduct.brand.name}</span>
                  </div>
                  
                  <h3 className="mb-1 line-clamp-2 text-sm font-medium">{relatedProduct.name}</h3>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {new Intl.NumberFormat('pt-PT', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(relatedProduct.price)}
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
                      <span className="ml-1 text-xs">{relatedProduct.rating.toFixed(1)}</span>
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
      </div>
    </MainLayout>
  );
}
