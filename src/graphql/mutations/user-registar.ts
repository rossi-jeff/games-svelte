import { gql } from 'graphql-request';

export const USER_REGISTER = gql`
	mutation UserRegister($userName: String!, $passWord: String!) {
		userRegister(UserName: $userName, PassWord: $passWord) {
			Id
			UserName
			CreatedAt
			UpdatedAt
		}
	}
`;
