FROM node:latest as build 

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

FROM nginx:1.25.2-alpine-slim
COPY src/build/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/energyview /usr/share/nginx/html

EXPOSE 80