FROM node:24
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --omit=dev
USER node
ENV PORT=3000
CMD ["npm", "start"]
