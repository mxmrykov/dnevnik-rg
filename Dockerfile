FROM node:20-alpine
WORKDIR /app
COPY . .
RUN echo "REACT_APP_BUILD_E=stage" >> .env.production
RUN echo "REACT_APP_HOST=http://host.docker.internal:" >> .env.production
RUN npm install
RUN npm run build
RUN npm i -g serve
EXPOSE 3000

CMD ["serve", "-s", "build"]