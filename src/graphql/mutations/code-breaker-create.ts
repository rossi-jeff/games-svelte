import { gql } from 'graphql-request';

export const CODE_BREAKER_CREATE = gql`
	mutation CodeBreakerCreate($colors: [Color!]!, $columns: Int!) {
		codeBreakerCreate(Colors: $colors, Columns: $columns) {
			Id
			Status
			Columns
			CreatedAt
			UpdatedAt
		}
	}
`;
