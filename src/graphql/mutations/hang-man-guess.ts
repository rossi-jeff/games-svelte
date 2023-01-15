import { gql } from 'graphql-request';

export const HANG_MAN_GUESS = gql`
	mutation HangManGuess($id: Int!, $guess: String!) {
		hangManGuess(Id: $id, Guess: $guess) {
			Guess
			Found
			Status
			hangMan {
				Id
				Correct
				Wrong
				Status
				Word {
					Word
				}
			}
		}
	}
`;
