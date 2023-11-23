// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import * as dotenv from "dotenv";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";

dotenv.config();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const serverPort = Number(process.env.PORT || 4000);
startStandaloneServer(server, {
  listen: { port: serverPort },
}).then(() => console.log(`API Server ready at port ${serverPort}`));
