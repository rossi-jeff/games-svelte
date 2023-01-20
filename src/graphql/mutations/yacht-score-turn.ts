import { gql } from 'graphql-request';

export const YACHT_SCORE_TURN = gql`
	mutation YachtScoreTurn($id: Int!, $score: YachtScoreInput!) {
		yachtScoreTurn(Id: $id, score: $score) {
			Id
			RollOne
			RollTwo
			RollThree
			Score
			Category
		}
	}
`;
