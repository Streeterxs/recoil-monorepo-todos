import { GraphQLObjectType } from "graphql";


const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    description: 'Subscription type',
    fields: () => ({})
});

export default SubscriptionType;