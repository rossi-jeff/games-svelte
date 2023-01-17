import { gql } from 'graphql-request';

export const SEA_BATTLE_SHIP = gql`
	mutation SeaBattleShip($id: Int!, $ship: ShipInput!) {
		seaBattleShip(Id: $id, ship: $ship) {
			Id
			Size
			Type
			Navy
			Sunk
			GridPoints {
				Horizontal
				Vertical
			}
		}
	}
`;
