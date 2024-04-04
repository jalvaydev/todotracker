FROM node:lts

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./

RUN npm -g install pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
