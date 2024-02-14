FROM node:16 as website
WORKDIR /app

COPY package.json ./
COPY .npmrc ./

RUN npm install
COPY . ./
RUN npm run build:prod

#######

FROM nginx:alpine as nginxrunner
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=website /app/build /usr/share/nginx/html

#Must match the ./nginx.conf 'listen'
EXPOSE 443

#Start up nginx
CMD ["nginx", "-g", "daemon off;"]