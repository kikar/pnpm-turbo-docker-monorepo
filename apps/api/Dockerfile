#####   BASE   #####
FROM node:18.16.0-alpine AS base
# Can we optimise with a cache mount?
RUN apk add --no-cache libc6-compat && apk update
RUN --mount=type=cache,target=/root/.npm npm i -g pnpm@8.4.0 && pnpm config set store-dir /root/.pnpm-store

#####   DEV   #####
FROM base AS dev
# Set working directory
WORKDIR /app
COPY . .

#####   BUILDER   #####
FROM dev AS builder
# Filter all files related to service
RUN pnpm dlx turbo prune --scope=api --docker

#####   INSTALLER   #####
FROM base AS installer
WORKDIR /app
# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ /app
COPY --from=builder /app/out/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY .npmrc /app/.npmrc
# Next line should work on linux, but not on mac
# RUN --mount=type=cache,target=/root/.pnpm-store pnpm i  --prod --frozen-lockfile
RUN pnpm i --frozen-lockfile
# Build the project and its dependencies
COPY turbo.json turbo.json
COPY --from=builder /app/out/full/ /app

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
RUN pnpm exec turbo run build --filter=api...

#####   PROD   #####
FROM node:18.16.0-alpine AS production
ENV UV_THREADPOOL_SIZE=128
ENV NODE_ENV production
WORKDIR /app
COPY --from=installer /app .
# Remove source code and dev dependencies
RUN rm -rf /app/utilities && find . -type d -name src | grep -v 'node_modules' | xargs rm -rf
CMD ["node", "--max-old-space-size=2048", "apps/api/dist/main.js"]
