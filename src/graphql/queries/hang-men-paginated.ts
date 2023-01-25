import { gql } from 'graphql-request';

export const HANG_MEN_PAGINATED = gql`
	query HangMenPaginated($Skip: Int, $Take: Int) {
		hangMen(Skip: $Skip, Take: $Take) {
			Items {
				Id
				Score
				Status
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
			Skip
			Take
			Count
		}
	}
`;
