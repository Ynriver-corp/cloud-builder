# Base Image
FROM ubuntu:20.04

# Declare constants
ENV NVM_VERSION v0.33.11
ENV NODE_VERSION v14.10.0
ENV NODE_ENV production

# set port
ENV BACK_PORT 8082
ENV FRONT_PORT 80
EXPOSE $BACK_PORT
EXPOSE $FRONT_PORT

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install dependencies
RUN apt-get -y update
RUN apt-get -y install git
RUN apt-get -y install curl
RUN apt-get -y install python
RUN apt-get -y install build-essential
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq install nginx

#RUN apt-get update && apt-get install -y \
#git \
#curl \
#nginx \
#python \
#build-essential\
#&& rm -rf /var/lib/apt/lists/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs

#------------------ PROJECT ------------------

# create folder
RUN mkdir /app

# working directory
WORKDIR /app

# add binaries to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy app files
COPY . /app

# start cloud-builder Terminal
#CMD [ "npm", "run" , "start", "--prefix", "./server"]
RUN npm install --force --prefix ./server
CMD ["bash","start.sh"]

# start cloud-builder FronEnd
#RUN npm install --force
#RUN npm run build
#RUN cp /app/build /var/www/html
#CMD [ "cp", "/app/build" , "/var/www/html" ]
COPY /build /var/www/html
CMD ["nginx", "-g", "daemon off;"]



