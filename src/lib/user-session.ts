import { writable } from 'svelte/store';

export type UserSessionData = {
	UserName: string | null;
	Token: string | null;
	SignedIn: boolean;
};

const blank: UserSessionData = {
	UserName: null,
	Token: null,
	SignedIn: false
};

export const userSession = writable<UserSessionData>(blank);
