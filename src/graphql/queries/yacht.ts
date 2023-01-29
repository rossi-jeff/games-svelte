import { gql } from 'graphql-request';

export const YACHT = gql`
	query Yacht($id: Int!) {
		yacht(Id: $id) {
			Id
			Total
			CreatedAt
			UpdatedAt
			Turns {
				Id
				RollOne
				RollTwo
				RollThree
				Score
				Category
			}
			User {
				UserName
			}
		}
	}
`;
