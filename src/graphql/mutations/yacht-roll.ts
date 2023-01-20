import { gql } from 'graphql-request';

export const YACHT_ROLL = gql`
	mutation YachtRoll($id: Int!, $roll: YachtRollInput!) {
		yachtRoll(Id: $id, roll: $roll) {
			Turn {
				Id
				RollOne
				RollTwo
				RollThree
				Score
				Category
			}
			Options {
				Category
				Score
			}
		}
	}
`;
