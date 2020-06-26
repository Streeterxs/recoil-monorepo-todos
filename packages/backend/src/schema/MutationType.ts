import { GraphQLObjectType } from 'graphql';

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutation types',
    fields: {
    }
});

export default MutationType;