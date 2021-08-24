import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "dotenv/config";
import express from 'express';
import { createServer } from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";
import RootResolver from "./resolvers/RootResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from 'graphql';


(async () => {

    const app = await express();
    const schema = await buildSchema({
        resolvers : RootResolver
    });

    await createConnection();
    
    const apolloServer = new ApolloServer({
        schema,
        context : ({req, res}) => ({ req, res }),
        plugins : [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);
    SubscriptionServer.create({
        // This is the `schema` we just created.
        schema,
        // These are imported from `graphql`.
        execute,
        subscribe,
     }, {
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // This `server` is the instance returned from `new ApolloServer`.
        path: apolloServer.graphqlPath,
     });
    
    const PORT = process.env.port || 4000;

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}/graphql`)
    );
})();