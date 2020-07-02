import { GraphQLString, GraphQLNonNull } from "graphql";

import userType from "../UserType";
import userModel from "../UserModel";
import { mutationWithClientMutationId } from "graphql-relay";

export const mutation = mutationWithClientMutationId({
    name: 'UserCreation',
    description: 'Create new user',
    inputFields: {
        identifier: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    outputFields: {
        user: {
            type: new GraphQLNonNull(userType),
            resolve: (user) => user
        }
    },
    mutateAndGetPayload: async ({identifier}) => {
        console.log('identifier: ', identifier);
        console.log('ENTERED USER CREATION MUTATION');
        try {
            const newUser = new userModel({identifier});
            const returnNewUser = await newUser.save();
            return returnNewUser;
        } catch (err) {
            console.log(err)
            return err;
        }
    }
});

export default mutation;
