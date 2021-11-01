# Base Image
FROM ubuntu:20.04

# Declare constants
ENV NVM_VERSION v0.33.11
ENV NODE_VERSION v14.10.0

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install dependencies
RUN apt-get -y update
RUN apt-get -y install git
RUN apt-get -y install curl
#RUN apt-get -y install nginx
RUN apt-get -y install python
RUN apt-get -y install build-essential

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash
RUN source ~/.nvm/nvm.sh; \
    nvm install $NODE_VERSION; \
    nvm alias default $NODE_VERSION; \
    nvm use default
