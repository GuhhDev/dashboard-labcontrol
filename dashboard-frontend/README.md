# Dashboard LabControl - Frontend

## Sobre o Projeto

O Dashboard LabControl é uma aplicação web desenvolvida para gerenciar laboratórios de controle de qualidade de concreto, permitindo o cadastro e controle de laboratórios, clientes, obras, cargas de concreto e amostras.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset tipado de JavaScript
- **Styled Components**: Biblioteca para estilizar componentes
- **Vite**: Build tool rápido para desenvolvimento web
- **Axios**: Cliente HTTP para realizar requisições à API
- **Keycloak**: Ferramenta de autenticação e autorização

## Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- NPM ou Yarn

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
VITE_API_URL=http://localhost:8080/api
VITE_KEYCLOAK_URL=http://localhost:8180/auth
VITE_KEYCLOAK_REALM=labcontrol
VITE_KEYCLOAK_CLIENT_ID=frontend
```

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build
```

## Estrutura do Projeto

```
/dashboard-frontend
  /public             # Arquivos estáticos
  /src
    /assets           # Imagens e outros recursos
    /components       # Componentes reutilizáveis
    /config           # Configurações (Keycloak, etc)
    /context          # Contextos React (Auth, Theme, etc)
    /hooks            # Hooks personalizados
    /pages            # Páginas da aplicação
      /Cadastros      # Módulo de cadastros (laboratórios, clientes, etc)
      /Dashboard      # Página principal com visão geral
      /Login          # Página de login
    /services         # Serviços de comunicação com a API
    /types            # Definições de tipos TypeScript
    /utils            # Funções utilitárias
    App.tsx           # Componente principal
    main.tsx          # Ponto de entrada da aplicação
```

## Funcionalidades

### Módulo de Cadastros

- **Laboratórios**: Cadastro e gerenciamento de laboratórios
- **Clientes**: Cadastro e gerenciamento de clientes
- **Obras**: Cadastro e gerenciamento de obras
- **Cargas de Concreto**: Registro de cargas de concreto
- **Amostras**: Registro e controle de amostras

## Comunicação com o Backend

A comunicação com o backend é realizada através do Axios, que está configurado para:

1. Adicionar automaticamente o token de autenticação em todas as requisições
2. Renovar o token quando expirado
3. Redirecionar para a página de login quando o token não puder ser renovado

## Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

- Desktop: Layout completo
- Tablet: Layout adaptado com sidebar minimizável
- Mobile: Layout otimizado com menu hamburger

## Desenvolvimento

### Convenções de Código

- Utilizar TypeScript para todos os componentes
- Definir interfaces para props e estados
- Utilizar styled-components para estilização
- Seguir o padrão de componentes funcionais com hooks

### Padrão de Commits

Seguir o padrão Conventional Commits:

```
feat: adiciona novo módulo de laboratórios
fix: corrige exibição da lista de amostras
docs: atualiza documentação do projeto
style: melhora formatação do código
refactor: refatora serviço de autenticação
test: adiciona testes para módulo de clientes
```

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
