FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY *.html robots.txt sitemap.xml site.webmanifest /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY en/ /usr/share/nginx/html/en/
COPY connect/ /usr/share/nginx/html/connect/
COPY join/ /usr/share/nginx/html/join/
COPY .well-known/ /usr/share/nginx/html/.well-known/

# Nginx workers must traverse directories extracted with a restrictive umask.
RUN chmod -R a+rX /usr/share/nginx/html

EXPOSE 80
