FROM node:alpine AS dev

RUN apk add nginx

WORKDIR /usr/src/poet

COPY package.json yarn.lock tsconfig.json module.d.ts /usr/src/poet/

RUN yarn
COPY . /usr/src/poet
RUN npm run tsc

# COPY nginx /usr/src/poet/nginx
# RUN nginx

CMD [ "node", "./builder/src/main.js" ]


EXPOSE 3001