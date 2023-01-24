import { gql } from 'graphql-request';

export const CODE_BREAKER = gql`
	query CodeBreaker($id: Int!) {
		codeBreaker(Id: $id) {
			Id
			Columns
			Colors
			Score
			Status
			Guesses {
				Guess {
					Color
				}
				Keys {
					Key
				}
			}
			CreatedAt
			UpdatedAt
		}
	}
`;
