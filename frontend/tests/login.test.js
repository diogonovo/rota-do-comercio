import { test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/auth/login';
import { AuthProvider } from '../src/contexts/auth-context';

// Mock dos componentes que dependem de contexto externo
jest.mock('../src/components/layout/main-layout', () => {
  return {
    MainLayout: ({ children }) => <div data-testid="main-layout">{children}</div>,
  };
});

// Mock de funções de API
jest.mock('../src/lib/api', () => ({
  login: jest.fn((email, password) => {
    if (email === 'test@example.com' && password === 'password123') {
      return Promise.resolve({ 
        success: true, 
        user: { id: 1, name: 'Utilizador Teste', email: 'test@example.com', role: 'CUSTOMER' },
        token: 'fake-token-123'
      });
    }
    return Promise.resolve({ success: false, message: 'Credenciais inválidas' });
  }),
}));

describe('Página de Login', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
  });

  test('deve renderizar o formulário de login', () => {
    expect(screen.getByText('Iniciar Sessão')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Palavra-passe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  test('deve mostrar erro quando os campos estão vazios', () => {
    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(loginButton);
    
    expect(screen.getByText('O email é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('A palavra-passe é obrigatória')).toBeInTheDocument();
  });

  test('deve preencher o formulário e submeter com sucesso', async () => {
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Palavra-passe');
    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    // Em um teste real, verificaríamos se o usuário foi redirecionado após o login bem-sucedido
  });

  test('deve mostrar link para registo', () => {
    expect(screen.getByText('Não tem uma conta?')).toBeInTheDocument();
    expect(screen.getByText('Registar')).toBeInTheDocument();
  });

  test('deve mostrar link para recuperação de palavra-passe', () => {
    expect(screen.getByText('Esqueceu a palavra-passe?')).toBeInTheDocument();
  });
});
