#!/bin/bash

# rodando migrations
npx prisma migrate deploy

# rodando aplicação
nest start