FROM node:alpine

WORKDIR /usr/app/server

EXPOSE 3000

COPY ./ ./
RUN npm install
CMD ["npm", "start"]