FROM node:20-alpine

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

COPY .env.docker /app/.env

RUN npm run build 

EXPOSE 5173

ENTRYPOINT ["npm"]

CMD ["run", "dev", "--", "--host"]
