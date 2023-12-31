import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import type { Express } from "express";
import session from "express-session";
import http from "http";
import "reflect-metadata";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { CompanyClass } from "./resolvers/compnay";
import { Question } from "./resolvers/question";
import { validatedEnv } from "./constants";
import router from "./router";
import { LoggerMiddleware } from "./helpers";

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

app.use(
  session({
    secret: validatedEnv.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 },
  })
);
app.use(cookieParser());
app.use(express.json());

const httpServer: any = http.createServer(app);

async function setupServerGraphql() {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [CompanyClass, Question],
    globalMiddlewares: [LoggerMiddleware],
    emitSchemaFile: true,
  });

  const server = new ApolloServer<any>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),

    json(),

    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );
}
app.use(router);

setupServerGraphql();
export { httpServer, app };





