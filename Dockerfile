FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

# Nginx workers must traverse directories extracted with a restrictive umask.
RUN chmod -R a+rX /usr/share/nginx/html

EXPOSE 80
