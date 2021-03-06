import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

import { PubSub } from 'graphql-subscriptions';

import Router from 'koa-router';
import Koa from 'koa';
import logger from 'koa-logger';
import cors from 'kcors';
import graphqlHttp from 'koa-graphql';
import koaPlayground from 'graphql-playground-middleware-koa';

import { GraphQLError } from 'graphql';

import Schema from './schema';
import getCurrentUser from './auth';
import { IUser } from './modules/user/UserModel';

dotenv.config({path: path.join(__dirname, '/./../.env')});

const router = new Router();
const app = new Koa();

app.use(logger());
app.use(cors());

const graphqlSettings = async (req: any) => {

    const me: IUser | {me: null} = await getCurrentUser(req.headers.authorization);

    return {
        graphql: true,
        schema: Schema,
        context: {
            me,
            req
        },
        formatError: (error: GraphQLError) => {
            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack
            }
        }
    }
}

const graphqlHttpServer = graphqlHttp(graphqlSettings);
/* const graphqlHttpServer = graphqlHttp({
    graphiql: true,
    schema: Schema
}); */
router.all('/graphql', graphqlHttpServer);
router.all('/graphql', koaPlayground({
    endpoint: 'graphql',
    subscriptionEndpoint: '/subscriptions'
}));

app.use(router.routes()).use(router.allowedMethods());

export default app;

const pubsub = new PubSub();
export { pubsub };