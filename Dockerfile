# base image
FROM node:14-alpine as builder

# create folder
RUN mkdir /app

# working directory
WORKDIR /app

# add binaries to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy app files and build
COPY . /app

# install dependencies
#--only=production

RUN apk add g++ make python
RUN npm install --save ./server

# define env
# ENV NODE_ENV=production

# create build
#&& rm -rf .next/cache
# RUN npm install --force
# RUN npm run buildWebPack

FROM nginx:1.19-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["npm", "startServer"]
# CMD ["nginx", "-g", "daemon off;"]
