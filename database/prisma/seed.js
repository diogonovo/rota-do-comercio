// Seed para dados iniciais da base de dados
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed da base de dados...');

  // Limpar dados existentes
  await prisma.avaliacao.deleteMany({});
  await prisma.comissao.deleteMany({});
  await prisma.pagamento.deleteMany({});
  await prisma.envio.deleteMany({});
  await prisma.itemEncomenda.deleteMany({});
  await prisma.encomenda.deleteMany({});
  await prisma.endereco.deleteMany({});
  await prisma.varianteProduto.deleteMany({});
  await prisma.imagemProduto.deleteMany({});
  await prisma.produto.deleteMany({});
  await prisma.subscricao.deleteMany({});
  await prisma.transportadora.deleteMany({});
  await prisma.cliente.deleteMany({});
  await prisma.marca.deleteMany({});
  await prisma.utilizador.deleteMany({});

  console.log('Base de dados limpa. Criando novos dados...');

  // Criar utilizador administrador
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.utilizador.create({
    data: {
      email: 'admin@rotadocomercio.pt',
      password: adminPassword,
      nome: 'Administrador',
      tipo: 'ADMIN',
    },
  });
  console.log('Administrador criado:', admin.email);

  // Criar transportadoras
  const transportadoras = await Promise.all([
    prisma.transportadora.create({
      data: {
        nome: 'CTT',
        codigo: 'CTT',
        apiKey: 'ctt_api_key_test',
      },
    }),
    prisma.transportadora.create({
      data: {
        nome: 'DPD',
        codigo: 'DPD',
        apiKey: 'dpd_api_key_test',
      },
    }),
    prisma.transportadora.create({
      data: {
        nome: 'GLS',
        codigo: 'GLS',
        apiKey: 'gls_api_key_test',
      },
    }),
  ]);
  console.log('Transportadoras criadas:', transportadoras.length);

  // Criar marcas de exemplo
  const marcaPassword = await bcrypt.hash('marca123', 10);
  
  // Marca 1 - Nível Básico
  const utilizadorMarca1 = await prisma.utilizador.create({
    data: {
      email: 'artesanato@exemplo.pt',
      password: marcaPassword,
      nome: 'Artesanato Português',
      tipo: 'MARCA',
    },
  });

  const marca1 = await prisma.marca.create({
    data: {
      utilizadorId: utilizadorMarca1.id,
      nome: 'Artesanato Português',
      descricao: 'Produtos artesanais tradicionais portugueses feitos à mão.',
      logoUrl: 'https://exemplo.com/logo-artesanato.png',
      contacto: '912345678',
      morada: 'Rua do Artesanato, 123',
      codigoPostal: '1000-001',
      localidade: 'Lisboa',
      nif: '123456789',
      nivelSubscricao: 'BASICO',
    },
  });

  await prisma.subscricao.create({
    data: {
      marcaId: marca1.id,
      nivel: 'BASICO',
      valorMensal: 19.99,
      valorAnual: 199.99,
      periodicidade: 'MENSAL',
      estado: 'ATIVA',
      dataInicio: new Date(),
      dataFim: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      metodoPagamento: 'CARTAO',
    },
  });

  // Marca 2 - Nível Pro
  const utilizadorMarca2 = await prisma.utilizador.create({
    data: {
      email: 'moda@exemplo.pt',
      password: marcaPassword,
      nome: 'Moda Portuguesa',
      tipo: 'MARCA',
    },
  });

  const marca2 = await prisma.marca.create({
    data: {
      utilizadorId: utilizadorMarca2.id,
      nome: 'Moda Portuguesa',
      descricao: 'Roupas e acessórios de designers portugueses.',
      logoUrl: 'https://exemplo.com/logo-moda.png',
      contacto: '923456789',
      morada: 'Avenida da Moda, 456',
      codigoPostal: '4000-002',
      localidade: 'Porto',
      nif: '234567890',
      nivelSubscricao: 'PRO',
    },
  });

  await prisma.subscricao.create({
    data: {
      marcaId: marca2.id,
      nivel: 'PRO',
      valorMensal: 49.99,
      valorAnual: 499.99,
      periodicidade: 'MENSAL',
      estado: 'ATIVA',
      dataInicio: new Date(),
      dataFim: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      metodoPagamento: 'CARTAO',
    },
  });

  // Marca 3 - Nível Premium
  const utilizadorMarca3 = await prisma.utilizador.create({
    data: {
      email: 'gourmet@exemplo.pt',
      password: marcaPassword,
      nome: 'Gourmet Português',
      tipo: 'MARCA',
    },
  });

  const marca3 = await prisma.marca.create({
    data: {
      utilizadorId: utilizadorMarca3.id,
      nome: 'Gourmet Português',
      descricao: 'Produtos alimentares gourmet de produtores portugueses.',
      logoUrl: 'https://exemplo.com/logo-gourmet.png',
      contacto: '934567890',
      morada: 'Praça da Gastronomia, 789',
      codigoPostal: '3000-003',
      localidade: 'Coimbra',
      nif: '345678901',
      nivelSubscricao: 'PREMIUM',
    },
  });

  await prisma.subscricao.create({
    data: {
      marcaId: marca3.id,
      nivel: 'PREMIUM',
      valorMensal: 99.99,
      valorAnual: 999.99,
      periodicidade: 'MENSAL',
      estado: 'ATIVA',
      dataInicio: new Date(),
      dataFim: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      metodoPagamento: 'CARTAO',
    },
  });

  console.log('Marcas criadas:', 3);

  // Criar produtos para cada marca
  // Produtos para Marca 1 (Artesanato)
  const produtos1 = await Promise.all([
    prisma.produto.create({
      data: {
        marcaId: marca1.id,
        nome: 'Azulejo Tradicional',
        descricao: 'Azulejo pintado à mão com motivos tradicionais portugueses.',
        preco: 24.99,
        stock: 50,
        categoria: 'Decoração',
        subcategoria: 'Azulejos',
        destaque: true,
        imagens: {
          create: [
            {
              url: 'https://exemplo.com/azulejo1.jpg',
              ordem: 1,
            },
          ],
        },
      },
    }),
    prisma.produto.create({
      data: {
        marcaId: marca1.id,
        nome: 'Galo de Barcelos',
        descricao: 'Galo de Barcelos em cerâmica pintado à mão.',
        preco: 19.99,
        stock: 30,
        categoria: 'Decoração',
        subcategoria: 'Cerâmica',
        imagens: {
          create: [
            {
              url: 'https://exemplo.com/galo1.jpg',
              ordem: 1,
            },
          ],
        },
      },
    }),
  ]);

  // Produtos para Marca 2 (Moda)
  const produtos2 = await Promise.all([
    prisma.produto.create({
      data: {
        marcaId: marca2.id,
        nome: 'Camisa de Linho',
        descricao: 'Camisa de linho português de alta qualidade.',
        preco: 59.99,
        precoPromocional: 49.99,
        stock: 20,
        categoria: 'Vestuário',
        subcategoria: 'Camisas',
        destaque: true,
        imagens: {
          create: [
            {
              url: 'https://exemplo.com/camisa1.jpg',
              ordem: 1,
            },
            {
              url: 'https://exemplo.com/camisa2.jpg',
              ordem: 2,
            },
          ],
        },
        variantes: {
          create: [
            {
              nome: 'Tamanho',
              valor: 'S',
              stock: 5,
            },
            {
              nome: 'Tamanho',
              valor: 'M',
              stock: 8,
            },
            {
              nome: 'Tamanho',
              valor: 'L',
              stock: 7,
            },
          ],
        },
      },
    }),
    prisma.produto.create({
      data: {
        marcaId: marca2.id,
        nome: 'Lenço de Seda',
        descricao: 'Lenço de seda com padrões inspirados em azulejos portugueses.',
        preco: 39.99,
        stock: 15,
        categoria: 'Acessórios',
        subcategoria: 'Lenços',
        imagens: {
          create: [
            {
              url: 'https://exemplo.com/lenco1.jpg',
              ordem: 1,
            },
            {
              url: 'https://exemplo.com/lenco2.jpg',
              ordem: 2,
            },
          ],
        },
        variantes: {
          create: [
            {
              nome: 'Cor',
              valor: 'Azul',
              stock: 5,
            },
            {
              nome: 'Cor',
              valor: 'Verde',
              stock: 5,
            },
            {
              nome: 'Cor',
              valor: 'Vermelho',
              stock: 5,
            },
          ],
        },
      },
    }),
  ]);

  // Produtos para Marca 3 (Gourmet)
  const produtos3 = await Promise.all([
    prisma.produto.create({
      data: {
        marcaId: marca3.id,
        nome: 'Azeite Extra Virgem',
        descricao: 'Azeite extra virgem premium de oliveiras centenárias.',
        preco: 14.99,
        stock: 100,
        categoria: 'Alimentação',
        subcategoria: 'Azeites',
        destaque: true,
        imagens: {
          create: [
            {
              url: 'https://exemplo.com/azeite1.jpg',
              ordem: 1,
            },
            {
              url: 'https://exemplo.com/azeite2.jpg',
              ordem: 2,
            },
            {
              url: 'https://exemplo.com/azeite3.jpg',
              ordem: 3,
            },
          ],
        },
        variantes: {
          create: [
            {
              nome: 'Tamanho',
              valor: '250ml',
              precoAdicional: 0,
              stock: 40,
            },
            {
              nome: 'Tamanho',
              valor: '500ml',
              precoAdicional: 10,
              stock: 40,
            },
            {
              nome: 'Tamanho',
              valor: '1L',
              precoAdicional: 20,
              stock: 20,
            },
          ],
        },
      },
    }),
    prisma.produto.create({
      data: {
        marcaId: marca3.id,
        nome: 'Conserva de Sardinhas',
        descricao: 'Sardinhas em conserva de alta qualidade em azeite português.',
        preco: 7.99,
        stock: 150,
        categoria: 'Alimentação',
        subcategoria: 'Conservas',
        imagens: {
          create: [
            {
              url: 'https://exemplo.com/sardinhas1.jpg',
              ordem: 1,
            },
            {
              url: 'https://exemplo.com/sardinhas2.jpg',
              ordem: 2,
            },
          ],
        },
      },
    }),
    prisma.produto.create({
      data: {
        marcaId: marca3.id,
        nome: 'Vinho Tinto Reserva',
        descricao: 'Vinho tinto reserva do Douro, colheita especial.',
        preco: 29.99,
        stock: 50,
        categoria: 'Bebidas',
        subcategoria: 'Vinhos',
        destaque: true,
        imagens: {
          create: [
            {
              url: 'https://exemplo.com/vinho1.jpg',
              ordem: 1,
            },
            {
              url: 'https://exemplo.com/vinho2.jpg',
              ordem: 2,
            },
          ],
        },
      },
    }),
  ]);

  console.log('Produtos criados:', produtos1.length + produtos2.length + produtos3.length);

  // Criar clientes
  const clientePassword = await bcrypt.hash('cliente123', 10);
  
  const utilizadorCliente1 = await prisma.utilizador.create({
    data: {
      email: 'joao@exemplo.pt',
      password: clientePassword,
      nome: 'João Silva',
      tipo: 'CLIENTE',
    },
  });

  const cliente1 = await prisma.cliente.create({
    data: {
      utilizadorId: utilizadorCliente1.id,
      nome: 'João',
      apelido: 'Silva',
      telefone: '912345678',
      dataNascimento: new Date('1985-05-15'),
      enderecos: {
        create: [
          {
            tipo: 'AMBOS',
            morada: 'Rua das Flores, 123',
            codigoPostal: '1000-001',
            localidade: 'Lisboa',
            predefinido: true,
          },
        ],
      },
    },
  });

  const utilizadorCliente2 = await prisma.utilizador.create({
    data: {
      email: 'maria@exemplo.pt',
      password: clientePassword,
      nome: 'Maria Santos',
      tipo: 'CLIENTE',
    },
  });

  const cliente2 = await prisma.cliente.create({
    data: {
      utilizadorId: utilizadorCliente2.id,
      nome: 'Maria',
      apelido: 'Santos',
      telefone: '923456789',
      dataNascimento: new Date('1990-10-20'),
      enderecos: {
        create: [
          {
            tipo: 'ENTREGA',
            morada: 'Avenida da República, 456',
            codigoPostal: '4000-002',
            localidade: 'Porto',
            predefinido: true,
          },
          {
            tipo: 'FATURACAO',
            morada: 'Rua do Comércio, 789',
            codigoPostal: '4000-003',
            localidade: 'Porto',
            predefinido: true,
          },
        ],
      },
    },
  });

  console.log('Clientes criados:', 2);

  // Criar algumas encomendas
  const endereco1 = await prisma.endereco.findFirst({
    where: { clienteId: cliente1.id },
  });

  const endereco2Entrega = await prisma.endereco.findFirst({
    where: { clienteId: cliente2.id, tipo: 'ENTREGA' },
  });

  const endereco2Faturacao = await prisma.endereco.findFirst({
    where: { clienteId: cliente2.id, tipo: 'FATURACAO' },
  });

  // Encomenda 1 - Cliente 1, Marca 1
  const encomenda1 = await prisma.encomenda.create({
    data: {
      clienteId: cliente1.id,
      marcaId: marca1.id,
      referencia: 'ORD-' + Date.now() + '-1',
      valorProdutos: 24.99,
      valorEnvio: 5.00,
      valorTotal: 29.99,
      estado: 'ENTREGUE',
      metodoPagamento: 'CARTAO',
      referenciaPagamento: 'PAY-' + Date.now() + '-1',
      dataPagamento: new Date(new Date().setDate(new Date().getDate() - 10)),
      enderecoEntregaId: endereco1.id,
      enderecoFaturacaoId: endereco1.id,
      itens: {
        create: [
          {
            produtoId: produtos1[0].id,
            quantidade: 1,
            precoUnitario: 24.99,
            precoTotal: 24.99,
          },
        ],
      },
      envio: {
        create: {
          transportadoraId: transportadoras[0].id,
          referencia: 'SHP-' + Date.now() + '-1',
          estado: 'ENTREGUE',
          codigoRastreio: 'TRK-' + Date.now() + '-1',
          urlRastreio: 'https://ctt.pt/rastreio?id=TRK-' + Date.now() + '-1',
          dataEnvio: new Date(new Date().setDate(new Date().getDate() - 8)),
          dataEntregaEstimada: new Date(new Date().setDate(new Date().getDate() - 5)),
          dataEntregaReal: new Date(new Date().setDate(new Date().getDate() - 5)),
        },
      },
      comissao: {
        create: {
          marcaId: marca1.id,
          percentagem: 8.0,
          valor: 2.00,
          estado: 'PROCESSADA',
          dataProcessamento: new Date(new Date().setDate(new Date().getDate() - 5)),
        },
      },
      pagamentos: {
        create: [
          {
            marcaId: marca1.id,
            tipo: 'ENCOMENDA',
            valor: 29.99,
            estado: 'PROCESSADO',
            referenciaExterna: 'PAY-' + Date.now() + '-1',
            metodo: 'CARTAO',
            dataPagamento: new Date(new Date().setDate(new Date().getDate() - 10)),
          },
        ],
      },
    },
  });

  // Encomenda 2 - Cliente 2, Marca 2
  const encomenda2 = await prisma.encomenda.create({
    data: {
      clienteId: cliente2.id,
      marcaId: marca2.id,
      referencia: 'ORD-' + Date.now() + '-2',
      valorProdutos: 49.99,
      valorEnvio: 0.00, // Envio grátis
      valorTotal: 49.99,
      estado: 'ENVIADA',
      metodoPagamento: 'PAYPAL',
      referenciaPagamento: 'PAY-' + Date.now() + '-2',
      dataPagamento: new Date(new Date().setDate(new Date().getDate() - 3)),
      enderecoEntregaId: endereco2Entrega.id,
      enderecoFaturacaoId: endereco2Faturacao.id,
      itens: {
        create: [
          {
            produtoId: produtos2[0].id,
            varianteId: (await prisma.varianteProduto.findFirst({ where: { produtoId: produtos2[0].id, valor: 'M' } })).id,
            quantidade: 1,
            precoUnitario: 49.99,
            precoTotal: 49.99,
          },
        ],
      },
      envio: {
        create: {
          transportadoraId: transportadoras[1].id,
          referencia: 'SHP-' + Date.now() + '-2',
          estado: 'EM_TRANSITO',
          codigoRastreio: 'TRK-' + Date.now() + '-2',
          urlRastreio: 'https://dpd.pt/rastreio?id=TRK-' + Date.now() + '-2',
          dataEnvio: new Date(new Date().setDate(new Date().getDate() - 2)),
          dataEntregaEstimada: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
      },
      comissao: {
        create: {
          marcaId: marca2.id,
          percentagem: 6.0,
          valor: 3.00,
          estado: 'PROCESSADA',
          dataProcessamento: new Date(new Date().setDate(new Date().getDate() - 2)),
        },
      },
      pagamentos: {
        create: [
          {
            marcaId: marca2.id,
            tipo: 'ENCOMENDA',
            valor: 49.99,
            estado: 'PROCESSADO',
            referenciaExterna: 'PAY-' + Date.now() + '-2',
            metodo: 'PAYPAL',
            dataPagamento: new Date(new Date().setDate(new Date().getDate() - 3)),
          },
        ],
      },
    },
  });

  // Encomenda 3 - Cliente 1, Marca 3
  const encomenda3 = await prisma.encomenda.create({
    data: {
      clienteId: cliente1.id,
      marcaId: marca3.id,
      referencia: 'ORD-' + Date.now() + '-3',
      valorProdutos: 52.97, // 14.99 + (7.99 * 2) + 22.00
      valorEnvio: 4.00,
      valorTotal: 56.97,
      estado: 'PAGA',
      metodoPagamento: 'MULTIBANCO',
      referenciaPagamento: 'PAY-' + Date.now() + '-3',
      dataPagamento: new Date(),
      enderecoEntregaId: endereco1.id,
      enderecoFaturacaoId: endereco1.id,
      itens: {
        create: [
          {
            produtoId: produtos3[0].id,
            varianteId: (await prisma.varianteProduto.findFirst({ where: { produtoId: produtos3[0].id, valor: '500ml' } })).id,
            quantidade: 1,
            precoUnitario: 24.99, // 14.99 + 10.00
            precoTotal: 24.99,
          },
          {
            produtoId: produtos3[1].id,
            quantidade: 2,
            precoUnitario: 7.99,
            precoTotal: 15.98,
          },
          {
            produtoId: produtos3[2].id,
            quantidade: 1,
            precoUnitario: 29.99,
            precoTotal: 29.99,
          },
        ],
      },
      envio: {
        create: {
          transportadoraId: transportadoras[2].id,
          referencia: 'SHP-' + Date.now() + '-3',
          estado: 'AGUARDANDO_RECOLHA',
          codigoRastreio: 'TRK-' + Date.now() + '-3',
          urlRastreio: 'https://gls.pt/rastreio?id=TRK-' + Date.now() + '-3',
          dataEntregaEstimada: new Date(new Date().setDate(new Date().getDate() + 3)),
        },
      },
      comissao: {
        create: {
          marcaId: marca3.id,
          percentagem: 4.0,
          valor: 2.12,
          estado: 'PENDENTE',
        },
      },
      pagamentos: {
        create: [
          {
            marcaId: marca3.id,
            tipo: 'ENCOMENDA',
            valor: 56.97,
            estado: 'PROCESSADO',
            referenciaExterna: 'PAY-' + Date.now() + '-3',
            metodo: 'MULTIBANCO',
            dataPagamento: new Date(),
          },
        ],
      },
    },
  });

  console.log('Encomendas criadas:', 3);

  // Criar algumas avaliações
  await prisma.avaliacao.create({
    data: {
      produtoId: produtos1[0].id,
      clienteId: cliente1.id,
      classificacao: 5,
      comentario: 'Azulejo lindíssimo, excelente qualidade e acabamento perfeito!',
      aprovada: true,
    },
  });

  await prisma.avaliacao.create({
    data: {
      produtoId: produtos2[0].id,
      clienteId: cliente2.id,
      classificacao: 4,
      comentario: 'Camisa muito confortável e de boa qualidade. Tamanho um pouco maior do que esperava.',
      aprovada: true,
    },
  });

  await prisma.avaliacao.create({
    data: {
      produtoId: produtos3[0].id,
      clienteId: cliente1.id,
      classificacao: 5,
      comentario: 'Melhor azeite que já provei! Vale cada cêntimo.',
      aprovada: true,
    },
  });

  console.log('Avaliações criadas:', 3);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
