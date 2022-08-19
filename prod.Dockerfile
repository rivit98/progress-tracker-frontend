FROM node:18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY . ./

RUN npm install
RUN npm run build
RUN npm install -g serve


CMD ["serve", "-s", "build"]
