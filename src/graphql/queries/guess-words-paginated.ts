import { gql } from 'graphql-request';

export const GUESS_WORDS_PAGINATED = gql`
	query GuessWordsPaginated($Skip: Int, $Take: Int) {
		guessWords(Skip: $Skip, Take: $Take) {
			Items {
				Id
				Status
				Score
				CreatedAt
				UpdatedAt
				User {
					UserName
				}
				Word {
					Word
					Length
				}
			}
			Skip
			Take
			Count
		}
	}
`;
