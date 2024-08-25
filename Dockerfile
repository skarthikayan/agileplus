FROM  node:20-alpine
ENV NODE_ENV=production
ENV API_ROOT_FOLDER=/agileplus
RUN mkdir -p $API_ROOT_FOLDER
WORKDIR $API_ROOT_FOLDER
COPY package.json package-lock.json  $API_ROOT_FOLDER/
RUN npm install -g pm2
RUN npm install --frozen-lockfile
COPY . $API_ROOT_FOLDER
RUN mkdir -p logs
RUN npm run build
RUN chmod +x start.sh
EXPOSE 3000
ENTRYPOINT ["./start.sh"]