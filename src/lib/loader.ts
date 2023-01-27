import { writable } from 'svelte/store';

export type LoaderData = {
	loading: boolean;
};

export const blankLoader: LoaderData = {
	loading: false
};

export const Loader = writable<LoaderData>(blankLoader);
