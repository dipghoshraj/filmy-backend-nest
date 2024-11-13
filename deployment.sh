#/bin/bash

# run the migration
npx prisma migrate deploy

#run build
echo "running the build"
npm run build

# start the server
echo "running the server"
npm run start:prod