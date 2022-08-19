FROM node:18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV dev

COPY . ./

RUN npm install

CMD ["npm", "start"]
