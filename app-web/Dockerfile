FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT=3100
ENV VIRTUAL_HOST=app-web.docker.local
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 3100
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
