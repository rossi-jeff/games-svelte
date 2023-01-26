import { gql } from 'graphql-request';

export const YACHTS_PAGINATED = gql`
	query YachtsPaginated($Skip: Int, $Take: Int) {
		yachts(Skip: $Skip, Take: $Take) {
			Items {
				Id
				Total
				CreatedAt
				UpdatedAt
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
