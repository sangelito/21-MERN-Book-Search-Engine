const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Start the Apollo Server first
async function startApolloServer() {
  await server.start();
  
  // Apply Apollo Server middleware to Express
  server.applyMiddleware({ app });
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve the React client build in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  // Start the Express server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();