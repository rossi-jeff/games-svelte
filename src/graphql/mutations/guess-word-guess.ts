import { gql } from 'graphql-request';

export const GUESS_WORD_GUESS = gql`
	mutation GuessWordGuess($id: Int!, $guess: String!) {
		guessWordGuess(Id: $id, Guess: $guess) {
			Id
			Status
			Score
			Word {
				Word
				Length
			}
			Guesses {
				Guess
				Ratings {
					Rating
				}
			}
			CreatedAt
			UpdatedAt
		}
	}
`;
