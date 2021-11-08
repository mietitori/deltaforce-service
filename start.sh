#!/bin/bash
if [ -z "$MODE" ]
then
    MODE="dev"
fi
npx prisma migrate deploy
node server.js