FROM node:alpine

WORKDIR /user/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 6001

CMD ["node", "dist/main"]