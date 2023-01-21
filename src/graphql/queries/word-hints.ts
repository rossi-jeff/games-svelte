import { gql } from 'graphql-request';

export const WORD_HINTS = gql`
	query WordHints($filter: WordHintInput!) {
		wordHints(filter: $filter) {
			Hints
		}
	}
`;
