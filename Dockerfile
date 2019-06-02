FROM nginx:alpine
COPY dist/backend-management /usr/share/nginx/html
