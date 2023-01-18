import { gql } from 'graphql-request';

export const SEA_BATTLE_TURN = gql`
	mutation SeaBattleTurn($id: Int!, $turn: SeaBattleTurnInput!) {
		seaBattleTurn(Id: $id, turn: $turn) {
			Id
			Navy
			Target
			ShipType
			GridPoint {
				Horizontal
				Vertical
			}
		}
	}
`;
