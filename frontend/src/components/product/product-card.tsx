import React from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: {
    id: number;
    name: string;
    logo?: string;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  rating?: number;
  className?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  brand,
  isNew = false,
  isFeatured = false,
  discount = 0,
  rating,
  className,
  onClick,
}) => {
  const formattedPrice = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  const discountedPrice = discount > 0 
    ? new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
      }).format(price * (1 - discount / 100))
    : null;

  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card",
        className
      )}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              Novo
            </span>
          )}
          {isFeatured && (
            <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              Destaque
            </span>
          )}
          {discount > 0 && (
            <span className="inline-block rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">
              -{discount}%
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col p-4">
        <div className="mb-2 flex items-center">
          {brand.logo ? (
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="mr-2 h-4 w-4 rounded-full object-cover" 
            />
          ) : null}
          <span className="text-xs text-muted-foreground">{brand.name}</span>
        </div>
        
        <h3 className="mb-1 line-clamp-2 text-sm font-medium">{name}</h3>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {discount > 0 ? (
              <>
                <span className="text-sm font-bold text-foreground">{discountedPrice}</span>
                <span className="text-xs text-muted-foreground line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="text-sm font-bold text-foreground">{formattedPrice}</span>
            )}
          </div>
          
          {rating && (
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
              <span className="ml-1 text-xs">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-12 translate-y-full bg-primary p-2 transition-transform duration-300 group-hover:translate-y-0">
        <button className="flex h-full w-full items-center justify-center rounded-md bg-primary-foreground text-sm font-medium text-primary">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export { ProductCard };
