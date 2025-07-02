FROM oven/bun:1.2 as builder
LABEL authors="Michal"
WORKDIR /usr/src/app

ENTRYPOINT ["top", "-b"]

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .
RUN bun run build