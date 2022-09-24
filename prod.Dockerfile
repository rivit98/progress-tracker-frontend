FROM node:18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm install \
    && npm run build \
    && npm install -g serve


CMD ["serve", "-s", "build"]
