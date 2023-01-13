import { gql } from 'graphql-request';

export const WORD_RANDOM = gql`
	query WordRandom($filter: WordFilter) {
		wordRandom(filter: $filter) {
			Id
			Word
			Length
		}
	}
`;
