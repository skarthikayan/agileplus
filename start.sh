#!/bin/sh
npm run prisma:generate
npm run db:migrate:deploy
pm2-runtime ecosystem.config.js