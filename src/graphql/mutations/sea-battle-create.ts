import { gql } from 'graphql-request';

export const SEA_BATTLE_CREATE = gql`
	mutation SeaBattleCreate($axis: Int!) {
		seaBattleCreate(Axis: $axis) {
			Id
			Axis
			CreatedAt
			UpdatedAt
		}
	}
`;
