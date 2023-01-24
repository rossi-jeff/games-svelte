import { gql } from 'graphql-request';

export const CODE_BREAKERS_PAGINATED = gql`
	query CodeBreakersPaginated($OrderBy: CodeBreakerOrderInput, $Skip: Int, $Take: Int) {
		codeBreakers(OrderBy: $OrderBy, Skip: $Skip, Take: $Take) {
			Items {
				Id
				Colors
				Columns
				Score
				Status
				User {
					UserName
				}
			}
			Skip
			Take
			OrderBy {
				Score
				Columns
				Colors
			}
			Count
		}
	}
`;
