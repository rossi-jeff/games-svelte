import { gql } from 'graphql-request';

export const HANG_MAN_CREATE = gql`
	mutation HangManCreate($wordId: Int!) {
		hangManCreate(WordId: $wordId) {
			Id
			Status
			Word {
				Word
			}
			Correct
			Wrong
			CreatedAt
			UpdatedAt
		}
	}
`;
