FROM gradle:jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon -x test

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Criar script de inicialização para corrigir a URL do banco de dados
RUN echo '#!/bin/bash\n\
# Verifica e corrige a URL do banco de dados se necessário\n\
echo "URL original: $JDBC_DATABASE_URL"\n\
\n\
# No Render, as URLs internas usam "postgresql" como prefixo em vez de "jdbc:postgresql"\n\
# Corrigimos isso para o formato que o Spring Boot espera\n\
if [[ "$JDBC_DATABASE_URL" == postgresql://* && "$JDBC_DATABASE_URL" != jdbc:postgresql://* ]]; then\n\
  export JDBC_DATABASE_URL="jdbc:${JDBC_DATABASE_URL}"\n\
  echo "URL formatada para JDBC: $JDBC_DATABASE_URL"\n\
fi\n\
\n\
# Verifica se a URL tem "dashboard-postgres" como host e substitui por "postgres.render.com"\n\
# ou por "localhost" (se estivermos usando o mesmo container)\n\
if [[ "$JDBC_DATABASE_URL" == *"dashboard-postgres"* ]]; then\n\
  # Extrai os componentes da URL\n\
  PROTOCOL=$(echo $JDBC_DATABASE_URL | cut -d: -f1-2)\n\
  HOST=$(echo $JDBC_DATABASE_URL | cut -d/ -f3 | cut -d: -f1)\n\
  PORT=$(echo $JDBC_DATABASE_URL | cut -d/ -f3 | cut -d: -f2 | cut -d/ -f1)\n\
  DB_PATH=$(echo $JDBC_DATABASE_URL | cut -d/ -f4-)\n\
  \n\
  # Se não há porta especificada, usa a porta padrão do PostgreSQL\n\
  if [[ -z "$PORT" || "$PORT" == "$HOST" ]]; then\n\
    PORT="5432"\n\
  fi\n\
  \n\
  # Tenta diferentes hosts de conexão interna do Render\n\
  for HOST_REPLACEMENT in "postgres.render.com" "localhost" "host.docker.internal"; do\n\
    echo "Tentando conectar usando $HOST_REPLACEMENT:$PORT/$DB_PATH"\n\
    export JDBC_DATABASE_URL="${PROTOCOL}://${HOST_REPLACEMENT}:${PORT}/${DB_PATH}"\n\
    # Aqui poderíamos adicionar uma verificação de conexão antes de continuar\n\
    # mas vamos apenas tentar com a nova URL\n\
    break\n\
  done\n\
fi\n\
\n\
echo "URL final para conexão: $JDBC_DATABASE_URL"\n\
\n\
# Inicia a aplicação Java\n\
exec java -Dspring.profiles.active=prod -jar app.jar\n\
' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 8080
ENTRYPOINT ["/app/start.sh"]
