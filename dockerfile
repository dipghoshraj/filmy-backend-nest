FROM node:21-alpine
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Copy app source code
COPY . .
# Build the NestJS app
RUN npx prisma generate
RUN npm start build
# Expose the application port
EXPOSE 3000

CMD ["npm", "run", "start:prod"]