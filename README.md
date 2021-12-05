# product-challenge

<p align="center">
  <img src="https://img.shields.io/badge/npm-8.1.4-red?style=flat&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/Angular-13-red?style=flat&logo=angular&logoColor=white"> <img src="https://img.shields.io/badge/node-v14.15.5-green?style=flat&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/nestjs-v8.1.5-green?style=flat&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-latest-green?style=flat&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/docker--compose-3.3-blue?style=flat&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/docker-20.10.2-blue?style=flat&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/bash-5.0.17-red?style=flat&logo=gnubash&logoColor=white"> <img src="https://img.shields.io/badge/Ubuntu-20.04.2%20LTS-yellow?style=flat&logo=ubuntu&logoColor=white"> <img src="https://img.shields.io/badge/Linux-5.11-yellow?style=flat&logo=ubuntu&logoColor=white">
</p> <br>

# Requisitos para rodar aplicação:
✴️ Docker e docker-compose<br>
✴️ De preferência sistema operacional Linux (Ubuntu/Debian)<br>
✴️ Terminal bash para executar os scripts<br>
✴️ O computador deve ter acesso à internet para baixar as dependências do projeto na primeira execução<br><br>


# Executando a Aplicação
<p>Baixe o repositório:</p>

```bash
git clone https://github.com/perotedev/product-challenge.git
```
<div id="backend_exex"></div>

## 🖥️ Frontend Angular e Backend NestJS
Primeiro certifique-se de que as portas **5050**, **4040**, **3306** e **8888** do seu computador não estão sendo utilizadas por outras aplicações, é necessário que as mesmas estejam disponíveis.<br>
Entre na pasta raiz do repositório **`"product-challenge"`** pelo terminal e execute o comando:

```bash
# para executar apenas na primeira vez que rodar a aplicação
./devops/app.sh build
```
<p>Aguarde até que o terminal mostre a mensagem abaixo: </p>

```bash
Backend iniciado em  http://localhost:4040 💡
Frontend iniciado em  http://localhost:5050 💡
```

Após isso a aplicação estará sendo executada.<br><br>

**Para rodar a aplicação da segunda vez em diante use os seguintes comandos na raiz do repositório `"product-challenge"` pelo terminal para iniciar ou parar a execução:**<br>

```bash
# para iniciar a aplicação
./devops/app.sh start

# para parar a aplicação
./devops/app.sh stop
```
<br>

Para **remover** todos os containers criados pela aplicação entre na pasta raiz do repositório **`"product-challenge"`** pelo terminal e execute o comando:

```bash
# para remover todos os containers da aplicação
./devops/app.sh remove
```
<br>

Caso queira verificar o banco de dados, enquanto a aplicação estiver sendo executada, o mesmo estará disponível em **localhost:3306**, ou se preferir pode acessar o phpMyAdmin em **http://localhost:8888**.