import { GraphQLClient } from 'graphql-request';

export const endPoint = 'http://localhost:4000';

export const graphQlClient = new GraphQLClient(endPoint, { mode: 'cors' });
