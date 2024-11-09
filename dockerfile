FROM node:23-alpine3.19
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Copy app source code
COPY . .
RUN mv .env.prod .env
# Build the NestJS app
RUN npm run build

# Expose the application port
EXPOSE 3000

CMD ["npm", "run", "start:prod"]