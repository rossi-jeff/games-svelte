import { gql } from 'graphql-request';

export const GUESS_WORD_CREATE = gql`
	mutation GuessWordCreate($wordId: Int!) {
		guessWordCreate(WordId: $wordId) {
			Id
			Status
			Word {
				Word
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
