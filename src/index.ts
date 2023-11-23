// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { User } from "@prisma/client";
import * as dotenv from "dotenv";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authenticate } from "./auth/auth";

dotenv.config();

export interface Context {
  currentUser: User | null;
  decodedIdToken: DecodedIdToken | null;
}

const server = new ApolloServer<Context>({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const serverPort = Number(process.env.PORT || 4000);
startStandaloneServer(server, {
  listen: { port: serverPort },
  context: async ({ req }) => ({
    ...(await authenticate(req.headers.authorization)),
  }),
}).then(() => console.log(`API Server ready at port ${serverPort}`));
