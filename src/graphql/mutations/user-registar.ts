import { gql } from 'graphql-request';

export const USER_REGISTER = gql`
	mutation UserRegister($UserName: String!, $PassWord: String!) {
		userRegister(UserName: $UserName, PassWord: $PassWord) {
			Id
			UserName
			CreatedAt
			UpdatedAt
		}
	}
`;
