FROM node:21-alpine
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install
COPY .env.prod .env

# Copy app source code
COPY . .
# Build the NestJS app
RUN npx prisma generate
# Expose the application port
EXPOSE 3000

CMD ["sh", "deployment.sh"]

# CMD ["npm", "run", "start:prod"]