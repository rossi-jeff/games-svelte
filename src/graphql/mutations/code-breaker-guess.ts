import { gql } from 'graphql-request';

export const CODE_BREAKER_GUESS = gql`
	mutation CodeBreakerGuess($id: Int!, $colors: [Color!]!) {
		codeBreakerGuess(Id: $id, Colors: $colors) {
			Id
			Guess {
				Color
			}
			Keys {
				Key
			}
		}
	}
`;
