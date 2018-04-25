FROM node:8.11.1-alpine

COPY / /app/
RUN ls -la /app
WORKDIR /app
RUN npm install --production

ENV NODE_ENV=production
ENV PORT=3000
ENV API_BASE_URL=https://www.bungie.net/Platform
ENV EXEMPTIONS_BASE_URL=https://7llyidadgb.execute-api.us-east-1.amazonaws.com/prod/exemptions
ENV REMOVAL_BASE_URL=https://9ykqb9ygwl.execute-api.us-east-1.amazonaws.com/prod/removal
ENV NOTES_BASE_URL=https://6fa9ewtmch.execute-api.us-east-1.amazonaws.com/prod/notes
ENV REGISTRY_BASE_URL=https://s7kkawg0e8.execute-api.us-east-1.amazonaws.com/prod/registry
ENV ACTIVITY_BASE_URL=https://bani8m6rgh.execute-api.us-east-1.amazonaws.com/prod/inactive-members
ENV TRELLO_BASE_URL=https://api.trello.com/1

CMD node index.js
EXPOSE 3000
