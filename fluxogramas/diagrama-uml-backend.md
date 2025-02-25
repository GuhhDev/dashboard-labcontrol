# Diagrama UML do Backend Dashboard-LabControl

```mermaid
classDiagram
    direction BT
    
    %% ========== LEGENDA DE CORES ==========
    classDef entity fill:#e1f5fe,stroke:#039be5
    classDef interface fill:#f0f4c3,stroke:#827717
    classDef repository fill:#c8e6c9,stroke:#2e7d32
    classDef service fill:#ffccbc,stroke:#ef6c00
    classDef controller fill:#d1c4e9,stroke:#673ab7
    
    %% ========== DOMAIN MODEL ==========
    class Amostra {
        <<Entity>>
        -Long id
        -String identificacao
        -Date dataColeta
        +Obra obra
        +CargaConcreto cargaConcreto
    }:::entity
    
    class CargaConcreto {
        <<Entity>>
        -Long id
        -String notaFiscal
        -Date dataHoraChegada
        -String placa
        +ClasseResistencia classeResistencia
        +Obra obra
    }:::entity
    
    class ClasseResistencia {
        <<Entity>>
        -Long id
        -String nome
        -String descricao
    }:::entity
    
    class Obra {
        <<Entity>>
        -Long id
        -String nome
        -String endereco
        +Cliente cliente
        +Usuario responsavel
    }:::entity
    
    class Ensaio {
        <<Entity>>
        -Long id
        +Amostra amostra
        +IdadeCP idadeCP
        -Date dataRompimento
        -Double resultadoMPa
    }:::entity
    
    class NaoConformidade {
        <<Entity>>
        -Long id
        -String descricao
        +Ensaio ensaio
    }:::entity
    
    class TratativaNaoConformidade {
        <<Entity>>
        -Long id
        +NaoConformidade naoConformidade
        -String descricao
        -Date dataTratativa
        +Usuario responsavel
    }:::entity
    
    class Usuario {
        <<Entity>>
        -Long id
        -String nome
        -String email
    }:::entity

    %% ========== DATA ACCESS LAYER ==========
    class Repository {
        <<Interface>>
        +findAll()
        +findById()
        +save()
        +delete()
    }:::interface
    
    class AmostraRepository {
        +findByObraId(Long obraId)
        +findByIdentificacao(String identificacao)
    }:::repository
    
    class EnsaioRepository {
        +findByAmostraId(Long amostraId)
        +calcularMediaResistencia()
    }:::repository
    
    class ObraRepository {
        +findByClienteId(Long clienteId)
        +findByResponsavelId(Long responsavelId)
    }:::repository
    
    %% ========== BUSINESS LAYER ==========
    class AmostraService {
        +buscarPorObra(Long obraId)
        +validarAmostra(Amostra amostra)
    }:::service
    
    class EnsaioService {
        +calcularResultados(Ensaio ensaio)
        +verificarNaoConformidades(Ensaio ensaio)
    }:::service
    
    class DashboardService {
        +obterEstatisticasGerais()
        +gerarRelatorioConsolidado()
    }:::service

    %% ========== API LAYER ==========
    class AmostraController {
        +getAmostrasPorObra(Long obraId)
        +cadastrarAmostra(AmostraDTO dto)
    }:::controller
    
    class EnsaioController {
        +registrarEnsaio(EnsaioDTO dto)
        +obterResultados(Long ensaioId)
    }:::controller
    
    class DashboardController {
        +getMetricasPrincipais()
        +getAlertasNaoConformidades()
    }:::controller

    %% ========== RELACIONAMENTOS ENTIDADES ==========
    Amostra --> Obra : belongs to
    Amostra --> CargaConcreto : associated with
    CargaConcreto --> ClasseResistencia : uses
    CargaConcreto --> Obra : delivered to
    Obra --> Usuario : managed by
    Ensaio --> Amostra : tests
    Ensaio --> IdadeCP : at age
    NaoConformidade --> Ensaio : detected in
    TratativaNaoConformidade --> NaoConformidade : resolves
    
    %% ========== CAMADAS DE ACESSO ==========
    Repository <|.. AmostraRepository : implements
    AmostraRepository --> Amostra : manages
    
    %% ========== CAMADA DE NEGÓCIO ==========
    AmostraService --> AmostraRepository : uses
    EnsaioService --> EnsaioRepository : uses
    DashboardService --> EnsaioRepository : aggregates
    
    %% ========== CAMADA DE APRESENTAÇÃO ==========
    AmostraController --> AmostraService : consumes
    EnsaioController --> EnsaioService : consumes
    DashboardController --> DashboardService : consumes

    %% ========== ANOTAÇÕES ==========
    note "Padrão Arquitetural MVC\n- Entidades: Model\n- Services: Business Logic\n- Controllers: API Endpoints" 
    note for Repository "Spring Data JPA Interface"
    note for AmostraService "Valida regras de negócio\npara amostras"
```

## Descrição do Diagrama UML

O diagrama UML acima representa a estrutura do backend do sistema Dashboard-LabControl, incluindo:

1. **Entidades (Models)**
   - As classes de domínio que representam os objetos de negócio do sistema
   - Relacionamentos entre entidades (associações, composições)

2. **Repositórios**
   - Interfaces que estendem JpaRepository do Spring Data
   - Responsáveis pelo acesso a dados e operações CRUD

3. **Serviços**
   - Camada que implementa a lógica de negócio
   - Usa os repositórios para acessar dados
   - Implementa regras de validação e processamento

4. **Controllers**
   - Endpoints REST que expõem as funcionalidades do sistema
   - Utilizam os serviços para processar as requisições
   - Implementam a lógica de apresentação e transformação de dados

A arquitetura segue o padrão MVC (Model-View-Controller) adaptado para APIs RESTful, onde:
- Model: Entidades e Repositórios
- Controller: Controllers REST
- Service: Camada intermediária que contém a lógica de negócio

Este sistema gerencia todo o processo de controle laboratorial de concreto, desde o registro de clientes, obras e amostras até o processamento de ensaios e geração de relatórios.
