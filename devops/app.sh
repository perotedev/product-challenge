#!/bin/bash
INIT="\e[01;33mIniciando Containers\e[00m 🔖\n"
FRONT_START="\e[01;33mFrontend iniciado em\e[00m"
BACK_START="\e[01;33mBackend iniciado em\e[00m"
FRONT_PORT="\e[01;36m http://localhost:5050\e[00m 💡"
BACK_PORT="\e[01;36m http://localhost:4040\e[00m 💡"
STOP_INIT="\e[01;33mParando Containers\e[00m 🥵\n"
STOP_FINISH="\e[01;36mA aplicação foi encerrada\e[00m 🥱"
REMOVE_FINISH="\e[01;36mA aplicação foi removida\e[00m 😮‍💨"
REMOVE_INIT="\e[01;33mRemovendo Imagens e Containers\e[00m 🥲\n"
COMMAND="\e[01;33m'$1'\e[00m"
COMMAND_START="\e[01;36mstart\e[00m"
COMMAND_STOP="\e[01;36mstop\e[00m"
COMMAND_REMOVE="\e[01;36mremove\e[00m"
COMMAND_BUILD="\e[01;36mbuild\e[00m"
ERROR="Comando $COMMAND não é válido, tente novamente ❌"
HELP_COMMANDS="Comandos válidos: $COMMAND_BUILD, $COMMAND_START, $COMMAND_STOP e $COMMAND_REMOVE ✅"
STATUS=$(curl -s http://localhost:4040)
ALREADY_START="\e[01;33mA aplicação já está em execução\e[00m 🤨"

if [ $1 == "start" ]
then
    # Verifica se a aplicação já está sendo executada
    if [ "$STATUS" == "This server is running in port 4040" ]
    then
        echo -e "\n$ALREADY_START\n"
    else
        # Inicializa os containers
        echo -e "\n$INIT"
        docker-compose start
        echo -e "\n$BACK_START $BACK_PORT"
        echo -e "$FRONT_START $FRONT_PORT"
    fi
else
    if [ $1 == "stop" ]
    then
        # Parando os containers
        echo -e "\n$STOP_INIT"
        docker-compose stop
        echo -e "\n$STOP_FINISH\n"
    elif [ $1 == "remove" ]
    then
        # Removendo os containers
        echo -e "\n$REMOVE_INIT"
        docker-compose down --remove-orphans
        docker rmi -f product-challenge_product-web:latest product-challenge_product-core:latest
        echo -e "\n$REMOVE_FINISH\n"
    elif [ $1 == "build" ]
    then
        # Construindo os containers
        ./devops/build.sh
    else
        echo -e "\n$ERROR\n$HELP_COMMANDS"
    fi
fi