# Dashboard LabControl - Backend

## Ambientes de Execução

O projeto suporta dois ambientes de execução:

### Ambiente de Desenvolvimento Local

Para desenvolvimento local, o projeto utiliza Docker Compose para executar Keycloak e PostgreSQL. Detalhes dos serviços:

#### PostgreSQL
- Porta: 5432 (PostgreSQL) / 5433 (Dashboard)
- Banco de dados (Keycloak): keycloak
- Banco de dados (Dashboard): dashboard
- Usuário: postgres
- Senha: password

#### Keycloak
- URL: http://localhost:8080
- Console Admin: http://localhost:8080/admin
- Usuário Admin: admin
- Senha Admin: admin

### Ambiente de Produção (Render)

Para produção, o projeto está configurado para ser implantado no Render usando o arquivo `render.yaml` na raiz do projeto, que define os seguintes serviços:

- **dashboard-backend**: Aplicação Spring Boot
- **dashboard-keycloak**: Servidor Keycloak para autenticação
- **dashboard-postgres**: Banco de dados PostgreSQL para o dashboard
- **keycloak-postgres**: Banco de dados PostgreSQL para o Keycloak

## Como Iniciar em Ambiente Local

1. Certifique-se de ter Docker e Docker Compose instalados
2. Execute o seguinte comando no diretório do projeto:
   ```bash
   docker-compose up -d
   ```

3. Aguarde os serviços iniciarem (isso pode levar alguns momentos)
4. Acesse o console admin do Keycloak em http://localhost:8080/admin
5. Faça login com as credenciais de admin (admin/admin)

## Como Parar o Ambiente Local

```bash
docker-compose down
```

## Implantação no Render

Para implantar no Render:

1. Configure seu repositório GitHub com o código
2. No Render, vá para "Blueprints" e selecione "New Blueprint"
3. Conecte seu repositório GitHub
4. O Render detectará automaticamente o arquivo `render.yaml` e criará todos os serviços configurados
5. Clique em "Apply" para iniciar a implantação

### Configuração de Variáveis de Ambiente

O arquivo `application-prod.properties` está configurado para usar variáveis de ambiente que serão fornecidas automaticamente pelo Render conforme definido no arquivo `render.yaml`.

## Configuração do AWS S3

Para o funcionamento da importação/exportação de planilhas Excel, é necessário configurar os seguintes parâmetros:

- `AWS_REGION`: Região da AWS (padrão: sa-east-1)
- `AWS_S3_BUCKET_NAME`: Nome do bucket S3 (padrão: dashboard-labcontrol-bucket)

No ambiente de produção (Render), essas variáveis são definidas no arquivo `render.yaml`.
