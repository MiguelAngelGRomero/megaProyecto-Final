# Multi-stage build para optimizar el tamaño de la imagen final

# Stage 1: Build stage - Compilar la aplicación Angular
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build

# Stage 2: Production stage - Crear imagen final optimizada
FROM node:18-alpine AS production

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S angular -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copiar archivos construidos desde el stage anterior
COPY --from=builder --chown=angular:nodejs /app/dist/hubes ./dist/hubes

# Cambiar al usuario no-root
USER angular

# Exponer puerto
EXPOSE 4200

# Variable de entorno para el puerto
ENV PORT=4200
ENV NODE_ENV=production

# Usar dumb-init para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Comando para ejecutar la aplicación
CMD ["node", "dist/hubes/server/server.mjs"]
