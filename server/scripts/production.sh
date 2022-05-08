#!/bin/bash

# gerando código js
nest build

# rodando migrations
npx prisma migrate deploy

# rodando aplicação
nest start