#!/bin/bash
INIT="\e[01;33mIniciando Containers\e[00m 🔖\n"
FRONT_START="\e[01;33mFrontend iniciado em\e[00m"
BACK_START="\e[01;33mBackend iniciado em\e[00m"
FRONT_PORT="\e[01;36m http://localhost:5050\e[00m 💡"
BACK_PORT="\e[01;36m http://localhost:4040\e[00m 💡"

# Inicializa os containers
echo -e "\n$INIT"
docker-compose up --remove-orphans --force-recreate --renew-anon-volumes -d
echo -e "\n"

# Esperar o MongoDB estar pronto
while ! docker-compose logs database-crud | grep -m1 'MySQL init process done. Ready for start up'; do
    echo -e "👀 Waiting for MySQL database to be ready for connections... "
    sleep 12
done

# Mostra o endereço da aplicaçao
echo -e "\n$BACK_START $BACK_PORT"
echo -e "$FRONT_START $FRONT_PORT"
