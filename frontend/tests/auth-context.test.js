import { test, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthContext, { AuthProvider } from '../src/contexts/auth-context';
import { useContext } from 'react';

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
  register: jest.fn((userData) => {
    if (userData.email === 'new@example.com') {
      return Promise.resolve({ 
        success: true, 
        user: { id: 2, name: userData.name, email: userData.email, role: 'CUSTOMER' },
        token: 'fake-token-456'
      });
    }
    return Promise.resolve({ success: false, message: 'Email já registado' });
  }),
  logout: jest.fn(() => Promise.resolve({ success: true })),
}));

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { user, isAuthenticated, login, register, logout } = useContext(AuthContext);
  
  return (
    <div>
      <div data-testid="is-authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      {user && <div data-testid="user-name">{user.name}</div>}
      
      <button onClick={() => login('test@example.com', 'password123')}>
        Login
      </button>
      
      <button onClick={() => register({
        name: 'Novo Utilizador',
        email: 'new@example.com',
        password: 'password456'
      })}>
        Registar
      </button>
      
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('Contexto de Autenticação', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  test('deve iniciar sem utilizador autenticado', () => {
    expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
  });

  test('deve autenticar um utilizador com sucesso', async () => {
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated').textContent).toBe('true');
      expect(screen.getByTestId('user-name').textContent).toBe('Utilizador Teste');
    });
  });

  test('deve registar um novo utilizador com sucesso', async () => {
    const registerButton = screen.getByText('Registar');
    fireEvent.click(registerButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated').textContent).toBe('true');
      expect(screen.getByTestId('user-name').textContent).toBe('Novo Utilizador');
    });
  });

  test('deve fazer logout com sucesso', async () => {
    // Primeiro faz login
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated').textContent).toBe('true');
    });
    
    // Depois faz logout
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated').textContent).toBe('false');
    });
  });
});
