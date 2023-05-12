FROM node:18-alpine as install-deps

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# do dependency installation as separate step for caching
WORKDIR /app
COPY ./package*.json ./
# always install dev dependencies because we use them for build (eslint)
RUN ["npm", "install", "--production=false", "--force"]

# TODO: Figure out how to get Next's default hot-reloading and watching to work with Docker in dev

#No CMD or entrypoint. In development, docker compose targets this stage and
#specifies the command. In production, we fall through to next stage.


FROM node:18-alpine as generate

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app
COPY --from=install-deps /app ./
#copy all the rest of the files needed to build app
COPY ./src ./src
COPY ./public ./public
COPY ./next.config.js ./next.config.js
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./tsconfig.json ./tsconfig.json
COPY ./.eslintrc.js ./.eslintrc.js

RUN ["npm", "run", "build"]


FROM nginx
COPY --from=generate /app/.next /usr/share/nginx/html
# default config was modified for the api reverse proxy
COPY ./default.conf.template /etc/nginx/templates/default.conf.template
