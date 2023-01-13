import { gql } from '@apollo/client';

export const WORD_RANDOM = gql`
	query WordRandom($filter: WordFilter) {
		wordRandom(filter: $filter) {
			Id
			Word
			Length
		}
	}
`;
