import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

interface BrandCardProps {
  id: number;
  name: string;
  logo: string;
  banner?: string;
  description: string;
  productCount: number;
  subscriptionLevel: 'BASICO' | 'PRO' | 'PREMIUM';
  isFeatured?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
  onClick?: () => void;
}

const BrandCard: React.FC<BrandCardProps> = ({
  id,
  name,
  logo,
  banner,
  description,
  productCount,
  subscriptionLevel,
  isFeatured = false,
  primaryColor,
  secondaryColor,
  className,
  onClick,
}) => {
  const subscriptionBadgeVariant = {
    'BASICO': 'default',
    'PRO': 'primary',
    'PREMIUM': 'accent',
  }[subscriptionLevel] as 'default' | 'primary' | 'accent';

  const subscriptionLabel = {
    'BASICO': 'Básico',
    'PRO': 'Pro',
    'PREMIUM': 'Premium',
  }[subscriptionLevel];

  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-card",
        className
      )}
      onClick={onClick}
      style={{
        '--brand-primary': primaryColor,
        '--brand-secondary': secondaryColor,
      } as React.CSSProperties}
    >
      <div className="relative h-32 overflow-hidden bg-muted">
        {banner ? (
          <img
            src={banner}
            alt={`${name} banner`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div 
            className="h-full w-full" 
            style={{ 
              background: primaryColor || 'var(--primary)',
              opacity: 0.8
            }}
          />
        )}
        
        {isFeatured && (
          <div className="absolute top-2 right-2">
            <Badge variant="accent">Destaque</Badge>
          </div>
        )}
        
        <div className="absolute -bottom-8 left-4">
          <Avatar 
            src={logo} 
            alt={name}
            size="xl"
            className="ring-4 ring-background"
          />
        </div>
      </div>
      
      <div className="flex flex-col p-4 pt-10">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Badge variant={subscriptionBadgeVariant} size="sm">
            {subscriptionLabel}
          </Badge>
        </div>
        
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {productCount} produto{productCount !== 1 ? 's' : ''}
          </span>
          
          <Button 
            variant="primary" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Visitar Loja
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BrandCard };
