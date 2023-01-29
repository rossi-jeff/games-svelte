import { gql } from 'graphql-request';

export const SEA_BATTLE = gql`
	query SeaBattle($id: Int!) {
		seaBattle(Id: $id) {
			Id
			Axis
			Status
			Score
			CreatedAt
			UpdatedAt
			Ships {
				Navy
				Type
				Size
				Sunk
				GridPoints {
					Horizontal
					Vertical
				}
				Hits {
					Horizontal
					Vertical
				}
			}
			Turns {
				Navy
				Target
				ShipType
				GridPoint {
					Horizontal
					Vertical
				}
			}
			User {
				UserName
			}
		}
	}
`;
