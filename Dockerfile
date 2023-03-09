FROM node:16
COPY . /root
WORKDIR /root 
RUN  npm install 
RUN npm run build
RUN mv build /tmp

FROM centos:7
RUN yum install httpd -y 
WORKDIR /var/www/html
COPY --from=0 /tmp/build/* /var/www/html/
CMD httpd -D FOREGROUND
