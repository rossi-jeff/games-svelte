import { gql } from 'graphql-request';

export const SEA_BATTLES_PAGINATED = gql`
	query SeaBattles($Skip: Int, $Take: Int) {
		seaBattles(Skip: $Skip, Take: $Take) {
			Items {
				Id
				Axis
				Status
				Score
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
