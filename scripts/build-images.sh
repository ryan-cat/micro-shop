#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'

declare -a arr=(
  "api-gateway"
  "web"
  "products"
  "accounts"
)

for i in "${arr[@]}"
do
  printf "${GREEN}Building ${i} image...\n\n${NC}"
  build="docker build -t micro-shop/${i} ./${i}"
  eval $build
  printf "\n"
done