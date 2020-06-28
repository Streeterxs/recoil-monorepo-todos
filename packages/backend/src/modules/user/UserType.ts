import { GraphQLObjectType, GraphQLString } from 'graphql';

import { IUser } from './UserModel';


const userType = new GraphQLObjectType<IUser>({
    name: 'UserType',
    description: 'User type',
    fields: () => (
        {
            identifier: {
                type: GraphQLString,
                resolve: (user) => user.identifier
            },
            createdAt: {
                type: GraphQLString,
                resolve: (user) => user.createdAt
            },
            updatedAt: {
                type: GraphQLString,
                resolve: (user) => user.updatedAt
            }
        }
    )
});

export default userType;
