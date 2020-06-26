import { GraphQLObjectType } from "graphql";
import { connectionFromArray } from "graphql-relay";

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Graphql type for queries',
    fields: () => ({})
});

export default QueryType