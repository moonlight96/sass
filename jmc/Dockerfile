FROM harbor.weyesns.com/base/nginx:alpine

COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY ./nginx/nginx.conf /etc/nginx/

ADD ./src/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80
