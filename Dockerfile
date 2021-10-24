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
RUN npm install --force

# define env
ENV NODE_ENV=production

# create build
#&& rm -rf .next/cache
RUN npm run buildWebPack

FROM nginx:1.19-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]