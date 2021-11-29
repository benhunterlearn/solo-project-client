FROM node:17

EXPOSE 3000

WORKDIR /app

ENV NODE_ENV="production"

ENV REACT_APP_API_URL="http://3.130.98.227:8080/api/alarms"

COPY package.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "build"]
