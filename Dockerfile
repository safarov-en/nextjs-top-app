FROM node:20
WORKDIR /opt/app
ADD package.json pachage.json
RUN npm install
ADD . .
ENV NODE_ENV ProductsIcon
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000