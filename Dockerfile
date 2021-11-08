FROM node:16-alpine
ARG mode
ENV MODE=${mode}
LABEL AUTHOR  "Francesco Giovannini - Isendu <francesco.giovannini@isendu.com>"
WORKDIR /home/app
COPY package*.json ./
COPY ./dist/. /home/app
COPY ./prisma /home/app
COPY ./npm-auth.token /home/app
COPY ./.npmrc /home/app
COPY ./start.sh start.sh
RUN export CODEARTIFACT_AUTH_TOKEN=`cat npm-auth.token` && npm install --only=production
RUN npx prisma generate
RUN rm ./npm-auth.token
RUN rm ./.npmrc
CMD [ "sh", "start.sh" ]