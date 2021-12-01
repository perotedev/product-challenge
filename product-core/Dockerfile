FROM node:16-slim as build

# RUN apk add --no-cache bash

# Instala npm comptatível
RUN npm install -g npm@8.1.4

# Instala o Nestjs
RUN npm i -g @nestjs/cli

# Cria diretório da aplicação
WORKDIR /home/node/product-core

# RUN apk add --no-cache bash

# Copia os arquivos para o container
COPY ./ /home/node/product-core

# Instala as dependências
RUN npm install
# RUN npm install && npm install --save @nestjs/mongoose mongoose

# Constrói a aplicação
RUN npm run build

# Start server
FROM node:slim
WORKDIR /home/node/product-core
COPY --from=build /home/node/product-core /home/node/product-core
EXPOSE 4040
CMD npm run start:prod