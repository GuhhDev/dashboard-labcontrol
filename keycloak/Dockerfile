FROM quay.io/keycloak/keycloak:22.0.5

# Habilita modo de produção otimizado
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=token-exchange,admin-fine-grained-authz
ENV KC_DB=postgres
ENV KC_HTTP_RELATIVE_PATH=/auth
ENV KC_PROXY=edge

# Modo de construção otimizada para imagem distroless
WORKDIR /opt/keycloak

# Cópia de arquivos de tema personalizado, se necessário
# COPY themes/custom /opt/keycloak/themes/custom

RUN /opt/keycloak/bin/kc.sh build

# Comando para iniciar o Keycloak
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized"]
