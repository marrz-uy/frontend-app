
# Etapa 1: Compilar la aplicación React
FROM node:16-alpine as builder

WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar los archivos de la aplicación
COPY . .

# Compilar la aplicación React
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.25.1-alpine

# Copiar los archivos generados en la etapa anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Eliminar la configuración de Nginx existente
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar Nginx al iniciar el contenedor
CMD ["nginx", "-g", "daemon off;"]