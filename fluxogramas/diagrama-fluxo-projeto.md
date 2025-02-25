# Fluxograma do Projeto Dashboard-LabControl

```mermaid
 flowchart TD
    %% ========== LEGENDA ==========
    classDef actor fill:#ffd700,stroke:#333,stroke-width:2px
    classDef frontend fill:#98fb98,stroke:#333
    classDef backend fill:#87cefa,stroke:#333
    classDef storage fill:#b0e0e6,stroke:#333,stroke-width:2px
    classDef validation fill:#ffb6c1,stroke:#333
    classDef notification fill:#dda0dd,stroke:#333

    %% ========== COMPONENTES PRINCIPAIS ==========
    User([Usuário/Cliente]):::actor
    Admin([Administrador]):::actor
    DB[(Banco de Dados\nPostgreSQL)]:::storage

    subgraph "CAMADA FRONTEND"
        direction TB
        Login[Página de Login]:::frontend
        Dashboard[Dashboard Interativo]:::frontend
        AmostraForm[Formulário de Amostras]:::frontend
        CargaForm[Formulário de Cargas]:::frontend
        EnsaioForm[Formulário de Ensaios]:::frontend
        ReportView[Visualizador de Relatórios]:::frontend
    end

    subgraph "CAMADA BACKEND"
        direction TB
        Auth{{"Serviço de Autenticação"}}:::backend
        AmostraAPI{{"API de Amostras"}}:::backend
        CargaAPI{{"API de Cargas"}}:::backend
        EnsaioAPI{{"API de Ensaios"}}:::backend
        DashboardAPI{{"API de Dashboard"}}:::backend
        ReportAPI{{"API de Relatórios"}}:::backend
        
        subgraph "MÓDULO DE QUALIDADE"
            Validacao[Validador de Ensaios]:::validation
            Anomalias[Detector de Anomalias]:::validation
            NC[Registro de NC]:::validation
        end
        
        subgraph "SISTEMA DE NOTIFICAÇÕES"
            Notify[Notificador]:::notification
            EmailUser[Email para Usuário]:::notification
            EmailAdmin[Email para Admin]:::notification
        end
    end

    %% ========== FLUXO PRINCIPAL ==========
    User & Admin --> Login
    Login -->|Credenciais| Auth
    Auth -->|Token JWT| Dashboard
    
    Dashboard -->|Navegação| AmostraForm & CargaForm & EnsaioForm & ReportView
    
    AmostraForm -->|Dados| AmostraAPI
    CargaForm -->|Dados| CargaAPI
    EnsaioForm -->|Resultados| EnsaioAPI
    ReportView -->|Parâmetros| ReportAPI
    
    AmostraAPI & CargaAPI & EnsaioAPI -->|CRUD| DB
    DashboardAPI -->|Consultas| DB
    ReportAPI -->|Dados Históricos| DB

    %% ========== FLUXO DE VALIDAÇÃO ==========
    EnsaioAPI -->|Dados do Ensaio| Validacao
    Validacao -->|Resultados| Anomalias
    Anomalias -->|NC Detectado| NC --> DB
    Anomalias -->|Alerta| Notify
    
    %% ========== FLUXO DE NOTIFICAÇÃO ==========
    Notify -->|E-mail| EmailUser & EmailAdmin

    %% ========== INTERAÇÕES DO DASHBOARD ==========
    Dashboard -->|Atualizações em Tempo Real| DashboardAPI
    DashboardAPI -->|Métricas| Dashboard
```

## Fluxo Principal do Sistema

1. O usuário acessa o sistema através da interface de login
2. Após autenticação, o usuário é redirecionado para o Dashboard
3. No Dashboard, o usuário pode:
   - Visualizar dados analíticos sobre ensaios de concreto
   - Gerenciar amostras
   - Gerenciar cargas de concreto
   - Gerenciar obras e clientes
   - Visualizar e tratar não conformidades
   - Gerar relatórios

4. Todos os dados são persistidos no banco de dados através da API REST
5. A segurança é gerenciada através de autenticação/autorização
