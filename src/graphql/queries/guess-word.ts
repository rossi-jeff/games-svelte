import { gql } from 'graphql-request';

export const GUESS_WORD = gql`
	query GuessWord($id: Int!) {
		guessWord(Id: $id) {
			Id
			Score
			Status
			User {
				UserName
			}
			Guesses {
				Guess
				Ratings {
					Rating
				}
			}
			Word {
				Word
				Length
			}
		}
	}
`;
