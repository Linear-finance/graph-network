FROM node:current AS build

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn mainnet-codegen
RUN rm -rf /app/.git

FROM node:current-alpine

LABEL org.opencontainers.image.source=https://github.com/Linear-finance/graph-network

COPY --from=build /app /app
WORKDIR /app

ENTRYPOINT ["sh"]
