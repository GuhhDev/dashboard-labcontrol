# Diagrama de Fluxo de Dados do Dashboard-LabControl

```mermaid
flowchart TD
 subgraph subGraph0["Serviços Frontend"]
        API_Service["API Service"]
        Auth_Service["Auth Service"]
  end
 subgraph subGraph1["Camada Frontend (React/TypeScript)"]
        Dashboard["Dashboard"]
        Auth["Auth - keycloak"]
        Cards["Cards de Dados"]
        Sidebar["Sidebar"]
        PrivateRoute["PrivateRoute"]
        subGraph0
  end
 subgraph subGraph3["Camada Backend (Spring Boot)"]
        Repositories["Repositories"]
        Database[("Banco de Dados")]
        Services["Services"]
        Controllers["Controllers"]
  end
 subgraph subGraph4["Camada de Dados"]
        Amostra["Amostra"]
        CargaConcreto["CargaConcreto"]
        Cliente["Cliente"]
        Ensaio["Ensaio"]
  end
    U(["Usuário"]) -- Acessa Sistema --> Login["Login"]
    Login -- Autenticação --> Auth
    Auth -- Redireciona --> Dashboard
    Dashboard -- Componentes --> Cards & Sidebar & PrivateRoute
    API_Service <-- Requisições --> Controllers
    Controllers -- Processa --> Services
    Services -- Acessa Dados --> Repositories
    Repositories -- Persiste --> Database
    Database -- Entidades --> Amostra & CargaConcreto & Cliente & Ensaio

    classDef user fill:#f9f,stroke:#333
    classDef frontend fill:#cfffb9,stroke:#333
    classDef backend fill:#ffe4b2,stroke:#333
    classDef database fill:#76b5c5,stroke:#333
    style Dashboard fill:#cfffb9,stroke:#333
    style Repositories fill:#d9b2ff,stroke:#333
    style Database fill:#76b5c5,stroke:#333,stroke-width:2px
    style Services fill:#ffb2b2,stroke:#333
    style U fill:#f9f,stroke:#333,stroke-width:2px
    style Login fill:#b9f2ff,stroke:#333
    style Controllers fill:#ffe4b2,stroke:#333
```

## Descrição do Fluxo de Dados

Este diagrama representa o fluxo de dados completo do sistema Dashboard-LabControl, desde a interação do usuário com o frontend até o processamento no backend e persistência no banco de dados.

### Fluxo Principal:

1. **Autenticação**
   - Usuários (clientes ou administradores) acessam o sistema via tela de login
   - O processo de autenticação gera um token que permite acesso ao Dashboard

2. **Dashboard e Operações**
   - A partir do Dashboard, usuários podem navegar para diferentes formulários:
     - Cadastro de Amostras
     - Registro de Cargas de Concreto
     - Registro de Ensaios
     - Visualização de Relatórios

3. **Processamento Backend**
   - Cada formulário interage com um processo específico no backend:
     - Processamento de Amostras: gerencia o ciclo de vida das amostras
     - Processamento de Cargas: controla entradas de cargas de concreto
     - Processamento de Ensaios: registra resultados de testes
     - Processamento de Dashboard: gera estatísticas e métricas
     - Geração de Relatórios: cria relatórios formatados

4. **Validação e Qualidade**
   - Resultados de ensaios passam por validação
   - Detecção de anomalias identifica possíveis não conformidades
   - Sistema de notificações alerta usuários sobre problemas

5. **Persistência**
   - Todos os dados são armazenados no banco de dados relacional
   - Operações CRUD são realizadas através dos repositórios

Este fluxo de dados demonstra como o sistema integra os processos de controle laboratorial de concreto, desde a coleta de amostras até a análise de resultados e geração de relatórios.
