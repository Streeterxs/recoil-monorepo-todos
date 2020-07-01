import { GraphQLObjectType } from 'graphql';
import todosMutations from '../modules/todos/mutations';
import UserMutations from '../modules/user/mutations';

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutation types',
    // TODO correct types
    fields: {
        ...todosMutations,
        ...UserMutations

    }
});

export default MutationType;