FROM node:16

EXPOSE 3000

WORKDIR /app

ENV NODE_ENV="production"

COPY package.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "build"]
