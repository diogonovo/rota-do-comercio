import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Rota do Comércio</span>
          </a>
          
          <nav className="hidden md:ml-10 md:flex md:space-x-8">
            <a href="/marcas" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Marcas
            </a>
            <a href="/categorias" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Categorias
            </a>
            <a href="/produtos" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Produtos
            </a>
            <a href="/sobre" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Sobre
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <a href="/carrinho" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              0
            </span>
          </a>
          
          <div className="hidden md:block">
            <Button variant="primary" size="sm" className="mr-2">
              Entrar
            </Button>
            <Button variant="outline" size="sm">
              Registar
            </Button>
          </div>
          
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
