# Initial image to build CLOUD-BUILDER
FROM node:14-alpine as builder

# create folder
#RUN mkdir /app

# working directory
WORKDIR /app

# add binaries to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# copy app files and build
COPY . /app

# install dependencies
RUN npm install --force

# define env
ENV NODE_ENV=production

# create build
RUN npm run buildWebPack


# Base Image
FROM ubuntu:20.04

# Declare constants
ENV NVM_VERSION v0.33.11
ENV NODE_VERSION v14.10.0
ENV NODE_ENV=production

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install dependencies
RUN apt-get -y update
RUN apt-get -y install curl
#RUN apt-get -y install nginx
#RUN apt-get install -y python
#RUN apt-get -y install build-essential

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash

# install node and npm
RUN source ~/.nvm/nvm.sh; \
    nvm install $NODE_VERSION; \
    nvm alias default $NODE_VERSION; \
    nvm use default

# create folder
RUN mkdir /app

# working directory
WORKDIR /app

# Copy server
COPY ./server /app

# install dependencies
#RUN npm install --force

# ---------------- Project ----------------
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["ls"]

#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
