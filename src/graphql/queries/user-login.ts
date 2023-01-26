import { gql } from 'graphql-request';

export const USER_LOGIN = gql`
	query UserLogin($UserName: String!, $PassWord: String!) {
		userLogin(UserName: $UserName, PassWord: $PassWord) {
			UserName
			Token
		}
	}
`;
