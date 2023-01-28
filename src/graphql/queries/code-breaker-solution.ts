import { gql } from 'graphql-request';

export const CODE_BREAKER_SOLUTION = gql`
	query CodeBreakerSolution($id: Int!) {
		codeBreakerSolution(Id: $id) {
			Color
		}
	}
`;
