# ControlAcess - Sistema de Controle de Acesso

Uma plataforma cloud-first, modular e escalável para controle inteligente e seguro de acessos físicos e digitais.

## 🚀 Características

- **Arquitetura Moderna**: Next.js 15+ com App Router, React 18, TailwindCSS
- **Interface Responsiva**: Design moderno e intuitivo
- **Módulos Principais**:
  - Dashboard em tempo real
  - Gestão de colaboradores e perfis
  - Controle de visitantes
  - Gestão de prestadores de serviço
  - Controle de dispositivos
  - Relatórios e compliance
  - Sistema de autenticação

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **Ícones**: Lucide React
- **Componentes**: shadcn/ui (Radix UI)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd controlacess
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## 🔑 Credenciais de Demonstração

Para acessar o sistema de demonstração, use:

- **Email**: admin@controlacess.com
- **Senha**: admin123

## 📁 Estrutura do Projeto

```
controlacess/
├── app/                    # Páginas do Next.js (App Router)
│   ├── dashboard/         # Dashboard principal
│   ├── colaboradores/          # Gestão de colaboradores
│   ├── visitantes/        # Controle de visitantes
│   ├── prestadores/       # Gestão de prestadores
│   ├── dispositivos/      # Controle de dispositivos
│   ├── relatorios/        # Relatórios e analytics
│   └── login/            # Página de autenticação
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx
│   └── Navbar.tsx
├── lib/                  # Utilitários e configurações
└── public/              # Arquivos estáticos
```

## 🎯 Funcionalidades Implementadas

### 🔐 Autenticação
- Login com validação
- Armazenamento de token no localStorage
- Redirecionamento automático
- Proteção de rotas

### 📊 Dashboard
- Cards com estatísticas em tempo real
- Monitoramento de colaboradores ativos
- Alertas e notificações
- Status dos dispositivos
- Histórico de acessos recentes

### 👥 Gestão de Colaboradores
- Lista completa de colaboradores
- Filtros e busca
- Níveis de acesso (Alto, Médio, Baixo)
- Status por departamento
- Controles de ações

### 👤 Controle de Visitantes
- Registro de visitantes
- Controle de entrada e saída
- Emissão de crachás temporários
- Histórico de visitas
- Acompanhamento por anfitrião

### 🏢 Gestão de Prestadores
- Cadastro de prestadores de serviço
- Controle de contratos e períodos
- Níveis de acesso diferenciados
- Supervisão por responsável
- Gestão de empresas parceiras

### 🖥️ Controle de Dispositivos
- Monitoramento de catracas e leitores
- Status online/offline/warning
- Informações de firmware
- Contadores de acesso
- Localização dos dispositivos

### 📈 Relatórios
- Histórico de relatórios gerados
- Diferentes tipos (Acessos, Segurança, Presença, Dispositivos)
- Gráficos de acesso por horário
- Relatórios rápidos predefinidos
- Conformidade LGPD

## 🎨 Design System

O projeto utiliza uma paleta de cores consistente:

- **Primária**: Azul (#3B82F6)
- **Sucesso**: Verde (#10B981)
- **Aviso**: Amarelo (#F59E0B)
- **Erro**: Vermelho (#EF4444)
- **Neutro**: Cinza (#6B7280)

## 📱 Responsividade

A interface é completamente responsiva e otimizada para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🔒 Segurança

- Autenticação baseada em token
- Proteção de rotas client-side
- Validação de formulários
- Sanitização de dados de entrada

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Linting
npm run lint
```

## 🌟 Próximos Passos

- [ ] Integração com API backend real
- [ ] Implementação de WebSocket para dados em tempo real
- [ ] Sistema de notificações push
- [ ] Modo escuro/claro
- [ ] Testes automatizados
- [ ] PWA (Progressive Web App)
- [ ] Integração com Active Directory
- [ ] Relatórios em PDF
- [ ] Dashboard customizável

## 📞 Suporte

Para dúvidas e suporte:
- 📧 Email: suporte@controlacess.com
- 📱 WhatsApp: (11) 99999-9999
- 🌐 Site: www.controlacess.com

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**ControlAcess** - Controle Inteligente e Seguro de Acessos 🛡️
