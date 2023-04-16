#!/bin/bash

# Запуск миникуба и ожидание старта кластера
minikube start --vm-driver=virtualbox & start_minikube_id=$!

wait $start_minikube_id

# Устанвливаем ипользование doker из миникуба что бы образы собирались в миникубе
eval $(minikube -p minikube docker-env)

sleep 3

# Собираем image для дальнейшего запуска контейнера
docker build -t nodemailer:cur . & create_image_id=$!

wait $create_image_id

kubectl apply -f podconfig.yml

#Если уже есть job на запуск пода удаляем ее
kubectl delete -f cronmailer.yml

#Запускаем job на запуск пода
kubectl create -f cronmailer.yml


#Открываем дашборд для работы 
minikube dashboard