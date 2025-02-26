#!/usr/bin/env bash
# Script de build para o Render.com

set -e

# Instalar dependências
npm install

# Build do projeto
npm run build

# Fim do script
echo "Build completo!"
