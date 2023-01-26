import { gql } from 'graphql-request';

export const USER_CHANGE_PASS_WORD = gql`
	mutation UserChangePassword($userName: String!, $oldPassWord: String!, $newPassWord: String!) {
		userChangePassWord(UserName: $userName, OldPassWord: $oldPassWord, NewPassWord: $newPassWord) {
			Id
			UserName
			CreatedAt
			UpdatedAt
		}
	}
`;
