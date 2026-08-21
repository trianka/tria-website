# syntax=docker/dockerfile:1

# ---------- Build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first for better layer caching.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy sources and build the static site.
# SITE_URL / BASE_PATH let the same image serve root hosting (Vercel)
# or a subpath (GitHub Pages project site).
COPY . .
ARG SITE_URL=https://tria-website.vercel.app
ARG BASE_PATH=/
ENV SITE_URL=${SITE_URL} \
    BASE_PATH=${BASE_PATH}
RUN npm run build

# ---------- Serve stage ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine

LABEL org.opencontainers.image.source="https://github.com/trianka/tria-website" \
      org.opencontainers.image.title="tria-website" \
      org.opencontainers.image.description="Static Astro site for tria-website, served by unprivileged nginx"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
