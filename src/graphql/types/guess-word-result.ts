import type { GuessWord } from './guess-word';

export type GuessWordResult = {
	Items?: GuessWord[];
	Skip?: number;
	Take?: number;
	Count?: number;
};
