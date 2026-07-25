import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const PORT = process.env.PORT ?? 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });
const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(PORT, () => {
  console.log(`🚀 GraphQL server running at http://localhost:${PORT}/graphql`);
});
