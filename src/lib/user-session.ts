import { writable } from 'svelte/store';

export type UserSessionData = {
	UserName: string | null;
	Token: string | null;
	SignedIn: boolean;
};

export const blankSession: UserSessionData = {
	UserName: null,
	Token: null,
	SignedIn: false
};

export const userSession = writable<UserSessionData>(blankSession);
