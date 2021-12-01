FROM node:14.15.5-buster-slim as build

# RUN apk add --no-cache bash

# Cria diretório da aplicação
WORKDIR /home/node/product-web

# Copia os arquivos para o container
COPY ./ /home/node/product-web

# Instala npm comptatível
RUN npm install -g npm@8.1.4

# Instala as dependências
RUN npm install

# Constrói a aplicação
RUN npm run build

# Image for server
FROM nginx:1.17.10-alpine

COPY --from=build /home/node/product-web/dist/product-web /usr/share/nginx/html

EXPOSE 4200:80