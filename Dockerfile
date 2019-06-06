FROM nginx:alpine
COPY dist/browser /usr/share/nginx/html
ADD ./nginx.conf /etc/nginx/nginx.conf
