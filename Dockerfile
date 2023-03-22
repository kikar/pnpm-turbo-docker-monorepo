FROM node:18.15.0-alpine

# Needed for Turborepo. Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why
RUN apk add --no-cache libc6-compat && apk update
# Install pnpm
RUN npm i -g pnpm@7.30.0

CMD [ "node" ]
