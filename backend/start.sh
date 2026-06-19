#!/bin/sh
# Prisma generate already ran in builder, but we must make sure the database is up to date
npx prisma generate
npx prisma db push --accept-data-loss
node dist/main.js
