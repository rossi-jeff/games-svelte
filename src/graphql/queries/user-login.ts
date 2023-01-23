import { gql } from 'graphql-request';

export const USER_LOGIN = gql`
	query UserLogin($userName: String!, $passWord: String!) {
		userLogin(UserName: $userName, PassWord: $passWord) {
			UserName
			Token
		}
	}
`;
