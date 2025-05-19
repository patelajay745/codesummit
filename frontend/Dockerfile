FROM node:20-alpine AS builder
RUN apk add --no-cache yarn
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --cache-folder ./.yarn-cache
COPY . .
ARG VITE_BACKEND_URL
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]