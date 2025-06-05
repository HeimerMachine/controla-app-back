FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache openssl netcat-openbsd && \
    corepack enable && \
    adduser -D -u 1001 nodeuser
WORKDIR /backend

FROM base AS builder
COPY .env .swcrc package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY src ./src
RUN npx swc src -d dist --copy-files --config-file .swcrc && \
    rm -rf node_modules/.cache

FROM base AS prod
COPY --from=builder /backend/dist ./dist
COPY package.json pnpm-lock.yaml .env prisma ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile && \
    pnpm add prisma@6.6.0 @prisma/client && \
    pnpm prisma generate && \
    chown -R nodeuser:nodeuser /backend

USER nodeuser
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD nc -z localhost 8000 || exit 1