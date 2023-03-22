#####   BASE   #####
FROM node:18.15.0-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm i -g pnpm@7.30.0

#####   BUILDER   #####
FROM base AS builder
# Set working directory
WORKDIR /app
COPY . .
# Filter all files related to service
RUN pnpm dlx turbo prune --scope=api --docker

#####   INSTALLER   #####
FROM base AS installer
WORKDIR /app
# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm i --frozen-lockfile
# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
RUN pnpm exec turbo run build --filter=api...

#####   PROD   #####
FROM node:18.15.0-alpine AS production
WORKDIR /app
COPY --from=installer /app .
# Remove source code and dev dependencies
RUN rm -rf /app/utilities && find . -type d -name src | grep -v 'node_modules' | xargs rm -rf
CMD node apps/api/dist/index.js
