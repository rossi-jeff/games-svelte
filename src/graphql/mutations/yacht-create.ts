import { gql } from 'graphql-request';

export const YACHT_CREATE = gql`
	mutation YachtCreate {
		yachtCreate {
			Id
			Total
			CreatedAt
			UpdatedAt
		}
	}
`;
