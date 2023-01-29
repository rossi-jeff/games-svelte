import { gql } from 'graphql-request';

export const HANG_MAN = gql`
	query HangMan($id: Int!) {
		hangMan(Id: $id) {
			Id
			Status
			Score
			Correct
			Wrong
			Word {
				Word
				Length
			}
			User {
				UserName
			}
		}
	}
`;
