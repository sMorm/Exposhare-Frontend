# Bundle with webpack
FROM node:latest
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Get bundled app, put in apache server
FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y apache2 && apt-get clean

# Enable default variable
ENV LANG C.UTF-8
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/www/logs
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

COPY --from=0 /usr/src/app/dist /var/www/html
COPY ./docker/.htaccess /var/www/html
COPY ./docker/apache2.conf /etc/apache2/apache2.conf
COPY ./default-ssl.conf /etc/apache2/sites-available/default-ssl.conf

RUN a2enmod expires && a2enmod rewrite && service apache2 restart

# Expose apache port INSIDE the container
EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]