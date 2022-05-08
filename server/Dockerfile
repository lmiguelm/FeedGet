FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN yarn

COPY prisma ./
RUN npx prisma generate

COPY . .

EXPOSE 3333
CMD ["yarn", "production"]