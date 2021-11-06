# Base Image
FROM ubuntu:20.04

# Declare constants
ENV NVM_VERSION v0.33.11
ENV NODE_VERSION v14.10.0
ENV NODE_ENV production

# set port
ENV TERMINAL_PORT 8082
ENV SERVER_PORT 8081
EXPOSE $TERMINAL_PORT
EXPOSE $SERVER_PORT

# Replace shell with bash so we can source files
#RUN rm /bin/sh && ln -s /bin/bash /bin/sh

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

# copy app files and build
COPY . /app
COPY ./build /usr/share/nginx/html

# install dependencies
#RUN npm install --force
RUN npm install --force --prefix ./server

# start cloud-builder & terminal
#CMD [ "npm", "run" , "build" ]
CMD [ "npm", "run" , "start", "--prefix", "./server"]

#COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
